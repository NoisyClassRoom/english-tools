# Razvojna skupina: new section of NoisyClassRoom

Written 6 Nov 2026 for Claude Code. Repo: `noisyclassroom/english-tools`. Read `README.md`, `DATA-PROTECTION.md` and `apps-script/Code.gs` (repo root) first, then all files in `docs/razvojna-skupina/` (this folder), incl. `SELF-REGULATION-PLAN.md`. If `SELF-REGULATION-PLAN.md` also exists in the repo root, the root copy is newer: use it. **Ask before each step**, and ask the open questions at the end before step 1.

## What the teacher wants

Everything the school's development team (razvojna skupina, topic: samouravnavanje učenja) uses as a web page lives in NoisyClassRoom, not in separate tools. The WordPress site (noisy.splet.arnes.si) gets a new menu link **Razvojna skupina**. It opens a new page that collects everything the team needs.

## Files in this folder

| File | What it is | Use |
|---|---|---|
| `strategije-v-razredu.html` | Finished teacher guide "Učne strategije v razredu" (Slovenian), made outside the repo. The PDF version is printed from the same file. | Port as a page: keep the content, adapt the look to the repo's style, keep the print CSS (A4). |
| `OBSERVATION-PLAN.md` | Plan for the strategy observation sheets and their analysis, linked to the questionnaire. | Build as sub-pages of this section. |
| `ANALIZA-PRIMER.md` | Exact specification of the sample results dashboard the team liked. | Build `team/rezultati/` from it. |
| `SURVEY-IMPORT-PLAN.md` | Plan for reading the questionnaire results. **Its code list is out of date**: the `Sifrant` tab of the survey Sheet is authoritative (see the note at the end of `OBSERVATION-PLAN.md`). | Basis for the results pages. |
| (not here) `Vprasalnik.gs` | The questionnaire's Apps Script stays in its own project in the teacher's school account. | Data format: tabs `Vprasalnik` (long format, see `SURVEY-IMPORT-PLAN.md`), `Sifrant` (codebook per school year and round), `Zgodovina` (question changes), `Podvojene` (several submissions: the last counts), `Obrazci` (form links). Read the Sheet; never change the script from here. |

## Structure

New folder `team/` on GitHub Pages, embedded in the WordPress page `/razvojna-skupina/` the same way the other pages are embedded (iframe).

| Page | Content | Who sees it |
|---|---|---|
| `team/index.html` (Razvojna skupina) | Home of the section: short description of the project, tiles to the pages below, key dates (questionnaire 11–21 Nov 2026, spring round), links to the team's materials (the three Google Forms, the printable questionnaire for grades 1–2, the Drive folder with the Kazalo). The links go in a small config file, not hard-coded across pages. | all teachers |
| `team/strategije/` | The guide (port of `strategije-v-razredu.html`). | all teachers |
| `team/izbira/` | **Strategy picker and lesson plan** (section below): the teacher chooses class, subject, type of content and topic; the page suggests 1–3 strategies and prints a one-page lesson plan. | all teachers |
| `team/opazovanje/` | Observation sheet + My observations (`OBSERVATION-PLAN.md`). | observers |
| `team/rezultati/` | Questionnaire results (`SURVEY-IMPORT-PLAN.md`; views as in the sample dashboard below), with the role views below. | by role |
| `team/analiza/` | Observations × questionnaire analysis (`OBSERVATION-PLAN.md`, "Link with the questionnaire"). | team |
| `team/zbor/` | **Only after 21 Nov 2026**: a presentation of the starting-point results for the teachers' assembly, in the same style as the results pages, aggregated numbers only. Do not start before the data exists. | team, later all teachers |

## Views the team liked (sample dashboard, 6 Nov 2026)

The team saw a sample dashboard with invented data (not in the repo). **Every part of it is specified exactly in `ANALIZA-PRIMER.md`** (layout, formulas, thresholds, labels, roles); build the results pages from that file. In short:

