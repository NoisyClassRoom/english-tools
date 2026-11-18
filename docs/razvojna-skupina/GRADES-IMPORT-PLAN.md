# Grades import plan (part 5 of the results)

Built 18 Nov 2026: `uvoziOcene` in the questionnaire script (private repo, `razvojna-skupina/Vprasalnik.gs`), grades in
`rsresults` (`rsGrades_`, Code.gs 2026-11-18.1), parts 5a, 6a and the response rate on `team/rezultati/`. 5b waits for the
spring round and a second period.

Written 18 Nov 2026 after looking at the first eAsistent export. **No pupil data in this file** (it is in the public repository).
Approval of the use: the principal approved linking grades with the questionnaire answers (17 Nov 2026). Nothing is imported
before `DATA-PROTECTION.md` describes the use (SL/EN).

## 1. What the eAsistent export looks like

- One Excel file for the whole school, one sheet `podatki`. Header in row 2, data from row 3.
- One row per **pupil and grading period**: `Oddelek` (e.g. `5. B`, with a space), `Učenec` (full name), `Ocenjevalno obdobje`
  (`1. ocenjevalno obdobje`, `2. ocenjevalno obdobje`, `Konec leta`). Every pupil has all three rows.
- Then one column per subject followed by its `Zaklj.` (closing grade) column: 38 subjects in the export of 18 Nov 2026.
- A subject cell holds **all marks of the period in one text**, e.g. `5, 4`; empty marks show as `, `. The closing grade is a
  number 1–5; in the 1st VIO it can be a descriptive text (not used).
- 18 Nov 2026: 133 pupils in 17 classes; only the 1st period has marks (716 subject cells), no closing grades yet.
- Names: 2 words (118) or 3 words (15), about half with č/š/ž. The same name never appears in two classes.

## 2. Where the grades are kept

