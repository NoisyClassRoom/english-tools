// Colour by code – engine (26 Nov 2026): turns a picture into areas ("pieces"), their outlines and the places for the words.
// Every picture is first drawn as a fine colour map. Then each colour is cut into pieces:
//   smooth  – stained glass: pieces cut around spread-out points (mandalas: cut along their symmetry), outlines smoothed;
//   blocks  – the colour map on a grid of squares, squares of one colour joined into blocks;
//   mosaic  – one square = one area.
// No pupil data; nothing is sent anywhere.
window.CCE = (() => {
  'use strict';
  const PAL = { '.': ['white', '#ffffff'], r: ['red', '#e53935'], o: ['orange', '#fb8c00'], y: ['yellow', '#fdd835'], g: ['green', '#66bb6a'], d: ['dark green', '#2e7d32'],
    l: ['light blue', '#81d4fa'], b: ['blue', '#1e88e5'], v: ['purple', '#8e24aa'], p: ['pink', '#f48fb1'], n: ['brown', '#8d6e63'], k: ['black', '#212121'], a: ['grey', '#9e9e9e'] };
  const DARK = new Set(['r', 'd', 'b', 'v', 'n', 'k']);
  const MARK = '#ff00ff';                                  // outside the picture
  const rng = seed => { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const rgb = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

  // a square-grid motif (old pictures) as vector shapes, so every style works with it
  const gridToVector = m => {
    const shapes = []; m.rows.forEach((row, y) => row.split('').forEach((c, x) => shapes.push([c, 'M' + x + ' ' + y + 'h1.02v1.02h-1.02Z'])));
    return { id: m.id, name: m.name, cat: m.cat, vb: [m.rows[0].length, m.rows.length], shapes, grid: m.rows };
  };

  // ---- the colour map: col[i] = index into letters, -1 = outside
  const rasterVector = (m, W, H) => {
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d'); ctx.fillStyle = MARK; ctx.fillRect(0, 0, W, H); ctx.scale(W / m.vb[0], H / m.vb[1]);
    m.shapes.forEach(([c, d]) => { ctx.fillStyle = c === '-' ? MARK : PAL[c][1]; ctx.fill(new Path2D(d)); });
    const data = ctx.getImageData(0, 0, W, H).data, letters = [...new Set(m.shapes.map(s => s[0]).filter(c => c !== '-'))];
    const ref = letters.map(c => rgb(PAL[c][1])).concat([rgb(MARK)]), col = new Int8Array(W * H);
    for (let i = 0; i < W * H; i++) {
      const r = data[4 * i], g = data[4 * i + 1], b = data[4 * i + 2]; let best = 0, bd = 1e9;
      for (let k = 0; k < ref.length; k++) { const dr = r - ref[k][0], dg = g - ref[k][1], db = b - ref[k][2], dd = dr * dr + dg * dg + db * db; if (dd < bd) { bd = dd; best = k; } }
      col[i] = best === letters.length ? -1 : best;
    }
    return { W, H, col, letters };
  };
  // majority colour per square of a grid with nx columns
  const downsample = (R, nx, ny) => {
    const col = new Int8Array(nx * ny), n = R.letters.length + 1;
    for (let gy = 0; gy < ny; gy++) for (let gx = 0; gx < nx; gx++) {
      const cnt = new Array(n).fill(0), x0 = Math.floor(gx * R.W / nx), x1 = Math.floor((gx + 1) * R.W / nx), y0 = Math.floor(gy * R.H / ny), y1 = Math.floor((gy + 1) * R.H / ny);
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const c = R.col[y * R.W + x]; cnt[c < 0 ? n - 1 : c]++; }
      let b = 0; for (let k = 1; k < n; k++) if (cnt[k] > cnt[b]) b = k;
      col[gy * nx + gx] = b === n - 1 ? -1 : b;
    }
    return { W: nx, H: ny, col, letters: R.letters };
  };
  const nb4 = (W, H, i, f) => { const x = i % W; if (x > 0) f(i - 1); if (x < W - 1) f(i + 1); if (i >= W) f(i - W); if (i < W * (H - 1)) f(i + W); };
  // connected areas of one colour
  const components = R => {
    const { W, H, col } = R, comp = new Int32Array(W * H).fill(-1), comps = [];
    for (let s = 0; s < W * H; s++) {
      if (col[s] < 0 || comp[s] >= 0) continue;
      const id = comps.length, px = [s]; comp[s] = id;
      for (let q = 0; q < px.length; q++) nb4(W, H, px[q], j => { if (comp[j] < 0 && col[j] === col[s]) { comp[j] = id; px.push(j); } });
      comps.push({ c: col[s], px });
    }
    return { comp, comps };
  };
  // very small specks (edges of shapes) take the colour of their neighbours
  const cleanTiny = (R, minPx) => {
    for (let round = 0; round < 3; round++) {
      const { comp, comps } = components(R); let changed = false;
      comps.forEach((c, id) => {
        if (c.px.length >= minPx) return;
        const cnt = {}; c.px.forEach(p => nb4(R.W, R.H, p, j => { if (comp[j] !== id && R.col[j] >= 0) cnt[R.col[j]] = (cnt[R.col[j]] || 0) + 1; }));
        const best = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])[0];
        if (best != null) { c.px.forEach(p => { R.col[p] = Number(best); }); changed = true; }
      });
      if (!changed) break;
    }
  };

  // ---- pieces
  // a piece cut into several parts keeps only its largest part; the others join a neighbouring piece of the same colour area
  const fixFragments = (W, H, piece, comp) => {
    const frag = new Int32Array(W * H).fill(-1), frags = [];
    for (let s = 0; s < W * H; s++) {
      if (piece[s] < 0 || frag[s] >= 0) continue;
      const id = frags.length, px = [s]; frag[s] = id;
      for (let q = 0; q < px.length; q++) nb4(W, H, px[q], j => { if (frag[j] < 0 && piece[j] === piece[s]) { frag[j] = id; px.push(j); } });
      frags.push({ p: piece[s], px });
    }
    const biggest = {}; frags.forEach((f, i) => { if (biggest[f.p] == null || f.px.length > frags[biggest[f.p]].px.length) biggest[f.p] = i; });
    frags.forEach((f, i) => {
      if (biggest[f.p] === i) return;
      const cnt = {}; f.px.forEach(p => nb4(W, H, p, j => { if (piece[j] >= 0 && piece[j] !== f.p && comp[j] === comp[p]) cnt[piece[j]] = (cnt[piece[j]] || 0) + 1; }));
      const to = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])[0];
      if (to != null) f.px.forEach(p => { piece[p] = Number(to); });
    });
  };
  // stained glass: spread-out points in every colour area, each square goes to the nearest point of its area
  const piecesSpread = (R, target, rnd, sym) => {
    const { W, H } = R, { comp, comps } = components(R), piece = new Int32Array(W * H).fill(-1); let base = 0;
    comps.forEach(cp => {
      const n = cp.px.length, m = Math.round(n / target);
      if (m < 2) { cp.px.forEach(p => { piece[p] = base; }); base++; return; }
      if (sym) {                                             // mandala: cut along the symmetry, so the pattern stays symmetric
        const cx = sym.cx * W / sym.w, cy = sym.cy * H / sym.h, k = sym.n % 2 === 0 && m <= sym.n / 2 ? sym.n / 2 : sym.n * Math.max(1, Math.round(m / sym.n)), off = Math.PI / sym.n;
        cp.px.forEach(p => { const x = p % W + 0.5, y = (p - p % W) / W + 0.5, t = (Math.atan2(y - cy, x - cx) + off + 4 * Math.PI) % (2 * Math.PI); piece[p] = base + Math.floor(t / (2 * Math.PI / k)) % k; });
        base += k; return;
      }
      const seeds = [cp.px[Math.floor(rnd() * n)]];
      while (seeds.length < m) {
        let best = -1, bd = -1;
        for (let t = 0; t < 250; t++) { const p = cp.px[Math.floor(rnd() * n)], x = p % W, y = (p - x) / W; let d = 1e12; seeds.forEach(s => { const sx = s % W, sy = (s - sx) / W, dd = (x - sx) * (x - sx) + (y - sy) * (y - sy); if (dd < d) d = dd; }); if (d > bd) { bd = d; best = p; } }
        seeds.push(best);
      }
      const sxy = seeds.map(s => [s % W, (s - s % W) / W]);
      cp.px.forEach(p => { const x = p % W, y = (p - x) / W; let b = 0, bd = 1e12; sxy.forEach(([sx, sy], k) => { const dd = (x - sx) * (x - sx) + (y - sy) * (y - sy); if (dd < bd) { bd = dd; b = k; } }); piece[p] = base + b; });
      base += m;
    });
    fixFragments(W, H, piece, comp);
    return piece;
  };
  // blocks: squares of one colour joined into blocks of mn–mx squares (seeded); mosaic = mn = mx = 1
  const piecesBlocks = (R, mn, mx, rnd) => {
    const { W, H, col } = R, piece = new Int32Array(W * H).fill(-1), sizes = [];
    const order = [...Array(W * H).keys()]; for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    order.forEach(s => {
      if (col[s] < 0 || piece[s] >= 0) return;
      const id = sizes.length, target = mn + Math.floor(rnd() * (mx - mn + 1)); let cnt = 1; piece[s] = id;
      const front = []; nb4(W, H, s, j => { if (piece[j] < 0 && col[j] === col[s]) front.push(j); });
      while (cnt < target && front.length) {
        const j = front.splice(Math.floor(rnd() * front.length), 1)[0]; if (piece[j] >= 0) continue;
        piece[j] = id; cnt++; nb4(W, H, j, q => { if (piece[q] < 0 && col[q] === col[s]) front.push(q); });
      }
      sizes.push(cnt);
    });
    if (mn > 1) for (let round = 0; round < 4; round++) {                   // very small leftovers join a neighbouring block of the same colour
      const cells = {}; for (let i = 0; i < W * H; i++) if (piece[i] >= 0) (cells[piece[i]] = cells[piece[i]] || []).push(i);
      let changed = false;
      Object.keys(cells).forEach(k => {
        const px = cells[k]; if (px.length >= Math.ceil(mn / 2)) return;
        const cnt = {}; px.forEach(p => nb4(W, H, p, j => { if (piece[j] >= 0 && piece[j] !== Number(k) && col[j] === col[p]) cnt[piece[j]] = (cells[piece[j]] || []).length; }));
        const to = Object.keys(cnt).sort((a, b) => cnt[a] - cnt[b])[0];
        if (to != null) { px.forEach(p => { piece[p] = Number(to); }); changed = true; }
      });
      if (!changed) break;
    }
    return piece;
  };

  // ---- outlines: the borders between pieces as polylines (smoothed for stained glass)
  const outlines = (W, H, piece, smooth) => {
    const P = (x, y) => (x < 0 || y < 0 || x >= W || y >= H) ? -2 : piece[y * W + x];
    const W1 = W + 1, adj = new Map(), add = (a, b) => { (adj.get(a) || adj.set(a, []).get(a)).push(b); (adj.get(b) || adj.set(b, []).get(b)).push(a); };
    const diff = (u, v) => u !== v && !(u < 0 && v < 0);
    for (let y = 0; y <= H; y++) for (let x = 0; x < W; x++) if (diff(P(x, y - 1), P(x, y))) add(y * W1 + x, y * W1 + x + 1);
    for (let x = 0; x <= W; x++) for (let y = 0; y < H; y++) if (diff(P(x - 1, y), P(x, y))) add(y * W1 + x, (y + 1) * W1 + x);
    const used = new Set(), key = (a, b) => a < b ? a + ',' + b : b + ',' + a, lines = [];
    const walk = (start, next) => {
      const path = [start, next]; used.add(key(start, next)); let prev = start, cur = next;
      while (adj.get(cur).length === 2 && cur !== start) { const nx = adj.get(cur).find(q => !used.has(key(cur, q))); if (nx == null) break; used.add(key(cur, nx)); path.push(nx); prev = cur; cur = nx; }
      return path;
    };
    adj.forEach((ns, a) => { if (ns.length !== 2) ns.forEach(b => { if (!used.has(key(a, b))) lines.push(walk(a, b)); }); });
    adj.forEach((ns, a) => ns.forEach(b => { if (!used.has(key(a, b))) lines.push(walk(a, b)); }));
    const pts = path => path.map(i => [i % W1, (i - i % W1) / W1]);
    const dp = (p, tol) => {                                          // Douglas–Peucker, ends kept
      if (p.length < 3) return p;
      const keep = new Uint8Array(p.length); keep[0] = keep[p.length - 1] = 1; const st = [[0, p.length - 1]];
      while (st.length) { const [a, b] = st.pop(); let md = -1, mi = -1; const [ax, ay] = p[a], [bx, by] = p[b], L = Math.hypot(bx - ax, by - ay) || 1;
        for (let i = a + 1; i < b; i++) { const d = Math.abs((bx - ax) * (ay - p[i][1]) - (ax - p[i][0]) * (by - ay)) / L; if (d > md) { md = d; mi = i; } }
        if (md > tol) { keep[mi] = 1; st.push([a, mi], [mi, b]); } }
      return p.filter((_, i) => keep[i]);
    };
    const chaikin = (p, closed) => {
      let q = p; for (let it = 0; it < 2; it++) {
        const o = closed ? [] : [q[0]], n = q.length;
        for (let i = 0; i < (closed ? n - 1 : n - 1); i++) { const [ax, ay] = q[i], [bx, by] = q[i + 1]; o.push([0.75 * ax + 0.25 * bx, 0.75 * ay + 0.25 * by], [0.25 * ax + 0.75 * bx, 0.25 * ay + 0.75 * by]); }
        if (closed) o.push(o[0]); else o.push(q[n - 1]); q = o;
      }
      return q;
    };
    // a closed ring (e.g. a pupil inside an eye) is simplified in two halves, otherwise both ends are the same point and it collapses
    const simp = (p, closed, tol) => {
      if (!closed || p.length < 4) return dp(p, tol);
      let far = 1, fd = -1; p.forEach(([x, y], i) => { const d = (x - p[0][0]) ** 2 + (y - p[0][1]) ** 2; if (d > fd) { fd = d; far = i; } });
      return dp(p.slice(0, far + 1), tol).concat(dp(p.slice(far), tol).slice(1));
    };
    return lines.map(path => { const closed = path[0] === path[path.length - 1], p = pts(path); return smooth ? chaikin(simp(p, closed, 1.1), closed) : simp(p, closed, 0.01); });
  };

  // ---- where words fit: distance to the border of the piece, a good centre per piece
  const centres = (W, H, piece, count) => {
    const d = new Float32Array(W * H), INF = 1e9;
    for (let i = 0; i < W * H; i++) { if (piece[i] < 0) { d[i] = 0; continue; } let edge = false; nb4(W, H, i, j => { if (piece[j] !== piece[i]) edge = true; }); const x = i % W; if (x === 0 || x === W - 1 || i < W || i >= W * (H - 1)) edge = true; d[i] = edge ? 1 : INF; }
    const r2 = Math.SQRT2;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (d[i] <= 1) continue; let v = d[i]; if (x > 0) v = Math.min(v, d[i - 1] + 1); if (y > 0) { v = Math.min(v, d[i - W] + 1); if (x > 0) v = Math.min(v, d[i - W - 1] + r2); if (x < W - 1) v = Math.min(v, d[i - W + 1] + r2); } d[i] = v; }
    for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) { const i = y * W + x; if (d[i] <= 1) continue; let v = d[i]; if (x < W - 1) v = Math.min(v, d[i + 1] + 1); if (y < H - 1) { v = Math.min(v, d[i + W] + 1); if (x < W - 1) v = Math.min(v, d[i + W + 1] + r2); if (x > 0) v = Math.min(v, d[i + W - 1] + r2); } d[i] = v; }
    const dmax = new Float32Array(count), sx = new Float64Array(count), sy = new Float64Array(count), n = new Float64Array(count), best = new Int32Array(count).fill(-1);
    for (let i = 0; i < W * H; i++) { const p = piece[i]; if (p < 0) continue; const x = i % W, y = (i - x) / W; sx[p] += x; sy[p] += y; n[p]++; if (d[i] > dmax[p]) { dmax[p] = d[i]; best[p] = i; } }
    const near = new Float64Array(count).fill(1e12), mid = new Int32Array(count).fill(-1), more = [...Array(count)].map(() => []), coarse = W * H < 5000;
    for (let i = 0; i < W * H; i++) {
      const p = piece[i]; if (p < 0) continue; const x = i % W, y = (i - x) / W;
      if (d[i] >= 0.8 * dmax[p]) { const dd = (x - sx[p] / n[p]) ** 2 + (y - sy[p] / n[p]) ** 2; if (dd < near[p]) { near[p] = dd; mid[p] = i; } }
      if (d[i] >= 0.6 * dmax[p]) more[p].push([x + 0.5, y + 0.5]);
      if (coarse && x < W - 1 && piece[i + 1] === p) more[p].push([x + 1, y + 0.5]);         // squares: a word may sit across two squares
      if (coarse && y < H - 1 && piece[i + W] === p) more[p].push([x + 0.5, y + 1]);
    }
    // up to 12 candidate centres per piece: the middle, the widest point, and points spread over the piece
    return [...Array(count).keys()].map(p => { const m = more[p], step = Math.max(1, m.length / 10), pick = [];
      for (let k = 0; k < m.length && pick.length < 10; k += step) pick.push(m[Math.floor(k)]);
      return [mid[p], best[p]].filter(i => i >= 0).map(i => [i % W + 0.5, (i - i % W) / W + 0.5]).concat(pick); });
  };

  // ---- the whole layout for one picture
  // opts: { pic (vector picture or grid motif), style 'smooth' | 'blocks' | 'mosaic', level 1–3, boxW, boxH (mm), seed }
  const AREAS = { 1: 28, 2: 55, 3: 95 };
  const build = o => {
    const pic = o.pic.rows ? gridToVector(o.pic) : o.pic, rnd = rng(o.seed * 31 + 7), asp = pic.vb[1] / pic.vb[0];
    const wmm = Math.min(o.boxW, o.boxH / asp), hmm = wmm * asp;
    let R, piece, ppm;
    if (o.style === 'smooth') {
      ppm = 3; R = rasterVector(pic, Math.round(wmm * ppm), Math.round(hmm * ppm));
      cleanTiny(R, Math.round(22 * ppm * ppm));                 // areas under about 22 mm² are too small for a word: they take the colour around them
      let total = 0; for (let i = 0; i < R.col.length; i++) if (R.col[i] >= 0) total++;
      piece = piecesSpread(R, total / AREAS[o.level], rnd, pic.sym ? { cx: pic.sym.cx, cy: pic.sym.cy, n: pic.sym.n, w: pic.vb[0], h: pic.vb[1] } : null);
    } else {
      const nx = o.pic.rows ? o.pic.rows[0].length : o.style === 'mosaic' ? [0, 10, 14, 18][o.level] : [0, 16, 24, 32][o.level], ny = o.pic.rows ? o.pic.rows.length : Math.round(nx * asp);
      const fine = rasterVector(pic, nx * 8, ny * 8); R = downsample(fine, nx, ny); ppm = nx / wmm;
      let total = 0; for (let i = 0; i < R.col.length; i++) if (R.col[i] >= 0) total++;
      const avg = Math.max(1, total / AREAS[o.level]), mn = o.style === 'mosaic' ? 1 : Math.max(2, Math.round(avg * 0.7)), mx = o.style === 'mosaic' ? 1 : Math.max(mn, Math.round(avg * 1.3));
      piece = piecesBlocks(R, mn, mx, rnd);
    }
    // number the pieces 0…n-1, colour of each piece, colours ordered by how much of the picture they cover
    const map = new Map(), pcol = [];
    for (let i = 0; i < piece.length; i++) { const p = piece[i]; if (p < 0) continue; if (!map.has(p)) { map.set(p, pcol.length); pcol.push(R.col[i]); } piece[i] = map.get(p); }
    const area = {}; for (let i = 0; i < piece.length; i++) if (piece[i] >= 0) area[R.col[i]] = (area[R.col[i]] || 0) + 1;
    const letters = Object.keys(area).map(Number).sort((a, b) => area[b] - area[a]).map(k => R.letters[k]);
    const cand = centres(R.W, R.H, piece, pcol.length);
    const lines = outlines(R.W, R.H, piece, o.style === 'smooth');
    const s = 1 / ppm, d = lines.map(p => 'M' + p.map(([x, y]) => (x * s).toFixed(2) + ' ' + (y * s).toFixed(2)).join('L')).join('');
    return { W: R.W, H: R.H, ppm, wmm, hmm, piece, pieces: pcol.map((c, k) => ({ c: R.letters[c], cand: cand[k] })), letters, outline: d,
             fill: o.style === 'smooth' ? { vector: pic } : { grid: R } };
  };

  // the largest letters for a text in a piece (one or two lines), in mm
  const linesOf = t => { const o = [[t]]; const w = t.split(' '); if (w.length > 1) { let best = null; for (let k = 1; k < w.length; k++) { const a = w.slice(0, k).join(' '), b = w.slice(k).join(' '), m = Math.max(a.length, b.length); if (!best || m < best.m) best = { l: [a, b], m }; } o.push(best.l); } return o; };
  const fit = (L, p, text) => {
    const inP = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y); return xi >= 0 && yi >= 0 && xi < L.W && yi < L.H && L.piece[yi * L.W + xi] === p; };
    let best = { size: 0, lines: [text], cx: 0, cy: 0 };
    const cands = L.pieces[p].cand;
    linesOf(text).forEach(ls => cands.forEach(([cx, cy]) => {
      const len = Math.max(...ls.map(l => l.length));
      const ok = s => { const sp = s * L.ppm, w = (len * 0.56 + 0.5) * sp, h = ls.length * 1.15 * sp;
        for (let i = 0; i <= 6; i++) for (let j = 0; j <= 3; j++) if (!inP(cx - w / 2 + w * i / 6, cy - h / 2 + h * j / 3)) return false; return true; };
      let lo = 0, hi = 5.2; if (!ok(0.8)) return;
      lo = 0.8; for (let it = 0; it < 11; it++) { const m = (lo + hi) / 2; if (ok(m)) lo = m; else hi = m; }
      if (lo > best.size + 0.02) best = { size: lo, lines: ls, cx: cx / L.ppm, cy: cy / L.ppm };
    }));
    if (!best.size && cands[0]) best = { size: 0.8, lines: [text], cx: cands[0][0] / L.ppm, cy: cands[0][1] / L.ppm };
    return best;
  };

  // fewer colours than the picture has (e.g. only 6 units for an 8-colour picture): the smallest colours join the most similar kept colour
  const reduce = (pic, k) => {
    const v = pic.rows ? gridToVector(pic) : pic, R = rasterVector(v, 80, Math.round(80 * v.vb[1] / v.vb[0])), area = {};
    for (let i = 0; i < R.col.length; i++) if (R.col[i] >= 0) area[R.letters[R.col[i]]] = (area[R.letters[R.col[i]]] || 0) + 1;
    const all = Object.keys(area).sort((a, b) => area[b] - area[a]); if (all.length <= k) return v;
    const keep = all.slice(0, k), map = {};
    all.slice(k).forEach(c => { const a = rgb(PAL[c][1]); let best = keep[0], bd = 1e9; keep.forEach(q => { const b = rgb(PAL[q][1]), d = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2; if (d < bd) { bd = d; best = q; } }); map[c] = best; });
    return Object.assign({}, v, { shapes: v.shapes.map(([c, d]) => [map[c] || c, d]), joined: all.slice(k).map(c => PAL[c][0] + ' → ' + PAL[map[c]][0]) });
  };

  return { PAL, DARK, rng, build, fit, gridToVector, reduce };
})();
