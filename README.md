# English Classroom Hub

Teaching tools and student exercises for English lessons (grades 6-9, OŠ Veržej).
This repo is served by GitHub Pages and embedded in a WordPress site on Arnes Splet.

- Site: https://noisy.splet.arnes.si (WordPress multisite on Arnes, no FTP / no custom PHP)
- Tools (teacher): https://noisyclassroom.github.io/english-tools/
- Exercises (students): https://noisyclassroom.github.io/english-tools/exercises/?class=<id>

## What is where

| File | Purpose |
|---|---|
| `index.html` | Classroom tools: timer, random pupil, groups, noise meter |
| `exercises/index.html` | The exercise app (flashcards, match, quiz, fill the gap, unit test) |
| `exercises/classes.js` | List of classes: grade + coursebook, `ready: true` when the file exists |
| `exercises/class-<id>.js` | One file per coursebook: units with 24 words, 8 gap sentences, 10 test questions |
| `exercises/hard-<id>.js` | The harder test ("Unit test 2") of each unit: 10 questions |
| `exercises/more-<id>.js` | Extra questions that make each unit's exercise bank bigger than one session (8 gap sentences, 10 easy and 10 hard test questions per unit). The page shows questions a pupil has not seen yet first, so a repeat attempt brings new ones |
| `exercises/more2-<id>.js` | A second set of the same kind (10 gap sentences, 10 easy and 10 hard questions per unit), written on 7 Oct 2026 from the teacher's own exercise notes for each coursebook (original sentences, not copied from the books). Global `MORE2_SETS`; merged into the unit banks by `exercises/index.html` exactly like `more-<id>.js` |
| `exercises/sets.js` | Generic "Extra practice" topics shown to every class |

Class ids (internal only): 6b = Project 1, 7a = Dream Team Starter, 7bc = Project 2,
8a = Dream Team 1, 8b = Project 3, 9a = Dream Team 2, 9b = Project 4.

To add words or units, edit the matching `class-<id>.js` (formats are explained in comments at the top of the files).
Slovenian translations and word lists were written from the year plans' topics and should be reviewed against the books.

## WordPress side (noisy.splet.arnes.si)

- Plugins switched on: TablePress (teacher links table), H5P (not used), iframe (embeds).
- Public: the front page is **Students** (class buttons + extra practice) and the seven class pages
  /6-project-1/, /7-dream-team-starter/, /7-project-2/, /8-dream-team-1/, /8-project-3/, /9-dream-team-2/, /9-project-4/
  (template "page-students"). Each class page has a "← All classes" link.
- Private (visible only when logged in as the teacher): Home (/home/), Classroom Tools (/tools/), Teacher Links (/links/).
  Bookmark: https://noisy.splet.arnes.si/wp-login.php?redirect_to=https%3A%2F%2Fnoisy.splet.arnes.si%2Fhome%2F
- Header menu: only Students for visitors. Home / Classroom Tools / Teacher Links are plain custom links with the CSS class
  `teacher-only`, hidden by Additional CSS unless the visitor is logged in (private pages are hidden from block menus otherwise).
- Adding a link for yourself: log in, open Teacher Links, press "Uredi" under the table.

## Student progress tracking (live)

Setup steps: `apps-script/SETUP.md`. Code: `exercises/tracking.js` (browser) and `apps-script/Code.gs` (server).
Each finished activity saves e-mail, first/last name (from the Google account), class, topic, activity and score to a private Sheet.
The Sheet's menu "English hub" builds overview tabs (Summary, Students, Difficulty, By book, Best scores, Topics, By day) and manages the Roster and school years.
A description for the school's data-protection officer is in `DATA-PROTECTION.md`.

### Board pages (teacher only)

`board/index.html` shows the teacher's exercise keys from the seven coursebooks (from her Word files) for projecting on the board. The page contains **no book text**: after the same Google sign-in as the Results page, the text is loaded from the hidden Sheet tab **Board** (Apps Script action `board`, teacher accounts only). The text is never in this public repository.
- Choose a book, find a section or an exercise (e.g. `43/3`), and click a line (or a table cell) to hide or show it. Words that were **white in Word** are hidden by default (“White parts”) and revealed with a button, per exercise or for everything.
- **▶ Board** opens one exercise full screen for the projector: ← → next / previous exercise, W white parts, H hide all lines, S show all lines, + / - text size, Esc close.
- Sheet tab Board: Book, Order, Part, Level, Heading, Content (JSON blocks). `importBoardBook_(book, sections)` in Code.gs replaces the stored text of one book (the content was converted from the Word files once; to refresh a book, convert it again and import it).

### Results page (teacher only)

`results/index.html` is a private page (WordPress page "Results", embedded by iframe; the data is only sent to a signed-in teacher account listed in the script property `TEACHER_EMAILS`). It holds no data itself.
Filters: school year, class, accounts (pupils with a class / no class = teachers and pupils missing from the Roster / everyone), book, level, dates.
Tabs:
- **Overview** – totals, activity per day, difficulty.
- **Class report** – one printable A4 page per class: key numbers, weekly chart, pupils, unit heat-map, weakest units, most-missed questions, and a free comment line (kept in this browser only).
- **Heat-map** – pupils × units. **Weak spots** – weakest units and questions per class. **Questions** – most-missed questions with common wrong answers.
- **Homework** – assign a unit and activities to a class (or to chosen pupils) with a due date, an optional minimum score and a note; see per pupil who has done it (best attempt after the assignment; done / done late / missing), copy the names of those who have not finished, delete an assignment. The tab also analyses the homework of the chosen class(es): totals (done, on time, late, missing), a completion bar per assignment, a table of every pupil across all homework ("often missing" = 2+), and per assignment the average best score per activity and the typical time to finish. The Class report has a Homework column per pupil, a homework table and the list of missing homework. Assignments live in the hidden Sheet tab "Homework". Pupils see their open homework on the exercise page after signing in, with buttons that open the exercise directly (`?class=<book>&set=<unit id>&mode=<activity>`).
- **Progress** – results per week for the whole selection or one pupil. **Compare classes** – all classes side by side (average result or activities per pupil, per week).
- **Pupils**, **Units**, **Not practising** – tables; "Download table" / "Download all filtered results" export CSV, "Print" prints the current tab.

Decisions:
- Students have Google school accounts, so they identify themselves with "Sign in with Google" (no personal codes).
- Results (email, unit, activity, score, date) go to a private Google Sheet through a Google Apps Script web app that verifies the Google ID token.
- The class list (names / emails per school year) stays only in that private sheet, never in this public repo.
- Needs: an OAuth client ID in Google Cloud (may need the school's Google admin) and a check with the school's data-protection person.
- Only the teacher can do the Google authorisation / deploy steps.

## Practical notes

- GitHub Pages caches files for about 10 minutes; after a change, reload a couple of times or add `&v=2` to the address.
- This repo is public: never put student names, emails or credentials in it.
