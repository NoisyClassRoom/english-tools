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
| `exercises/grammar-<id>.js` | Grammar explanations (written 8 Oct 2026): for every unit one or more short sections (rule, table, examples with Slovenian translation, a Slovenian hint) and a quick check of 5 multiple-choice questions. The content follows what each unit's Unit test practises. The unit menu shows a **Grammar** tile for each unit that has an entry; the **Quick check** at the end is saved as the activity "Grammar quick check". Global `GRAMMAR` keyed by the unit id; format explained at the top of `grammar-6b.js` |
| `exercises/sets.js` | Generic "Extra practice" topics shown to every class |
| `exercises/levels-1.js`, `levels-2.js` | Difficulty levels for Extra practice (written 8 Oct 2026): every topic has Easy / Medium / Hard with 15 words each (translations and emoji) and gap sentences. Part 1 adds to the nine topics of `sets.js` (its words are the first Easy words); part 2 has 12 new topics (body, house, transport, sports, town, feelings, calendar, nature, technology, travel, shopping, irregular verbs). Pupils pick a level after the topic; results are saved with the topic name `Topic · Level`. Format is explained at the top of the files |

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
**My progress** (pupil, after signing in): a collapsible box 📈 on the exercise page home screen with the pupil's own numbers of this school year: activities in the last 7 days, days in a row (streak, counted back from today or yesterday), average result, total; "A little more practice would help" (units with at least 2 attempts and an average under 70 %, each with a *Practise* button that opens the unit through `?class=<book>&topic=<title as saved>`), "Your best" (best result 90 % or more) and the last five results. The data comes from the script action `myprogress`, which looks up only the signed-in pupil's own rows (by the e-mail of the sign-in) in the Results tab; nothing new is collected and nobody else's data is returned.
**My mistakes** (pupil, after signing in): a unit menu shows a 🔁 *My mistakes* tile when the pupil has questions in that unit (or Extra practice topic + level) whose latest answer was wrong. The page asks the script (action `mistakes`) for the pupil's own wrong answers (found through the pupil's result ids; nobody else's data is returned), finds each question again in the unit's exercise bank and asks up to 10 of them in their original form (Quiz, Match, Fill the gap, Unit test, Unit test 2, Grammar quick check). The result is saved as the activity "Mistakes practice" with the original question texts, so a question answered correctly drops off the list. Nothing new is collected.
Backups: the Sheet menu has *Set up weekly backup* (a copy of the whole Sheet into the Drive folder "NoisyClassRoom backups" every Sunday night, newest 8 kept, older ones to the Drive bin), *Back up the Sheet to Drive now* and *Backup status* (see `apps-script/SETUP.md`).

### Board pages (teacher only)

