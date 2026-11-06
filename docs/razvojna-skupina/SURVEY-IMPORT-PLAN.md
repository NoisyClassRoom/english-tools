# Starting-point questionnaire: import plan for NoisyClassRoom

Written 22 Oct 2026 for Claude Code. Read `README.md`, `DATA-PROTECTION.md` and `SELF-REGULATION-PLAN.md` first.

> **Update 6 Nov 2026:** the code list and scales below are from 22 Oct 2026 and out of date. The questionnaire was merged with a colleague's proposal (new codes, grid `S5.STxx`, 5-point scale in 2nd/3rd VIO, parents question P1, pupils sign in with the school account, run 11–21 Nov 2026). The survey Sheet now also has `Sifrant` per school year × round, `Zgodovina` (question changes) and `Podvojene` (several submissions: the last one counts). **Read the codes from `Sifrant`.** Where results appear in the app: see `RAZVOJNA-SKUPINA-PLAN.md`.

## Background

On 21 Oct 2026 the school's development and self-evaluation teams agreed that the first step is to measure the **starting point** of self-regulated learning for the whole school (1st–3rd VIO), then repeat the questionnaire in May/June. The teacher wants to run it with **Google Forms** now and later bring the answers into NoisyClassRoom, which should gradually open up to other teachers who want it.

The questionnaire is built by a separate Apps Script project, "Vprašalnik – samouravnavanje učenja" (`Vprasalnik.gs`, in the teacher's school Google account, not in this repo). It was run on 22 Oct 2026 and created three forms (one per VIO, restricted to the os-verzej.si domain, verified e-mail for 2nd/3rd VIO) and **a separate Google Sheet**:

- Sheet "Samouravnavanje učenja – vprašalnik (odgovori)". Ask the teacher for its ID; it goes only into the script property `SURVEY_SHEET_ID`, never into this public repo.
- On every submission a form trigger writes **coded rows** to its tab `Vprasalnik`; tab `Sifrant` holds the codebook; tab `Obrazci` the form links; the raw Google Forms response tabs are a backup only.

**Decision (teacher, 22 Oct 2026): the questionnaire data stays in this separate Sheet** (whole-school data kept apart from the English results, so the data-protection officer can judge it on its own and it can be shared with class teachers without sharing the app's data). NoisyClassRoom **reads** it by ID and **cross-references** pupils; it never copies the rows into the NoisyClassRoom Sheet. Put the ID in a script property (e.g. `SURVEY_SHEET_ID`), not in the public repo. The Code.gs owner account already owns the Sheet, so `SpreadsheetApp.openById` works without sharing.

## Data you will find

Tab `Vprasalnik` (long format, one row per answer, appended by the form trigger):

| Column | Content |
|---|---|
| Čas | submission time |
| Šolsko leto | `2026-27` (September–August) |
| Krog | `zacetno` (autumn) or `koncno` (spring) |
| VIO | 1, 2 or 3 |
| E-naslov | school e-mail (2nd/3rd VIO, verified sign-in); empty for 1st VIO |
| Ime (1. VIO) | name typed by the teacher (1st VIO only) |
| Razred | class as typed, upper case, no spaces (`5.A`) |
| Oddaja | form response id (groups the rows of one submission) |
| Koda | question code |
| Vrednost | numeric value or option code |
| Besedilo | answer text as shown in the form |

Tab `Sifrant`: every VIO × code × option with its text (the codebook).

Codes:

- `U1` (multiple, max 2–3): what being successful means, values `U1a`–`U1h`.
- Statements, single value: `N1`–`N5` planning, `D1`–`D3` consistency, `M1`–`M3` monitoring, `R1`–`R3` reflection, `S0` knows strategies. 2nd/3rd VIO 1–4 (Never … Always); **1st VIO 1–3 (No, Sometimes, Yes)**, so never mix the scales in one average; compare within a VIO, or use the share of the top answers.
- `D4`: time spent on school work at home, 1–5 (under 15 min … over 2 h).
- `S1` (multiple): strategies used, values `ST01`–`ST18`; `S2` (single): the strategy that helps most.

The ST codes are shared with the teacher's document "Nabor učnih strategij" (ST01–ST20; ST19/ST20 are not in the questionnaire). Keep them as the single strategy list for all later strategy tracking.

## What to build (ask before each step)

1. **Results > new tab "Questionnaire"** (teacher only, new action `surveystats`): filters for school year, round, VIO and class. For each statement, the distribution of answers as stacked bars per class; `U1`, `S1`, `S2` as the share of pupils who chose each option; `D4` as a distribution. If both rounds exist: start vs end, side by side. **Only counts go to the page**, as in `srlstats`.
2. **Team report:** add a "Starting point" block (anonymous, class level) to the existing Team report.
3. **Cross-reference (optional, ask first):** read the survey Sheet by ID and match rows to the Roster by e-mail (2nd/3rd VIO) or by name + class (1st VIO, using the existing name matching). Only for pupils on the Roster; the rest are counted but not linked. Use this only to compare a pupil's answers with their own app data in the pupil detail page, never to show one pupil's answers to anyone but the teacher.
4. **Later, when other teachers join:** the Roster and teacher accounts must cover the whole school first. That is a separate decision; do not start it from this plan.

## Rules

- Same ground rules as `SELF-REGULATION-PLAN.md`: no new free text from pupils, own data only on pupil pages, aggregated numbers on team pages, test accounts excluded.
- The questionnaire is a **new processing activity** (named, whole school, study habits). It goes live only after the school's data-protection officer has approved it and parents are informed. Add a section to both languages of `DATA-PROTECTION.md`, decide with the teacher how the leavers cleanup and end-of-year routine treat the separate survey Sheet (it holds e-mails and names), let the health check confirm that the survey Sheet can be opened, bump `CODE_VERSION`, update `README.md`.
- Do not change `Vprasalnik.gs` codes. If a question must change, add a new code and keep the old one, so start and end can still be compared.
