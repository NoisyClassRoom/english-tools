// ============================================================
//  TARSIA ENGINE (21 Oct 2026): the shapes, the pieces and the text on the sides of a tarsia puzzle.
//  Used by exercises/index.html (the online tarsia for pupils). The printable maker (tarsia/index.html) has its own copy of the geometry.
//  Triangles sit on a triangular grid: row r, position i (x = i * S / 2); a triangle points UP when r + i is odd.
//  The sides of a triangle in CLOCKWISE order: up = [R, B, L], down = [T, R, L]; a piece keeps its three texts in that order,
//  so a piece turned by k steps of 120 degrees shows text (j - k) on side j of the slot it sits in.
//  No data: nothing in this file is sent anywhere.
// ============================================================
window.Tarsia = (() => {
  const rowSpan = (r, a, b) => { const o = []; for (let i = a; i <= b; i++) o.push([r, i]); return o; };
  const SHAPES = {
    tri: { name: 'triangle', pairs: 18, cells: [].concat(rowSpan(0, 3, 3), rowSpan(1, 2, 4), rowSpan(2, 1, 5), rowSpan(3, 0, 6)), w: 4, rows: 4, minI: 0 },
    hex: { name: 'hexagon', pairs: 30, cells: [].concat(rowSpan(0, 1, 5), rowSpan(1, 0, 6), rowSpan(2, 0, 6), rowSpan(3, 1, 5)), w: 4, rows: 4, minI: 0 }
  };
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sidesOf = t => t.up ? ['R', 'B', 'L'] : ['T', 'R', 'L'];

  // the touching sides of a shape: [{ a: {t, side}, b: {t, side} }] and the triangles [{r, i, up, k}]
  const layoutOf = shape => {
    const at = {}, tris = shape.cells.map(([r, i], k) => (at[r + ',' + i] = { r, i, up: (r + i) % 2 === 1, k }));
    const edges = [];
    tris.forEach(t => {
      const right = at[t.r + ',' + (t.i + 1)]; if (right) edges.push({ a: { t, side: 'R' }, b: { t: right, side: 'L' } });
      if (t.up) { const below = at[(t.r + 1) + ',' + t.i]; if (below) edges.push({ a: { t, side: 'B' }, b: { t: below, side: 'T' } }); }
    });
    return { tris, edges };
  };

  // corners of a triangle on the grid for side length S
  const geo = (t, S) => {
    const H = S * Math.sqrt(3) / 2, x = t.i * S / 2 - (SHAPES.tri.minI - 1) * S / 2, y = t.r * H;       // the whole shape is shifted right by S / 2
    return t.up
      ? { L: [[x, y], [x - S / 2, y + H]], R: [[x, y], [x + S / 2, y + H]], B: [[x - S / 2, y + H], [x + S / 2, y + H]], cen: [x, y + 2 * H / 3], pts: [[x, y], [x - S / 2, y + H], [x + S / 2, y + H]], H }
      : { L: [[x - S / 2, y], [x, y + H]], R: [[x + S / 2, y], [x, y + H]], T: [[x - S / 2, y], [x + S / 2, y]], cen: [x, y + H / 3], pts: [[x - S / 2, y], [x + S / 2, y], [x, y + H]], H };
  };

  // the text of one side: the lines with position, rotation (the top of the letters points to the inside) and size
  const label = (t, side, text, S) => {
    const c = geo(t, S), H = c.H, k = S / 45, [p1, p2] = c[side], mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2;
    let nx = c.cen[0] - mx, ny = c.cen[1] - my; const nl = Math.hypot(nx, ny); nx /= nl; ny /= nl;
    let th = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]); if (Math.sin(th) * nx - Math.cos(th) * ny < 0) th += Math.PI;
    const fit = ls => Math.min(S * (ls.length > 1 ? 0.45 : 0.52) / (Math.max(1, ...ls.map(l => l.length)) * 0.5), 4.2 * k);
    let lines = [text], size = fit(lines);
    if (size < 3.3 * k && /\s/.test(text)) {
      const words = text.split(/\s+/); let best = null;
      for (let q = 1; q < words.length; q++) { const a = words.slice(0, q).join(' '), b = words.slice(q).join(' '), m = Math.max(a.length, b.length); if (!best || m < best.m) best = { l: [a, b], m }; }
      if (best) { lines = best.l; size = fit(lines); }
    }
    size = Math.max(size, 2.2 * k); const lh = size * 1.15, d0 = 0.07 * H + (lines.length - 1) * lh;
    return lines.map((txt, q) => { const off = d0 - q * lh; return { txt, x: mx + nx * off, y: my + ny * off, deg: th * 180 / Math.PI, size }; });
  };

  // a new puzzle: pairs [[a, b], ...] (exactly shape.pairs of them) are put on the touching sides at random
  const make = (key, pairs) => {
    const shape = SHAPES[key], lay = layoutOf(shape), order = shuffle(pairs.map((p, q) => q));
    const texts = {};                                                         // 'k|side' -> { txt, pid }
    lay.edges.forEach((e, q) => {
      const p = pairs[order[q]], flip = Math.random() < 0.5; e.pid = q;
      texts[e.a.t.k + '|' + e.a.side] = { txt: flip ? p[1] : p[0], pid: q };
      texts[e.b.t.k + '|' + e.b.side] = { txt: flip ? p[0] : p[1], pid: q };
    });
    const pieces = lay.tris.map(t => ({ k: t.k, texts: sidesOf(t).map(s => texts[t.k + '|' + s] || null) }));
    return { shape, tris: lay.tris, edges: lay.edges, pieces };
  };
  return { SHAPES, make, geo, label, sidesOf, shuffle };
})();
