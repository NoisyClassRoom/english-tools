# Sample results dashboard: exact specification

On 6 Nov 2026 the team was shown a sample dashboard "Kako se učimo – primer rezultatov" with invented data. It was 212 pupils, autumn and spring rounds, and grades by subject group. The team wants the real results pages (`team/rezultati/`) to look and work **like this**. The sample is not in the repo, so this file describes every part of it exactly. Rebuild it with the real data and the app's own style and code.

All labels are in Slovenian, as in the sample.

## Data the sample used

One row = one pupil in one round. After de-duplication (last submission per pupil per round, see `Podvojene`), the real long-format data turns into this shape:

| Field | Meaning |
|---|---|
| `sifra` | pupil key. In the real page: the school e-mail (2nd/3rd VIO), or name + class (1st VIO). Show the **name** only to the team and the pupil's class teacher. |
| `vio`, `razred`, `krog` | triad 1–3, class (`5.A`), round `zacetno` / `koncno` |
| `N1`…`R5`, `D…`, `M…` | statement values. 2nd/3rd VIO 1–5 (1 nikoli … 5 vedno); 1st VIO 1–3 (1 še ne … 3 pogosto) |
| `S5_STxx` | strategy grid: 1 ne poznam, 2 poznam, ne uporabljam, 3 poznam in uporabljam |
| `N7` | when the pupil starts learning for a test (lower = earlier) |

Grades (separate data, from eAsistent): per pupil and period (`1. ocenjevalno obdobje`, `konec leta`), the average grade per subject group `JEZ`, `MAT`, `NAR`, `DRU`, `TEH`, `UMS` and `vsi` (all subjects). Only 2nd and 3rd VIO, because grades in 1st VIO are mostly descriptive.

**"Top answers"** in the whole dashboard: in 2nd/3rd VIO, values 4–5 (pogosto, vedno); in 1st VIO, value 3 (pogosto). Never average values across the two scales.

## Page layout, top to bottom

0. **Header**: title, a short lead sentence that puts the two headline changes into words (e.g. "the share of pupils who plan their study time rose from 41 % to 52 %…"), and a **triad filter** for the whole page: Vse triade / 1. VIO (1.–3. razred) / 2. VIO (4.–6. razred) / 3. VIO (7.–9. razred). "Vse triade" combines 2nd and 3rd VIO wherever a scale differs.

1. **Four tiles (KPI)**, each showing the spring value, then "prej X · ±Y o. t." (before X, change in percentage points):
   - Sodelujoči učenci: number of pupils, both rounds.
   - Načrtujejo čas učenja (pogosto ali vedno): share with `N3 ≥ 4`.
   - Uporabljajo samopreverjanje: share with `S5_ST06 = 3`.
   - Za test se začnejo učiti vsaj 2 dni prej: share with `N7 ≤ 3`.

   The last three exist only in 2nd/3rd VIO; with the 1st VIO filter, show "—" and a note that these questions are not asked in 1st VIO. Color the change green when it is up and red when it is down.

2. **Začetno in končno merjenje po trditvah**: a dumbbell chart, one row per statement. Each row has two dots, the autumn share and the spring share of top answers, joined by a line. Statements and short labels used: N1 Ve, kaj mora znati · N2 Postavi si cilj · N3 Načrtuje čas učenja · N5 Stalen čas in prostor · N6 Pripravi potrebne stvari · N9 Omeji motnje · D1 Domače naloge redno · D2 Uči se sproti · D3 Izpelje, kar si zada · D5 Vztraja pri zahtevnem · S0 Pozna različne načine učenja · S3 Strategijo izbere po predmetu · M5 Izlušči bistvo besedila · M1 Preverja, ali razume · M3 Pravočasno prosi za pomoč · R3 Oceni, kaj mora ponoviti · R1 Pregleda napake · R2 Spremeni način učenja · R5 Ve, zakaj mu je šlo dobro ali slabo · P1 Starši pomagajo pri šolskem delu. Sort by spring value. Show only statements that have answers in both rounds.