- indicators by area: N planning, D consistency, M monitoring, R reflection, S strategies (share of the top two answers, per VIO, because the scales differ);
- every statement as a stacked bar of answers, by class;
- strategies: know / know but don't use / use (grid `S5`), and "helps most" (`S2`, `S6`);
- classes side by side; start vs end when both rounds exist;
- one pupil (team and class teacher only): their answers next to their grades by subject group;
- grades × habits: average grade by subject group for pupils with high vs low planning, consistency etc.

## Strategy picker and lesson plan (teacher request, 6 Nov 2026)

A page where a teacher gets 1–3 suitable strategies for a concrete lesson and a printable plan for it. **Rule-based, no AI**: the free-text topic is only printed, never interpreted.

**Inputs**

- VIO **or** class (from the class list; the class gives the triad).
- Subject (list per subject group; the subject gives the sklop: JEZ, MAT, NAR, DRU, TEH, UMS).
- **Type of content**, one of:
  - pojmi in izrazi (concepts and terms),
  - postopek in računanje (procedure, calculation),
  - razumevanje besedila (understanding a text),
  - proces ali zaporedje (process, sequence),
  - veščina ali gibanje (skill, movement),
  - ponavljanje pred preverjanjem (revision before a test).

  This list is approved by the teacher for now; keep it in the strategy data so the team can change it.
- Topic: free text, max 100 characters, printed only.
- Step of introduction 1–4. If the teacher signed in and the observation data shows the strategy was never introduced in that class, suggest step 1.

**Data**

Extend the strategy data from the guide (the `S` array in `strategije-v-razredu.html`) into one shared file, e.g. `team/strategies.js`, used by both the guide and this page. For every strategy add:

- suitable types of content;
- suitable sklopi (take them from the guide's "Po predmetnih sklopih" table);
- triads (already there);
- one sentence for thinking aloud;
- one reflection question.

Keep the evidence level and the source line (`v`) as they are. The team reviews the new fields before the page goes live.

**Choosing the strategies**

- Filter: the triad must match.
- Score:
  - +2 if the type of content matches;
  - +1 if the sklop matches;
  - +1 for strong evidence, +0.5 for moderate.
- Show the top 3, with at most one "weak" strategy, and only as a first step paired with a self-testing strategy.
- Show **why** each one was chosen (e.g. "pojmi in izrazi · NAR · močno podprta").

**Result per strategy**

The three steps, the sentence for thinking aloud, the reflection question, the evidence label and its source. These are taken from the guide's cards, not rewritten.

**Lesson plan, printable A4, one page**

- **Header:** class, subject, topic, date, strategy (code and name), step 1–4.
- **Timeline in minutes**, with times the teacher can edit:
  - uvod (introduction),
  - prikaz / glasno razmišljanje (demonstration, thinking aloud),
  - vodena vaja (guided practice),
  - samostojno delo (independent work),
  - refleksija (reflection).
- **Support card for pupils:** the steps in large print. It can be printed separately for the board.
- **Exit ticket:** the reflection question, with space to write.
- **After the lesson:** an empty box headed "Kako je šlo" (how it went).
- Use the print CSS from the guide. Nothing is stored except the last choices in localStorage (in try/catch).

**Link to the observation sheet**

A button "Vpiši opazovanje" opens `team/opazovanje/` with date, class, subject, strategy, step and topic pre-filled, so the teacher only adds effectiveness, participation and reaction. Build this when the observation sheet exists.

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
2. Guide page, then the strategy picker and lesson plan (shared strategy data first).
3. Roles and sign-in for the section.
4. Results pages (team view first); after 21 Nov with real data.
5. Observation sheet, then the analysis.
6. Assembly presentation (after 21 Nov).

## Open questions (ask the teacher first)

1. Should the menu link **Razvojna skupina** be visible to everybody (students too), or only when signed in? Other teachers do not have WordPress accounts, so a WordPress-private page would hide it from them. Suggestion: a visible link, a public home page and guide, and everything with data behind the app's sign-in.
2. The list of team e-mails, observers and class teachers.
3. Is the section's language Slovenian only? Suggestion: yes, as the team works in Slovenian.
