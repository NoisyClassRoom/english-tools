// ============================================================
//  PUZZLE ENGINE (no page code): word search, crossword and word scramble from the word lists of the units.
//  Used by exercises/index.html (online games) and puzzles/index.html (printable sheets, teacher only).
//  A word list is [{ en, sl, pic? }] (the same objects as in the class files). Only single English words made of letters
//  are used for the grids ("to win" -> win; "only child" and "half-brother" are left out); Hangman may use phrases.
//    Puzzles.items(words, min, max)       -> [{ word (lower case), w (the original entry) }]
//    Puzzles.wordSearch(list, count, size) -> { n, grid[n][n], placed: [{ item, r, c, dr, dc }] }
//    Puzzles.crossword(list, count)        -> { rows, cols, cells[r][c] ('' = black), words: [{ n, dir, item, r, c }] } (dir = 'across' | 'down')
//    Puzzles.scramble(word)                -> the letters in another order
// ============================================================
window.Puzzles = (() => {
  const rnd = n => Math.floor(Math.random() * n);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const clean = en => String(en || '').trim().toLowerCase().replace(/^to\s+/, '');
  // the word as it must be WRITTEN (capital letters of Monday, Slovenia, English ... are kept): for lists, answer keys and messages; clean() is only for building the puzzle
  const show = w => String((w && w.en) || '').trim().replace(/^to\s+/i, '');
  const items = (words, min = 3, max = 12) => {
    const seen = new Set(), out = [];
    (words || []).forEach(w => { const s = clean(w.en); if (/^[a-z]+$/.test(s) && s.length >= min && s.length <= max && !seen.has(s)) { seen.add(s); out.push({ word: s, w }); } });
    return out;
  };

  // ---- word search: the words go right, down, down-right or up-right (never backwards, they are for children)
  const DIRS = [[0, 1], [1, 0], [1, 1], [-1, 1]];
  function wordSearch(list, count = 10, size = 12) {
    const picked = shuffle(list).slice(0, count).sort((a, b) => b.word.length - a.word.length);
    if (!picked.length) return { n: 0, grid: [], placed: [] };
    const n = Math.max(size, picked[0].word.length + 2, 8);
    let best = null;
    for (let attempt = 0; attempt < 25; attempt++) {
      const grid = Array.from({ length: n }, () => Array(n).fill('')), placed = [];
      picked.forEach(item => {
        const w = item.word;
        for (let t = 0; t < 250; t++) {
          const [dr, dc] = DIRS[rnd(DIRS.length)], r = rnd(n), c = rnd(n), er = r + dr * (w.length - 1), ec = c + dc * (w.length - 1);
          if (er < 0 || er >= n || ec < 0 || ec >= n) continue;
          let ok = true; for (let i = 0; i < w.length && ok; i++) { const ch = grid[r + dr * i][c + dc * i]; if (ch && ch !== w[i]) ok = false; }
          if (!ok) continue;
          for (let i = 0; i < w.length; i++) grid[r + dr * i][c + dc * i] = w[i];
          placed.push({ item, r, c, dr, dc }); return;
        }
      });
      if (!best || placed.length > best.placed.length) best = { n, grid, placed };
      if (placed.length === picked.length) break;
    }
    const L = 'abcdefghijklmnopqrstuvwxyz';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (!best.grid[r][c]) best.grid[r][c] = L[rnd(26)];
    return best;
  }

  // ---- crossword: a greedy layout tried several times, the one with the most words (and the smallest area) wins
  function layout(picked) {
    const cells = new Map(), placed = [], key = (r, c) => r + ',' + c;
    const can = (w, r, c, dir) => {
      const dr = dir === 'down' ? 1 : 0, dc = dir === 'across' ? 1 : 0;
      if (cells.has(key(r - dr, c - dc)) || cells.has(key(r + dr * w.length, c + dc * w.length))) return -1;
      let cross = 0;
      for (let i = 0; i < w.length; i++) {
        const rr = r + dr * i, cc = c + dc * i, e = cells.get(key(rr, cc));
        if (e) { if (e.ch !== w[i] || e[dir]) return -1; cross++; }
        else if (cells.has(key(rr + dc, cc + dr)) || cells.has(key(rr - dc, cc - dr))) return -1;
      }
      return cross;
    };
    const put = (item, r, c, dir) => {
      const w = item.word, dr = dir === 'down' ? 1 : 0, dc = dir === 'across' ? 1 : 0;
      for (let i = 0; i < w.length; i++) { const k = key(r + dr * i, c + dc * i), e = cells.get(k) || { ch: w[i] }; e[dir] = true; cells.set(k, e); }
      placed.push({ item, r, c, dir });
    };
    put(picked[0], 0, 0, 'across');
    const rest = picked.slice(1);
    for (let pass = 0; pass < 2; pass++) {
      for (const item of rest.filter(x => !placed.some(p => p.item === x))) {
        const w = item.word, opts = [];
        for (const p of placed) {
          const pw = p.item.word, dir = p.dir === 'across' ? 'down' : 'across';
          for (let i = 0; i < pw.length; i++) for (let j = 0; j < w.length; j++) if (pw[i] === w[j]) {
            const r = p.dir === 'across' ? p.r - j : p.r + i, c = p.dir === 'across' ? p.c + i : p.c - j;
            if (can(w, r, c, dir) >= 1) opts.push([r, c, dir]);
          }
        }
        if (opts.length) { const [r, c, d] = opts[rnd(opts.length)]; put(item, r, c, d); }
      }
    }
    return { cells, placed };
  }
  function crossword(list, count = 12) {
    const pool = shuffle(list).slice(0, count);
    if (!pool.length) return { rows: 0, cols: 0, cells: [], words: [] };
    let best = null;
    for (let t = 0; t < 150; t++) {
      const order = shuffle(pool).sort((a, b) => b.word.length - a.word.length + (rnd(3) - 1));
      const L = layout(order);
      let r0 = 1e9, c0 = 1e9, r1 = -1e9, c1 = -1e9;
      L.cells.forEach((e, k) => { const [r, c] = k.split(',').map(Number); r0 = Math.min(r0, r); c0 = Math.min(c0, c); r1 = Math.max(r1, r); c1 = Math.max(c1, c); });
      const area = (r1 - r0 + 1) * (c1 - c0 + 1), score = L.placed.length * 45 - area;      // a word is worth more than a few squares, but a compact grid wins between equal layouts
      if (!best || score > best.score) best = { score, L, r0, c0, r1, c1 };
    }
    const { L, r0, c0, r1, c1 } = best, rows = r1 - r0 + 1, cols = c1 - c0 + 1;
    const cells = Array.from({ length: rows }, () => Array(cols).fill(''));
    L.cells.forEach((e, k) => { const [r, c] = k.split(',').map(Number); cells[r - r0][c - c0] = e.ch; });
    const words = L.placed.map(p => ({ item: p.item, dir: p.dir, r: p.r - r0, c: p.c - c0 }));
    const starts = [...new Set(words.map(w => w.r * 1000 + w.c))].sort((a, b) => a - b);
    words.forEach(w => { w.n = starts.indexOf(w.r * 1000 + w.c) + 1; });
    words.sort((a, b) => a.n - b.n || (a.dir === 'across' ? -1 : 1));
    return { rows, cols, cells, words };
  }

  const scramble = w => { let s, t = 0; do { s = shuffle(w.split('')).join(''); } while (s === w && ++t < 30); return s; };
  return { items, wordSearch, crossword, scramble, shuffle, clean, show };
})();