`board/index.html` shows the teacher's exercise keys from the seven coursebooks (from her Word files) for projecting on the board. The page contains **no book text**: after the same Google sign-in as the Results page, the text is loaded from the hidden Sheet tab **Board** (Apps Script action `board`, teacher accounts only). The text is never in this public repository.
- Choose a book, find a section or an exercise (e.g. `43/3`), and click a line (or a table cell) to hide or show it. The words that are **bold, underlined or white in Word** (usually the answers) are the “Marked parts”: they are hidden by default and revealed with a button, per exercise or for everything (bold labels such as speaker names, headings and table headers are not marked). In the Sheet text they are written `{{B:..}}`, `{{U:..}}`, `{{BU:..}}` (bold and underlined) and `{{W:..}}` (white).
- **Bookmarks** (bar above the list): **☆ Pin** on an exercise puts it among the ⭐ *Pinned* chips (up to 100); **📍 Stopped here** asks which class stopped at this exercise and keeps one 📍 *Where we stopped* chip per class (with the date). Click a chip to jump to the exercise (the book is switched if needed; the exercise flashes), ✕ removes it. They are stored in the hidden Sheet tab **BoardMarks** (script actions `boardmarks` / `boardmarkset`, teacher account only), so they are the same on every computer. They hold only class names and exercise labels, no pupil data.
- **▶ Board** opens one exercise full screen for the projector: ← → next / previous exercise, W marked parts, H hide all lines, S show all lines, + / - text size, Esc close.
- **✎ Edit text** switches the page to edit mode: click in any line, heading, exercise label or table cell and type. Select words and press **Mark** (Ctrl+M) to make them a hidden answer, **Unmark** to take it away. Enter = new line, Tab / Shift+Tab = indent, Alt+↑↓ = move; the small buttons at the end of a line do the same (up, down, outdent, indent, new line after the item, delete). **Titles:** the small button **H** turns a line into a *title* between two exercises (e.g. "Unit 2 – Animals"; it appears in the left list under its section; **Aa** turns it back into a line). An untitled short line right before a "Book p.x/y" label is shown with that next exercise by default; if it really belongs to the previous one, press **⤒** on it. Titles are stored as lines of type `h`, the ⤒ choice as `keep` (both are accepted by `boardsave`). Per exercise: add a line, add an exercise below, delete the exercise. Numbered lists renumber themselves. **↶ Undo** takes back the last structural changes. Changes are saved automatically, one section at a time (action `boardsave`). The first save makes a hidden backup tab **BoardOriginal**; the Sheet menu *English hub > Restore board text from backup...* puts it back (Sheets' version history also works).
- Sheet tab Board: Book, Order, Part, Level, Heading, Content (JSON blocks). `importBoardBook_(book, sections)` in Code.gs replaces the stored text of one book (the first content was converted once from the Word files); after that the text is maintained with the edit mode, not in Word.

### Today (teacher only)

`today/index.html` is the overview at the top of the Home page (embedded by iframe; Google sign-in like Results, teacher account only, nothing stored in it). It shows: **Homework to watch** (assignments with pupils who have not finished; overdue ones in red), **Last 7 days, by class** (pupils active, activities, the 7 days before, last activity; a class with no activity in the last 7 days is orange), **Today so far** (number of activities and pupils, the latest results) and shortcuts, including **Continue on the Board** (the Board remembers the last section or exercise you opened in this browser, `localStorage` key `board.last`, and understands `board/?book=8b&si=3`). The data comes from the existing teacher actions `stats` and `hwlist`.

### Results page (teacher only)

`results/index.html` is a private page (WordPress page "Results", embedded by iframe; the data is only sent to a signed-in teacher account listed in the script property `TEACHER_EMAILS`). It holds no data itself.
Filters: school year, class, accounts (pupils with a class / no class = teachers and pupils missing from the Roster / everyone), book, level, dates.
Tabs:
- **Overview** – totals, activity per day, difficulty.
- **Class report** – one printable A4 page per class: key numbers, weekly chart, pupils, unit heat-map, weakest units, most-missed questions, and a free comment line (kept in this browser only).
- **Heat-map** – pupils × units. **Weak spots** – weakest units and questions per class. **Questions** – most-missed questions with common wrong answers.
- **Homework** – assign a unit and activities to a class (or to chosen pupils) with a due date, an optional minimum score and a note; see per pupil who has done it (best attempt after the assignment; done / done late / missing), copy the names of those who have not finished, delete an assignment. The tab also analyses the homework of the chosen class(es): totals (done, on time, late, missing), a completion bar per assignment, a table of every pupil across all homework ("often missing" = 2+), and per assignment the average best score per activity and the typical time to finish. The Class report has a Homework column per pupil, a homework table and the list of missing homework. Besides Match, Quiz, Fill the gap and the two unit tests, a unit's **Grammar quick check** can be assigned. Book "Extra practice" is assigned per topic **and level** (Easy / Medium / Hard; only Match, Quiz and Fill the gap exist there); it is stored as Set `topic.level` (e.g. `food.hard`) and Topic `Food and drink · Hard`, which is what the exercise page saves, and the pupil's button opens `?class=extra&set=food&level=hard&mode=quiz`. Assignments live in the hidden Sheet tab "Homework". Pupils see their open homework on the exercise page after signing in, with buttons that open the exercise directly (`?class=<book>&set=<unit id>&mode=<activity>`).
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
