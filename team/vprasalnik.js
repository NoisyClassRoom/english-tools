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
    return { cls: p.c || '', vio: p.v, r, n: p.n || '' };
  });
  const TRIADS = [['1', '1. VIO', '1.–3. razred'], ['2', '2. VIO', '4.–6. razred'], ['3', '3. VIO', '7.–9. razred']];
  return { ST, STRAT, SCALE, TOP, pupils, TRIADS };
})();