- **Not** in this repository and not in the NoisyClassRoom (English) Sheet.
- A new tab **`Ocene`** in the private questionnaire responses Sheet ("Samouravnavanje učenja – vprašalnik (odgovori)", in the
  private Drive folder), so grades and answers stay in one private place that only the teacher can open. Long format, one row per
  pupil, period and subject:
  `Šolsko leto | Obdobje | Razred | Učenec | Ključ (e-naslov) | Predmet | Sklop | Ocene | Število ocen | Povprečje | Uvoženo`
  (`Ključ` = the pupil's school e-mail, the questionnaire key; `Povprečje` = mean of the marks of the period). **Built 18 Nov 2026:**
  only pupils of grades 4–9 who answered the questionnaire and only compulsory subjects are written; closing and descriptive
  grades are not stored.
- A tab **`Sklopi`** (editable by the teacher): subject code → subject group (JEZ, MAT, NAR, DRU, TEH, UMS) or `—` (not used).
- A tab **`Velikost razredov`**: pupils per class from the export (counts only) – for the response rate (see 6).

## 3. How an export gets in

1. The teacher exports from eAsistent as now and uploads the `.xlsx` into the private Drive folder "NoisyClassRoom".
2. In the questionnaire script ("Vprašalnik – samouravnavanje učenja") the teacher runs **`uvoziOcene`**. It takes the newest
   file whose name starts with `excel-` in that folder, reads it directly (an .xlsx is a zip of XML; no conversion, no temporary file, no extra Drive service),
   and **replaces** all `Ocene` rows of that school year (so a later export – end of the 1st period, end of year – simply
   overwrites the earlier one; running it twice does no harm).
3. The log says: pupils, rows, subjects without a group in `Sklopi`, and pupils that could not be matched (see 4).
4. The uploaded file can then be deleted from Drive (the teacher's choice).

## 4. Matching grades with questionnaire answers

The questionnaire key is the school e-mail (2nd/3rd VIO) or name + class (1st VIO); eAsistent has name + class.

- Names are compared as a **set of words**, lower case, without č/š/ž/ć (the school e-mail rule: š → s …), so the word order
  (Priimek Ime / Ime Priimek) and double names don't matter. 2nd/3rd VIO: words of the e-mail before `@` (split at `.`);
  1st VIO: the name the pupil wrote.
- Only inside the **same class**.
- One clear match → the pupil's `Ključ` is filled in. No match or two possible matches → the row goes to a tab
  **`Pregled ujemanj`**, where the teacher picks the right pupil (like `Pregled razredov`). Pupils without questionnaire
  answers simply have an empty `Ključ`.

## 5. What the pages get and show

- `rsresults` adds, per pupil it already sends, the **group averages per period** (e.g. `{p1: {JEZ: 4.3, MAT: 3.5, vsi: 4.0}}`),
  never single marks or subject names. Same role rules as the answers: team all; class teacher only the own class; principal all
  classes without names; **teachers get no grades** (table in ANALIZA-PRIMER.md).
- **Only 2nd and 3rd VIO** (as planned): the 1st VIO grades are mostly descriptive.
- Parts as planned in ANALIZA-PRIMER.md: **5a** average grade with / without a habit, **5b** change in habits × change in grade
  (needs the spring round and two periods), **6a** grades of one pupil in the named view. Always the note "povezava, ne vzrok".
  Groups smaller than 3 are not shown. A grades slide for team/zbor/ only when the team asks for it.
- Until a period is closed, the average of the marks so far is shown and labelled as such ("ocene doslej").

## 6. Small extra: response rate

From `Velikost razredov` the results page can show "odgovorilo 78 od 133 učencev (59 %)" per class and triad. Counts only.

## 7. Decisions of the teacher (18 Nov 2026)

1. **Storage:** the hidden tab `Ocene` in the private questionnaire Sheet (as in 2).
2. **Only compulsory subjects** count in the group averages; electives (IP-…, N2A, NIP-R) and USA are left out (`—` in `Sklopi`).
   The adapted `-SPEC` subjects count like the normal subject. Groups:

   | Group | Subjects |
   |---|---|
   | JEZ | SLJ, TJA, TJN, TJA-SPEC, TJN-SPEC / TJN-spec |
   | MAT | MAT |
   | NAR | SPO, NIT, NAR, FIZ, KEM, BIO, GOS |
   | DRU | DRU, GEO, ZGO, DKE, DKE-SPEC |
   | TEH | TIT |
   | UMS | LUM, GUM, ŠPO |
   | — (not used) | IP-AI1/2/3, IP-IŠO, IP-LPL, IP-LS1/2/3, IP-MME, IP-ROM, IP-ŠNO, IP-ŠZZ, N2A, NIP-R, USA |

   A new code in a later export goes to `—` and is listed in the log until the teacher sets its group in `Sklopi`.
3. **Grade rule:** always the **mean of the marks** of the period (the closing grade is kept in `Ocene` but not used); a
   group's average is the mean of its subjects' averages (each subject counts the same).
4. **When:** import the **marks so far now** (1st period, labelled "ocene doslej"); later exports replace them.
5. **Response rate:** yes, on the results page (counts only).

## 8. Data protection (to add to DATA-PROTECTION.md before the first import, SL/EN)

Draft: since … the **grades** of pupils from eAsistent (exported by the teacher) are kept in a hidden tab of the private
questionnaire Sheet: school year, period, class, pupil's name, the questionnaire key, subject, the marks of the period, their
mean and the closing grade. Only compulsory subjects are used, as the mean of the marks. They are used only to link grades with the questionnaire answers: averages per subject group and
period (2nd and 3rd VIO). Pages receive only group averages per pupil, never single marks; the development team and the class
teacher (own class) see them by name, the principal without names, teachers not at all. Groups smaller than 3 are not shown.
Each new export replaces the earlier one; rows of pupils who left the school are deleted under the same rules as the results.
Approved by the principal on 17 Nov 2026.
