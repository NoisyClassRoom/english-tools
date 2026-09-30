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
- Teacher pages (in the menu): Home, Classroom Tools (/tools/), Teacher Links (/links/).
- Student pages are NOT linked anywhere; each class gets its own link:
  /6-project-1/, /7-dream-team-starter/, /7-project-2/, /8-dream-team-1/, /8-project-3/, /9-dream-team-2/, /9-project-4/
  and /students/ (extra practice for everyone). They use the bare template "page-students" (no menu, no footer).
- Adding a link for yourself: log in, open Teacher Links, press "Uredi" under the table.

## Planned next: student progress tracking

Decisions so far:
- Students have Google school accounts, so they identify themselves with "Sign in with Google" (no personal codes).
- Results (email, unit, activity, score, date) go to a private Google Sheet through a Google Apps Script web app that verifies the Google ID token.
- The class list (names / emails per school year) stays only in that private sheet, never in this public repo.
- Needs: an OAuth client ID in Google Cloud (may need the school's Google admin) and a check with the school's data-protection person.
- Only the teacher can do the Google authorisation / deploy steps.

## Practical notes

- GitHub Pages caches files for about 10 minutes; after a change, reload a couple of times or add `&v=2` to the address.
- This repo is public: never put student names, emails or credentials in it.