3. **Katere strategije učenci poznajo in uporabljajo** (2nd/3rd VIO): one 100 % stacked bar per strategy, with the parts poznam in uporabljam / poznam, ne uporabljam / ne poznam. There are two panels, Začetno and Končno, side by side. Sort by the "poznam in uporabljam" share. Strategies shown, with labels: ST02 Podčrtovanje ključnih besed · ST22 Zapisovanje ključnih besed · ST04 Miselni vzorec · ST03 Povzetek s svojimi besedami · ST05 Skica, slika, tabela · ST24 Kartice z vprašanji · ST06 Samopreverjanje brez zapiskov · ST21 Ponavljanje na glas · ST07 Razlaga drugi osebi · ST09 Samostojno reševanje nalog · ST10 Ponovno reševanje napak · ST08 Učenje v krajših obdobjih · ST11 Povezovanje s predznanjem · ST18 Pomnilni triki.

4. **Primerjava razredov**: a heat map table, one row per class. Columns: N3 načrtuje, R1 pregleda napake, ST06 samopreverjanje, N7 zgodnji začetek. Each cell shows the spring share and, in brackets, the change since autumn. A darker cell means a higher share. Hide classes with fewer than 5 pupils ("premalo odgovorov").

5. **Učne navade in ocene** (2nd/3rd VIO), with a **subject group filter**: Vsi predmeti / Jezikovni sklop / Matematika / Naravoslovni sklop / Družboslovni sklop / Tehnični sklop / Umetnostni in športni sklop. Always add the note "povezava, ne vzrok" (a link, not a cause).
   - **5a. Povprečna ocena ob koncu leta: z navado in brez nje**: grouped bars for four habits measured in spring:
     - Načrtuje čas učenja (`N3 ≥ 4`),
     - Uporablja samopreverjanje (`S5_ST06 = 3`),
     - Začne se učiti 2+ dni prej (`N7 ≤ 3`),
     - Pregleda napake (`R1 ≥ 4`).

     For each habit there are two bars: the average end-of-year grade of pupils who have the habit ("da") and of those who don't ("ne"). Show n.
   - **5b. Sprememba ocene glede na spremembo navad**: pupils with both rounds and both grade periods. Habit change = sum of (spring − autumn) over the six statements `N2, N3, M1, R1, R3, D2`. Three groups:
     - Izboljšali navade (+3 ali več),
     - Malo ali brez spremembe (between −1 and +2),
     - Poslabšali navade (−2 ali več).

     For each group, a bar of the average grade change from the 1st period to the end of the year, for the chosen subject group. Show n.

6. **Napredek posameznega učenca**: a pupil picker filtered by the triad filter. It is visible only to the team and to that pupil's class teacher. Show a table with one row per statement: autumn value, spring value and the difference, colored up or down. Show the scale in the note.
   - **6a. Ocene istega učenca**: per subject group, the average grade at the 1st period and at the end of the year, and the change.

7. **Kako bomo delali analize**: a short text box explaining the method. Answers are saved with codes, so nothing is retyped. Shares are computed per triad and class. The same questionnaire is repeated in spring. Answers are linked with grades by subject group. The team sees the results first, then class teachers, teachers and the principal get their own views.

## Rules that the sample already followed

- Shares, not averages, wherever the 1st VIO scale differs.
- Percentage points for changes.
- Minimum group size 5 for anything shown outside the team's named view.
- Every chart shows n, and each chart has a one-line note on what it shows.
- Grade views only for 2nd/3rd VIO.
- Before the spring round there is no "končno" data: show the autumn values only, and hide the change and the pupil-progress parts.

## Which roles see which parts

| Part | team | class teacher | teacher | principal |
|---|---|---|---|---|
| 1–4 (whole school, triads) | ✓ | ✓ | ✓ | ✓ |
| 4 (classes) | ✓ | own class | – | ✓ |
| 5 (grades, aggregated) | ✓ | own class | – | ✓ |
| 6 (one pupil, named) | ✓ | own class | – | – |

This follows the roles in `RAZVOJNA-SKUPINA-PLAN.md`; start with the team view only.
