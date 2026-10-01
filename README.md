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
The Sheet's menu "English hub" builds overview tabs (Summary, Students, Best scores, Topics, By day) and manages the Roster and school years.
A description for the school's data-protection officer is in `DATA-PROTECTION.md`.

Decisions:
- Students have Google school accounts, so they identify themselves with "Sign in with Google" (no personal codes).
- Results (email, unit, activity, score, date) go to a private Google Sheet through a Google Apps Script web app that verifies the Google ID token.
- The class list (names / emails per school year) stays only in that private sheet, never in this public repo.
- Needs: an OAuth client ID in Google Cloud (may need the school's Google admin) and a check with the school's data-protection person.
- Only the teacher can do the Google authorisation / deploy steps.

## Practical notes

- GitHub Pages caches files for about 10 minutes; after a change, reload a couple of times or add `&v=2` to the address.
- This repo is public: never put student names, emails or credentials in it.
