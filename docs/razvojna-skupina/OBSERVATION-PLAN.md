# Strategy observation sheets: plan for NoisyClassRoom

Written 6 Nov 2026 for Claude Code. Repo: `noisyclassroom/english-tools`. Read `README.md`, `DATA-PROTECTION.md`, `SELF-REGULATION-PLAN.md` and `SURVEY-IMPORT-PLAN.md` first. Same conventions apply. **Ask before each step.**

## Background

OŠ Veržej's development team works on self-regulated learning (samouravnavanje učenja) for the whole school. Two things exist already, outside this repo:

1. **The starting-point questionnaire** (Google Forms, Apps Script "Vprašalnik – samouravnavanje učenja"). It runs 11–21 Nov 2026 (`zacetno`) and again in spring (`koncno`), and then every school year. Coded answers go to a separate Sheet, tab `Vprasalnik`. That Sheet's ID belongs in script property `SURVEY_SHEET_ID`; keep it out of the repo.
2. **The strategy list** "Nabor učnih strategij", codes `ST01`–`ST24`. The questionnaire uses these same codes in `S1` (1st VIO), the grid `S5` (codes `S5.ST02`… with values 1 = I don't know it, 2 = I know it but don't use it, 3 = I know it and use it) and `S2` / `S6` (the strategy that helps most).

What is missing is a record of **what teachers do in class**: which strategy was introduced, when, in which class and subject, how well it worked and how the pupils reacted. The team will compare that record with the questionnaire answers.

## Goal

1. A simple **observation sheet** that every participating teacher fills in after a lesson in about one minute, on a phone or computer.
2. An **analysis page** for the development team: what was introduced where, how well it worked, and how the questionnaire answers changed in the classes that worked on a strategy.

## Who uses it

- **Participating teachers** (not only the English teacher). New script property `OBSERVER_EMAILS` holds a list of school e-mails. Do not let anyone in by `@os-verzej.si` alone: **pupils have the same domain**. Teachers in `TEACHER_EMAILS` are also observers.
- **The development team** (Anastazij, Vanja, Damjana, Mitja) sees the analysis. New property `TEAM_EMAILS`, plus everyone in `TEACHER_EMAILS`.
- An observer sees and edits only their **own** observations. The team sees everyone's observations, but only on the analysis page.

## Storage

Use a **separate Sheet**, "Samouravnavanje – opazovanja", with ID in property `OBS_SHEET_ID`. This follows the same reasoning as the questionnaire: whole-school data stays apart from the English results, and the data-protection officer can judge it on its own.

| Tab | Content |
|---|---|
| `Opazovanja` | one row per lesson (columns below) |
| `Strategije` | code, name, short description, triads (1/2/3), suitable subject groups. Copied once from "Nabor učnih strategij" and edited by the team. **This is the only list the form offers.** Never renumber; a new strategy gets a new code (`ST25`…). |
| `Sklopi` | subject group code, name, subjects: `JEZ` languages, `MAT` maths, `NAR` science, `DRU` social sciences, `TEH` technology/ICT, `UMS` arts, music, PE. These are the same codes as the grade groups in the results dashboard. |
| `Razredi` | the classes of the current school year (`1.A` … `9.B`). Update it every September. |

Columns of `Opazovanja`:

| Column | Type | Notes |
|---|---|---|
| ID | text | generated (`OBS-` + timestamp + random) |
| Vpisano | datetime | when saved |
| Šolsko leto | text | `2026-27`, computed from the lesson date (September–August), same rule as the questionnaire |
| Datum ure | date | default today |
| Učitelj | e-mail | from sign-in, never typed |
| Razred | from `Razredi` | one class per row; for a group from several classes, save one row per class |
| Triada | 1/2/3 | computed from the class |
| Sklop | from `Sklopi` | |
| Predmet | short text from a list per sklop | e.g. SLJ, TJA, MAT, NAR, GEO … |
| Strategija | from `Strategije` | one per row. Two strategies in one lesson = two rows (form button "+ še ena strategija" copies the row). |
| Faza | 1–4 | 1 introduce and model (teacher shows, thinks aloud) · 2 guided practice · 3 pupils use it on their own · 4 reflection (pupils say what helped). These are the same steps as in the teacher guide. |
| Tema | short text, max 100 characters | lesson topic. The help text says: no pupil names. |
| Trajanje | minutes, 5–45 | time spent on the strategy |
| Učinkovitost | 1–5 | "Kako dobro je strategija delovala pri tej uri?" |
| Sodelovanje | 1–4 | how many pupils used it: few · about half · most · almost all |
| Odziv | 1–5 | pupils' interest and reaction (1 resistance … 5 enthusiasm) |
| Samostojna uporaba | yes / no / not yet known | did pupils later use it without being told? The teacher can change this afterwards. |
| Opombe | text, max 300 characters, optional | what to change next time; no pupil names |

