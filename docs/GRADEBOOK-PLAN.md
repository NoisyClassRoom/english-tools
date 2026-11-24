# Gradebook plan ("Redovalnica")

Written 24 Nov 2026. **No pupil data in this file** (public repository). The teacher agreed to the ideas and made the decisions in section 8 on
24 Nov 2026. Nothing is used with real pupils before `DATA-PROTECTION.md` describes it (SL/EN).

## 1. What it is

The teacher's **personal working gradebook** for English: written tests by points, oral examinations, and an overview per pupil and
class. **eAsistent stays the official record**: the gradebook helps to prepare and check the grades that the teacher then enters in
eAsistent. Teacher only (accounts in `TEACHER_EMAILS`); pupils, parents and other staff never see it.

## 2. Pages

New page `results/gradebook/` (or a tab of the Results page, see 8), built mobile-first (oral grades are entered in class, on a phone):

- **Tests**: list per class and period; a test = name, date, class, period, parts with their maximum points, grade thresholds.
- **Enter points**: one row per pupil of the class (from the Roster tab), one number per part, total, % and grade calculated at once;
  marks *manjkal* (absent) and *opravičen* (excused); a **retake** (*popravni*) is a new attempt linked to the original test.
- **Oral**: pick the class → pupils not yet examined this period come first (optional random pick among them) → grade, topic, the
  questions asked (short text), note. The list of questions already asked in this class this period is shown, to avoid repeats.
- **Overview**: per class and period, every pupil with all grades (written and oral), their number and average; warnings (fewer
  than N grades, a missed test without a retake); a list ready to copy into eAsistent.
- **Test analysis**: per test, the share of points per part (and per group A/B), so the hardest part is visible.

## 3. Link with the printable tests (`tests/`)

The test maker already knows the parts (A, B, C … with points), the total, the groups A/B and the grade thresholds (default
90 / 80 / 65 / 40 %, editable per test; points = ceil(% × total)). After "Make the test", a new button **"Save to gradebook"**
creates the test there with the same parts, points, thresholds, title and units, so nothing is typed twice. Tests can also be
created by hand (e.g. a test not made with the test maker).

## 4. Grade rule

As on the printed grade table: grade 5 from g5 %, 4 from g4 %, 3 from g3 %, 2 from g2 %, else 1; the point limits are rounded up
the same way as on the sheet, so the grade in the gradebook always matches the table the pupil sees. Oral grades are entered
directly (1–5).

## 5. Storage

A **separate private Google Sheet** "Redovalnica – angleščina" in the teacher's school account, created on first save; its ID in
the script property `GRADEBOOK_SHEET_ID` (as for the observation sheet). Tabs: `Testi` (one row per test and its parts),
`Tockovanje` (one row per pupil and test: points per part, total, grade, status, attempt), `Ustno` (date, pupil, grade, topic,
questions, note), `Obdobja` (period dates). Pupils are identified by name and class as in the Roster tab (the same key as the
Results page); no e-mail is needed. Kept apart from the English results Sheet, so it can be deleted on its own.

## 6. Later (not in the first version)

- On the pupil's line: their practice activity (Results page) and their "Znam" self-assessment, for parent meetings.
- Per-part statistics over several years; a link from a weak part to the matching online exercise.
- Export to Excel/PDF for a parent meeting or the class teacher.

## 7. Data protection (to add to DATA-PROTECTION.md before first use, SL/EN)

Draft: the teacher's personal working gradebook for English: test points per part, grades, oral grades with the topic and
the questions asked, and short notes, per pupil (name and class from the class list). Kept in a separate private Sheet in the
teacher's school account; only the teacher sees it, pupils and other staff do not. eAsistent remains the official record.
Several school years are kept, so the teacher sees a pupil's earlier English grades; the teacher deletes what is no longer
needed at the end of each school year, at the latest two years after the pupil leaves the school.

## 8. Decisions of the teacher (24 Nov 2026)

1. **Where:** a new page `results/gradebook/`, linked from the Results page.
2. **Retention and earlier years:** the teacher decides at the end of each school year what to delete. Pupils move up a grade and
   their earlier grades stay useful, so the gradebook keeps several school years and shows **a pupil's grades from earlier years**
   (pupil = name; class per school year from the Roster tab, e.g. 6.A in 2026/27 → 7.A in 2027/28). A menu command deletes a
   chosen school year or one pupil. Proposed default for DATA-PROTECTION: the same rule as the other results – at the latest two
   years after the pupil leaves the school (to confirm with the teacher).
3. **Grading periods 2026/27:** 1st period 1 Sep – 31 Jan, 2nd period 1 Feb – 24 Jun (tab `Obdobja`, editable each year).
4. **No warning** for too few grades; the overview just shows the count.
