# Razvojna skupina: new section of NoisyClassRoom

Written 6 Nov 2026 for Claude Code. Repo: `noisyclassroom/english-tools`. Read `README.md`, `DATA-PROTECTION.md` and `apps-script/Code.gs` (repo root) first, then all files in `docs/razvojna-skupina/` (this folder), incl. `SELF-REGULATION-PLAN.md`. If `SELF-REGULATION-PLAN.md` also exists in the repo root, the root copy is newer: use it. **Ask before each step**, and ask the open questions at the end before step 1.

## What the teacher wants

Everything the school's development team (razvojna skupina, topic: samouravnavanje učenja) uses as a web page lives in NoisyClassRoom, not in separate tools. The WordPress site (noisy.splet.arnes.si) gets a new menu link **Razvojna skupina**. It opens a new page that collects everything the team needs.

## Files in this folder

| File | What it is | Use |
|---|---|---|
| `strategije-v-razredu.html` | Finished teacher guide "Učne strategije v razredu" (Slovenian), made outside the repo. The PDF version is printed from the same file. | Port as a page: keep the content, adapt the look to the repo's style, keep the print CSS (A4). |
| `OBSERVATION-PLAN.md` | Plan for the strategy observation sheets and their analysis, linked to the questionnaire. | Build as sub-pages of this section. |
| `SURVEY-IMPORT-PLAN.md` | Plan for reading the questionnaire results. **Its code list is out of date**: the `Sifrant` tab of the survey Sheet is authoritative (see the note at the end of `OBSERVATION-PLAN.md`). | Basis for the results pages. |
| (not here) `Vprasalnik.gs` | The questionnaire's Apps Script stays in its own project in the teacher's school account. | Data format: tabs `Vprasalnik` (long format, see `SURVEY-IMPORT-PLAN.md`), `Sifrant` (codebook per school year and round), `Zgodovina` (question changes), `Podvojene` (several submissions: the last counts), `Obrazci` (form links). Read the Sheet; never change the script from here. |

## Structure

New folder `team/` on GitHub Pages, embedded in the WordPress page `/razvojna-skupina/` the same way the other pages are embedded (iframe).

| Page | Content | Who sees it |
|---|---|---|
| `team/index.html` (Razvojna skupina) | Home of the section: short description of the project, tiles to the pages below, key dates (questionnaire 11–21 Nov 2026, spring round), links to the team's materials (the three Google Forms, the printable questionnaire for grades 1–2, the Drive folder with the Kazalo). The links go in a small config file, not hard-coded across pages. | all teachers |
| `team/strategije/` | The guide (port of `strategije-v-razredu.html`). | all teachers |
| `team/opazovanje/` | Observation sheet + My observations (`OBSERVATION-PLAN.md`). | observers |
| `team/rezultati/` | Questionnaire results (`SURVEY-IMPORT-PLAN.md`; views as in the sample dashboard below), with the role views below. | by role |
| `team/analiza/` | Observations × questionnaire analysis (`OBSERVATION-PLAN.md`, "Link with the questionnaire"). | team |
| `team/zbor/` | **Only after 21 Nov 2026**: a presentation of the starting-point results for the teachers' assembly, in the same style as the results pages, aggregated numbers only. Do not start before the data exists. | team, later all teachers |

## Views the team liked (sample dashboard, 6 Nov 2026)

The team saw a sample dashboard with invented data (not in the repo; the teacher can show it). Rebuild these views with real data:

- indicators by area: N planning, D consistency, M monitoring, R reflection, S strategies (share of the top two answers, per VIO, because the scales differ);
- every statement as a stacked bar of answers, by class;
- strategies: know / know but don't use / use (grid `S5`), and "helps most" (`S2`, `S6`);
- classes side by side; start vs end when both rounds exist;
- one pupil (team and class teacher only): their answers next to their grades by subject group;
- grades × habits: average grade by subject group for pupils with high vs low planning, consistency etc.

## Roles (team decision of 6 Nov 2026)

Results are first seen by the team only. Later, class teachers, teachers and the principal each get **their own view**.

| Role | Script property | Sees |
|---|---|---|
| team | `TEAM_EMAILS` | everything, incl. pupil level (named) |
| class teacher | `CLASS_TEACHERS` (e-mail → class, e.g. `ana@…=5.A`) | own class, pupil level |
| teacher | `OBSERVER_EMAILS` | school and triad level, aggregated |
| principal | `PRINCIPAL_EMAIL` | school, triad and class level, aggregated |

- Start with the team role only. Add a switch (script property `RESULTS_OPEN_TO`, e.g. `team` → `team,razredniki` → `all`) so the team can open the views later without new code.
- Pupils share the `@os-verzej.si` domain, so never grant access by domain. Every role is an explicit list.
- Named views: the pupil's answers next to their own grades by subject group (JEZ, MAT, NAR, DRU, TEH, UMS), from eAsistent exports. The grades import is a separate step: ask how the teacher exports from eAsistent before building it.
- Aggregated views: minimum group size 5.

## Rules

- Same ground rules as the other plans: own data only, aggregated numbers on shared pages, test accounts excluded, `DATA-PROTECTION.md` updated in both languages (the questionnaire is approved by the DPO and parents are informed; name-level results and grades are new uses, so describe them precisely), health check, `CODE_VERSION`, `README.md`.
- Pages that show any pupil data load it only after sign-in through the web app, like Results. No data in static files on GitHub Pages: they are public.
- The guide and the section home page have no pupil data, so they can be static.
- Keep it simple. If a step needs much more code than described, stop and ask.

## Order of work

1. Section home + WordPress page and menu link (instructions for the WordPress part, which the teacher does by hand).
2. Guide page.
3. Roles and sign-in for the section.
4. Results pages (team view first); after 21 Nov with real data.
5. Observation sheet, then the analysis.
6. Assembly presentation (after 21 Nov).

## Open questions (ask the teacher first)

1. Should the menu link **Razvojna skupina** be visible to everybody (students too), or only when signed in? Other teachers do not have WordPress accounts, so a WordPress-private page would hide it from them. Suggestion: a visible link, a public home page and guide, and everything with data behind the app's sign-in.
2. The list of team e-mails, observers and class teachers.
3. Is the section's language Slovenian only? Suggestion: yes, as the team works in Slovenian.
