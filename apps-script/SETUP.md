# Progress tracking - setup (teacher only, about 20 minutes)

No student data goes into this repo. The Sheet is private; this repo only holds the public client ID and the web app address.

## 0. Before you start
Ask the school's data-protection person (and the Google admin if the school has one) whether saving
e-mail + score in a private Sheet is OK. Two things you need from the admin:
- permission to create an OAuth client in Google Cloud (a normal school account often can),
- the school's Workspace domain (for `ALLOWED_DOMAIN`, e.g. `os-verzej.si`).

## 1. The private Sheet + script
1. Create a new Google Sheet, e.g. "English results". Keep it private (share with nobody).
2. Extensions > Apps Script. Delete the sample code, paste all of `Code.gs`. Save.
3. Leave `CLIENT_ID` for the moment; set `ALLOWED_DOMAIN` to the school domain.

## 2. OAuth client ID
1. https://console.cloud.google.com > create a project ("english-hub").
2. APIs & Services > OAuth consent screen: User type **Internal** (if offered - it limits sign-in to your school) or External. App name "English Classroom Hub".
3. Credentials > Create credentials > OAuth client ID > **Web application**.
4. Authorised JavaScript origins - add **both**:
   - `https://noisyclassroom.github.io`
   - `https://noisy.splet.arnes.si`
5. Copy the client ID (`....apps.googleusercontent.com`).
6. Paste it into `CLIENT_ID` in the Apps Script (step 1) and into `clientId` in `exercises/tracking.js`.

## 3. Deploy the web app
1. Apps Script > Deploy > New deployment > type **Web app**.
2. Execute as: **Me**. Who has access: **Anyone**. (The script itself rejects anything without a valid school token.)
3. Authorise when asked. Copy the `/exec` URL into `endpoint` in `exercises/tracking.js`.
4. After any later change to `Code.gs`: Deploy > Manage deployments > edit > New version.

## 4. Publish and test
1. Commit `exercises/tracking.js` (with the two values). Wait ~10 minutes for GitHub Pages.
2. Open `.../exercises/?class=6b`, sign in with a school account, finish a quiz.
3. A row appears in the Sheet's "Results" tab. Sign-in with a private @gmail.com account must be refused (if `ALLOWED_DOMAIN` is set).

## 5. Analysis, school years, roster
Menu **English hub** in the Sheet (appears after reloading the Sheet):
- **Set up analysis tabs** - builds the overview tabs from "Results" and the hidden "Archive" tab together: Summary (best result of each pupil in each unit; the column titles contain the coursebook, e.g. "Project 4 · Unit 1 · Past and Present", so units of different books never mix and the columns are grouped by book), Students (attempts, questions answered, average, average difficulty, number of hard tests), Difficulty (how many Easy / Medium / Hard activities each pupil finished, and the average result at each level), By book, Best scores, Topics, By day, and (once) the Roster tab. Each overview tab has selectors for school year, class, book and level. Difficulty levels: 1 Easy = Match and Quiz, 2 Medium = Fill the gap and Unit test, 3 Hard = Unit test 2.
- **Refresh classes from Roster** - run after you edit the Roster; puts the real class on every result row (Results and Archive).
- **Start new school year (copy Roster)** - every September: copies the newest school year of the Roster to the next one, each class one grade up (7.A -> 8.A); 9th graders are not copied. Then add the new 6th graders, fix repeaters, and run "Refresh classes from Roster".
- **Move earlier school years to Archive...** - keeps "Results" short: moves every result that is not from the current school year to the hidden "Archive" tab (right-click the sheet tabs > Show hidden sheets). Nothing is deleted and the overview tabs still count the archive. Run it every September. New results are added at the top of "Results" (newest first).
- **Remove duplicate results (save bug)...** - one-off clean-up for 2 Oct 2026, when the first collector version stored every result up to three times (see the comment in Code.gs). Asks first; the copies are moved to a hidden "Duplicates" tab, not deleted.
- **Delete old results...** - removes results (Results and Archive) older than N years (asks to confirm).
- **Delete results of pupils who left...** - asks for a number of years (empty = 2) and removes the results (Results, Archive, the hidden Duplicates tab and the linked question rows) of every pupil whose last school year in the Roster ended more than that many years ago. It shows the pupils and the number of rows first and deletes only after you confirm. Pupils without a school year in the Roster, and accounts that are not in the Roster at all (teachers, anyone missed), are never deleted. The Roster is not changed, so keep the old Roster rows: they are how the command knows who left.

Every result gets a school year automatically (September-August, e.g. `2026-27`).
The Roster tab (`Email (optional) | School year | Class | Name (as in eAsistent)`, e.g. `2026-27 | 7.A | Surname Firstname`) is private to your Sheet. A pupil is found by e-mail or by name (surname and first name in any order, accents and capitals ignored). Every September add the new rows, then run "Refresh classes from Roster". Never put the Roster into the public repository.

## Notes
- Signing in is optional: without it the exercises work as before, nothing is saved.
- The class list (who is in which class) lives only in your Sheet: add a tab, and use lookups on the e-mail column.
- Sign-in happens inside the WordPress iframe. If a browser blocks the Google popup there, add `allow="identity-credentials-get"` to the iframe, or open the exercise link directly.
