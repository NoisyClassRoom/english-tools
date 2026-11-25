/* Shared definitions of the questionnaire "Kako se učim?" for the pages that show its results (team/rezultati/, team/zbor/).
   No pupil data here: only the codes of the merged questionnaire, their short labels and the scales.
   To add a new statement: one line in VPR.ST (code, short label, triads where it is asked). The server sends every code that
   matches RS_RES_CODES in apps-script/Code.gs (N*, D*, S0, S3, M*, R*, P1); a code outside that pattern also needs a change there.
   To add a strategy to the 2nd/3rd VIO grid: one line in VPR.STRAT. The 1st VIO choices (S1) need nothing here: the server sends
   the option texts with the data. */
window.VPR = (() => {
  const ST = [['N1', 'Ve, kaj mora znati', [1, 2, 3]], ['N2', 'Postavi si cilj', [2, 3]], ['N3', 'Načrtuje čas učenja', [2, 3]], ['N5', 'Stalen čas in prostor', [1, 2, 3]],
    ['N6', 'Pripravi potrebne stvari', [1]], ['N9', 'Omeji motnje', [2, 3]], ['D1', 'Domače naloge redno', [1, 2, 3]], ['D9', 'Domačo nalogo naredi v podaljšanem bivanju', [1]],
    ['D2', 'Uči se sproti', [2, 3]], ['D3', 'Izpelje, kar si zada', [2, 3]], ['D5', 'Vztraja pri zahtevnem', [3]], ['S0', 'Pozna različne načine učenja', [1, 2, 3]],
    ['S3', 'Strategijo izbere po predmetu', [3]], ['M5', 'Izlušči bistvo besedila', [2]], ['M1', 'Preverja, ali razume', [1, 2, 3]], ['M3', 'Pravočasno prosi za pomoč', [1, 2, 3]],
    ['R3', 'Oceni, kaj mora ponoviti', [2, 3]], ['R1', 'Pregleda napake', [1, 2, 3]], ['R6', 'Pregleda napake v domači nalogi', [1]], ['R2', 'Spremeni način učenja', [1, 2, 3]],
    ['R5', 'Ve, zakaj mu je šlo dobro ali slabo', [3]], ['P1', 'Podpora staršev pri šolskem delu', [1, 2, 3]]];
  const STRAT = [['ST02', 'Podčrtovanje ključnih besed'], ['ST22', 'Zapisovanje ključnih besed'], ['ST04', 'Miselni vzorec'], ['ST03', 'Povzetek s svojimi besedami'],
    ['ST05', 'Skica, slika, tabela'], ['ST24', 'Kartice z vprašanji'], ['ST06', 'Samopreverjanje brez zapiskov'], ['ST21', 'Ponavljanje na glas'], ['ST07', 'Razlaga drugi osebi'],
    ['ST09', 'Samostojno reševanje nalog'], ['ST10', 'Ponovno reševanje napak'], ['ST08', 'Učenje v krajših obdobjih'], ['ST11', 'Povezovanje s predznanjem'], ['ST18', 'Pomnilni triki']];
  const SCALE = { 1: ['še ne', 'včasih', 'pogosto'], 2: ['nikoli', 'redko', 'včasih', 'pogosto', 'vedno'], 3: ['nikoli', 'redko', 'včasih', 'pogosto', 'vedno'] };
  const TOP = v => v === 1 ? 3 : 4;     // top answers: 1st VIO value 3 (pogosto); 2nd/3rd VIO values 4–5 (pogosto, vedno)
  // the pupils of action rsresults, each answer set carrying the top value of its own scale
  const pupils = j => (j.pupils || []).filter(p => p.v >= 1 && p.v <= 3).map(p => {
    const r = {}; Object.keys(p.r || {}).forEach(k => { r[k] = Object.assign({ _top: TOP(p.v) }, p.r[k]); });
    return { cls: p.c || '', vio: p.v, r, n: p.n || '', g: p.g || null };   // g: mean grade per subject group and period (2nd/3rd VIO, where the role may see it)
  });
  const TRIADS = [['1', '1. VIO', '1.–3. razred'], ['2', '2. VIO', '4.–6. razred'], ['3', '3. VIO', '7.–9. razred']];

  // ---- correlations (25 Nov 2026): the pairs the teacher chose in advance; Spearman's rho with average ranks for ties.
  // Used by team/rezultati/ ("Povezave", team only) and team/zbor/ (slide "Kaj gre skupaj"), so both always show the same numbers.
  const rankOf = xs => { const idx = xs.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]), r = new Array(xs.length);
    for (let i = 0; i < idx.length;) { let j = i; while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++; const avgR = (i + j) / 2 + 1; for (let k = i; k <= j; k++) r[idx[k][1]] = avgR; i = j + 1; } return r; };
  const spearman = pairs => { const n = pairs.length; if (n < 3) return null; const a = rankOf(pairs.map(x => x[0])), b = rankOf(pairs.map(x => x[1]));
    const ma = a.reduce((s, v) => s + v, 0) / n, mb = b.reduce((s, v) => s + v, 0) / n; let num = 0, da = 0, db = 0;
    for (let i = 0; i < n; i++) { num += (a[i] - ma) * (b[i] - mb); da += (a[i] - ma) ** 2; db += (b[i] - mb) ** 2; } return da && db ? num / Math.sqrt(da * db) : null; };
  const hasS5 = a => Object.keys(a).some(k => k.startsWith('S5_'));
  const nStrat = a => hasS5(a) ? STRAT.filter(([c]) => a['S5_' + c] === 3).length : null;
  const HAB6 = ['N2', 'N3', 'M1', 'R1', 'R3', 'D2'];
  // [label A, value A, label B, value B, short label for slides]; value(answers, pupil) – pupil.__grade = mean grade (vsi) of the latest import
  const CORR = {
    23: [['N3 načrtuje čas učenja', a => a.N3, 'N7 zgodnji začetek učenja za test', a => a.N7 == null ? null : -a.N7, 'Načrtuje čas × začne se učiti prej'],
         ['Število strategij, ki jih uporablja (S5)', nStrat, 'M1 preverja, ali razume', a => a.M1, 'Več strategij × preverja, ali razume'],
         ['Število strategij, ki jih uporablja (S5)', nStrat, 'R1 pregleda napake', a => a.R1, 'Več strategij × pregleda napake'],
         ['P1 podpora staršev', a => a.P1, 'D1 domače naloge redno', a => a.D1, 'Podpora staršev × domače naloge'],
         ['N2 postavi si cilj', a => a.N2, 'D3 izpelje, kar si zada', a => a.D3, 'Postavi si cilj × izpelje, kar si zada'],
         ['Vsota šestih navad (N2, N3, M1, R1, R3, D2)', a => HAB6.every(c => a[c] != null) ? HAB6.reduce((s, c) => s + a[c], 0) : null, 'Povprečna ocena (vsi predmeti)', (a, p) => p.__grade, 'Učne navade × povprečna ocena'],
         ['S0 pozna več strategij', a => a.S0, 'Število strategij, ki jih uporablja (S5)', nStrat, 'Pozna strategije × jih uporablja']],
    1: [['M1 preverja, ali razume', a => a.M1, 'R1 pregleda napake', a => a.R1, 'Preverja, ali razume × pregleda napake'],
        ['P1 podpora staršev', a => a.P1, 'D1 domače naloge redno', a => a.D1, 'Podpora staršev × domače naloge']]
  };
  // rows for one group of pupils (g = '1' or '23'), round k ('zacetno' / 'koncno'), period per ('p1' …) for the grade pair
  const corrRows = (L, g, k, per) => CORR[g === '1' ? 1 : 23].map(([la, fa, lb, fb, short]) => {
    const pairs = [];
    L.forEach(p => { if (!p.r[k]) return; const pp = Object.assign({ __grade: per && p.g && p.g[per] ? p.g[per].vsi : null }, p); const a = fa(p.r[k], pp), b = fb(p.r[k], pp);
      if (a != null && b != null && !isNaN(a) && !isNaN(b)) pairs.push([a, b]); });
    const n = pairs.length, rho = n >= 10 ? spearman(pairs) : null, lim = n > 1 ? 1.96 / Math.sqrt(n - 1) : 1, abs = rho == null ? 0 : Math.abs(rho);
    return { la, lb, short, n, rho, lim, chance: rho != null && abs < lim, strength: rho == null ? '' : abs < 0.1 ? 'ni povezave' : abs < 0.3 ? 'šibka' : abs < 0.5 ? 'zmerna' : 'močna' };
  });
  return { ST, STRAT, SCALE, TOP, pupils, TRIADS, spearman, corrRows };
})();