No pupil-level data at all: class only. That keeps it outside the leavers cleanup.

## Pages and actions

Put the page in the same folder style as `today/`, as `observe/` with WordPress page "Opazovalni list". Use the same sign-in and token as the other teacher pages.

1. **Form** (`obsadd`, `obsupdate`, `obsdelete` for own rows only):
   - one screen, big buttons, works on a phone;
   - choose class and sklop first, then subject and strategy (filtered to the class's triad);
   - the last used class, sklop and subject are remembered on the device (localStorage in try/catch);
   - save shows ✓ and "Še ena strategija pri tej uri?".
2. **My observations** (`obsmine`): own rows of the current school year, newest first, with edit, delete and change of "Samostojna uporaba". Add a small "Kaj sem že uvedel" grid: class × strategy with the number of lessons and the highest phase reached.
3. **Analysis**, team only (`obsstats`; only aggregated numbers go to the page). Filters: school year, triad, class, sklop, strategy.
   - Overview: number of lessons by strategy × sklop (heat map), and by month (are we consistent through the year?).
   - Per strategy: average effectiveness, participation and reaction; share "used on their own"; highest phase reached per class.
   - Per class: timeline of strategies introduced (date, strategy, phase). This shows the "consistency over time" the team asked for.
   - Teachers: number of observations per teacher, visible to the team only. Use it to see who needs support, never as a ranking; label it that way.

## Link with the questionnaire (the analysis the team asked for)

Read the survey Sheet by `SURVEY_SHEET_ID` and never copy it. Work at **class level** only.

- **One answer per pupil per round**: if a pupil has several submissions in the same school year and round, use the **last** one. The tab `Podvojene` lists them. Key: e-mail (2nd/3rd VIO) or name + class (1st VIO).
- For each class, strategy and school year:
  - **intensity**: number of observed lessons with that strategy before the spring round, and the highest phase reached;
  - **start**: from `S5.STxx` (autumn), the share of pupils with 2 (know it) and with 3 (know and use it). In 1st VIO, use `S1` (share who chose it);
  - **end**: the same from the spring round;
  - **change** = end − start, in percentage points;
  - also the share who chose it in `S2` / `S6` (helps most), start vs end.
- Table and scatter plot: intensity (x) against change in "know and use" (y), one dot per class × strategy. Also compare classes that worked on a strategy with classes that did not (average change).
- Show the wording **"povezava, ne dokaz vzroka"** (a link, not proof of cause) next to every comparison.
- **Minimum group size: 5 pupils.** Below that, show "premalo odgovorov" instead of numbers.
- Compare only the same code in the same triad with the same scale. The survey Sheet's `Zgodovina` tab records question and scale changes per school year and round. If a code's text or scale changed between the rounds being compared, show a warning.
- Optionally, if the results dashboard's grade groups are added later, add the average grade change per sklop. Ask first.

## Across school years

- Every row has `Šolsko leto`. Nothing is deleted at the end of the year.
- In the end-of-year routine: archive nothing, but clear and refill `Razredi` for the new year (ask the teacher).
- Classes change name every year (5.A → 6.A). For a cohort view, a class in one year maps to its next-year name: same letter, grade + 1. 9th grade drops out and 1st grade is new. Do this in the analysis only; never rewrite stored rows.
- The "start vs end" analysis always works inside one school year. The year-to-year view compares the same grade (e.g. 5th grade 2026-27 vs 5th grade 2027-28) or the same cohort.

## Rules

- Same ground rules as `SELF-REGULATION-PLAN.md`. Numbers on team pages are aggregated. No pupil names in observations. Test accounts are excluded.
- `DATA-PROTECTION.md`, both languages: a new section for "Opazovanja". It stores teacher e-mails, classes and lesson notes, with no pupil data, and lists who can see what.
- The health check confirms that `OBS_SHEET_ID` and `SURVEY_SHEET_ID` can be opened and that `OBSERVER_EMAILS` is not empty.
- Bump `CODE_VERSION`, update `README.md`.
- Keep it simple. If a step needs much more code than described here, stop and ask.

## Order of work (ask before each)

1. Sheet and tabs, properties, health check.
2. Form and My observations.
3. Analysis without the questionnaire.
4. Link with the questionnaire (after the spring round there is something to compare; before that, show start values only).
5. Export to the self-evaluation report: the tables as printable HTML or CSV for the team.

## Note on `SURVEY-IMPORT-PLAN.md`

The code list in that file is from 22 Oct 2026 and is out of date. The questionnaire has since been merged with a colleague's proposal: new codes N6–N9, D5–D8, M5, R4, R5, S3, S5 (grid), S6, O1, O2, P1, K1, E1–E9, and a 5-point scale in 2nd/3rd VIO. The **`Sifrant` tab in the survey Sheet is authoritative**: it has one row per school year × round × VIO × code × option. Update that plan's code section from `Sifrant` before building it.
