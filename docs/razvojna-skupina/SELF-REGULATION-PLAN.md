# Self-regulated learning: implementation plan for NoisyClassRoom

Written 19 Oct 2026 for Claude Code. Repo: `noisyclassroom/english-tools`. Read `README.md` and `DATA-PROTECTION.md` first; this plan builds on what is already there and must follow the same conventions.

## Why

OŠ Veržej's school development team and self-evaluation team (first meeting 21 Oct 2026) chose **self-regulated learning** (samouravnavanje učenja) as the school's development topic. The teams need:

1. common self-regulation skills for each stage of schooling (1st–3rd VIO),
2. criteria of progress,
3. everyday tools to follow that progress, and data for the yearly self-evaluation report.

The app already covers much of this: pupils choose unit, activity and level; they get instant feedback, hints and mistake explanations; **My progress** compares them only with their own past; **My mistakes** lets them redo what they got wrong. What is missing is the pupil **setting a goal**, **predicting** how well they will do, **reflecting** afterwards, and a **teacher view that turns all of this into anonymous indicators** for the teams.

### The model the app should follow

Zimmerman's three phases, which the school uses:

| Phase | What the pupil does | Already in the app | To add |
|---|---|---|---|
| Forethought | sets a goal, chooses a strategy | choice of unit / activity / level, homework | **My goal** (1), **How sure are you?** (2) |
| Performance / monitoring | checks understanding while working | instant feedback, hints, explanations | nothing new |
| Self-reflection | compares result with goal, decides what next | My progress, My mistakes | **reflection after a test** (3), **I can** self-assessment (4) |

The school's common scale of progress has three steps. Use the same words in the app wherever a pupil rates themselves:

| School term | Pupil-facing EN | Pupil-facing SL |
|---|---|---|
| z vodenjem | Not yet | Še ne |
| s podporo | With help | S pomočjo |
| samostojno | On my own | Sam/a |

## Ground rules (apply to every feature)

- **No free text from pupils.** Every new input is a choice from a fixed list. This keeps `DATA-PROTECTION.md` simple: nothing personal is typed.
- **Optional and never in the way.** Each prompt has a visible *Skip*. Practising without signing in works exactly as now; new prompts appear only for signed-in pupils.
- **Own data only.** A pupil sees only their own goals and reflections; compare only with their own past, never with other pupils (same rule as My progress).
- **Separate hidden tabs**, like `Puzzles`: new data goes into new hidden Sheet tabs, so averages, heat-map, reports and homework checks stay unchanged.
- **Link by result id**, not by name, wherever a row belongs to a result (same as the question rows).
- **One request on load.** Add whatever the home screen needs to the existing `pupilhome` action, not a new round trip.
- **Teacher pages show the teams anonymous numbers only.** Names stay on the existing pupil-level pages.
- For every feature: update `README.md` (what is where, decisions), both language sections of `DATA-PROTECTION.md` (what is stored, since when), the leavers cleanup and end-of-year routine (new tabs hold pupil e-mails), the health check (new tabs, new files), and bump `CODE_VERSION`.
- Keep it simple. If a feature needs much more code than described here, stop and ask.

## Features, in order

### 1. My goal (weekly goal)

**Pupil:** a small card at the top of the My progress box, "🎯 My goal this week". If there is no goal for the current week, the pupil picks one of these:

- *Get 80 % or more in* [unit picker: units of their book, Extra practice topic + level]
- *Do* [3 / 5 / 10] *activities this week*
- *Clear My mistakes in* [unit picker, only units that have open mistakes]
- *Finish all activities of* [unit picker]

The week runs Monday to Sunday. The card shows progress toward the goal ("2 of 5", "best so far 72 %") and a button that opens the unit (reuse `?class=&set=&mode=` links). When the goal is reached: a short ✓ message and a badge count ("Goals reached: 4").

On the first visit of a new week, if last week had a goal, show it once: "Last week: *Get 80 % in Unit 3*: reached ✓ / not reached". Then ask "Next week I will…" with the same choices.

**Storage:** hidden tab `Goals`: timestamp, school year, e-mail, class, week start (date), goal type, book, unit / topic, target number. Whether it was reached is **computed** from Results / Puzzles when needed; it is not stored. One goal per pupil per week; picking again replaces it (keep it simple: overwrite the row).

**Script:** `goalset` (pupil, own row only); the current and last week's goal plus progress returned inside `pupilhome`.

### 2. How sure are you? (prediction before a test)

**Where:** before **Unit test**, **Unit test 2** and **Grammar quick check** only.

**Pupil:** one screen before the first question: "How sure are you that you will get 80 % or more?" with four buttons: 😟 Not sure · 🙂 A bit · 😀 Quite sure · 🤩 Very sure (SL: Nisem prepričan/a · Malo · Kar precej · Zelo). *Skip* starts the test straight away.

**After the test** (on the result screen, one line): "You said *Quite sure*: you got 65 %." plus a short neutral hint by case:

- sure but below 80 %: "Next time check with My mistakes or Grammar before the test."
- not sure but 80 %+: "You know more than you think!"
- matching: "Good guess, you know where you stand."

**Storage:** hidden tab `Reflections`, one row per finished test that had a prediction: timestamp, school year, result id, kind = `confidence`, value 1–4. No name or e-mail in the row (linked by result id like the question rows), so it needs no extra cleanup beyond following its result. If the result row's id is not available at the moment of saving, send the value with the result in `Track.save` and let `doPost` write the extra row.

### 3. Reflection after a test

**Where:** the result screen of the same three activities, after the prediction line.

**Pupil:** "Next I will…" with buttons, one tap, then the screen continues as now:

- 🔁 practise my mistakes (opens My mistakes for this unit)
- 📖 read the Grammar (opens the unit's Grammar, if it has one)
- 🃏 repeat the words (opens Flashcards / Match)
- ⬆️ try a harder level / Unit test 2
- ✅ I'm happy with this result

The chosen button also **does** the thing it names (it is a shortcut as well as a reflection). *Skip* = just close.

**Storage:** same `Reflections` tab, kind = `next`, value = the choice id.

### 4. I can (self-assessment per unit)

**Where:** a new tile ✋ **I can** in each unit menu of the coursebooks (not Extra practice).

**Pupil:** 3–4 can-do statements for the unit, each rated **Not yet / With help / On my own** (the school's scale). The pupil can rate at any time; the tile shows the last rating date. When a unit has two ratings, show the change ("2 statements moved up").

**Content:** new files `exercises/cando-<id>.js`, global `CANDO` keyed by unit id: `[[English statement, Slovenian statement], …]`. Write them from each unit's word list, gap sentences and Grammar (e.g. "I can talk about my daily routine using the present simple."). Explain the format at the top of the first file like the other content files. Load them in `exercises/index.html` and `results/index.html` and add them to the health check.

**Storage:** hidden tab `CanDo`: timestamp, school year, e-mail, class, book, unit, statement index, rating 1–3. This tab holds e-mails, so add it to the leavers cleanup.

**Teacher (Results > Pupils detail):** a small table per unit: statements × first / latest rating.

### 5. Teacher view: Self-regulation tab and team report

**Results > new tab "Self-regulation"** (filters apply: school year, class, dates). Weekly values, one row per class:

| Indicator | Definition |
|---|---|
| Self-started practice | share of activities that were **not** part of an open homework for that pupil at that time |
| Pupils practising on their own | pupils with at least one self-started activity in the period / pupils in class |
| Goals set / reached | pupils who set a weekly goal; share of those goals reached |
| Mistakes practice use | pupils who did at least one "Mistakes practice" |
| Harder choices | share of Medium + Hard activities (levels as in the Sheet's Difficulty tab), trend by week |
| Prediction accuracy | share of tests where the prediction matched the result (sure ↔ 80 %+), trend by week |
| Next steps chosen | distribution of the reflection choices |
| I can | share of ratings "On my own", first vs latest |

Show the trend of each over the last 8 weeks as a small line or bars, like My progress.

**"Team report" button:** one printable A4 page for the school teams, **no pupil names, only class-level numbers**, school year and date range in the header, a free comment line (kept in this browser only, as in the class report). This is what the teacher takes to the self-evaluation team.

**Script:** one teacher-only action `srlstats` that computes all of the above server-side from Results, Puzzles, Homework, Goals, Reflections and CanDo.

### 6. Noise meter with a class goal (Classroom tools)

Check the current noise meter in `index.html` first. Add, only if it is small:

- before an activity: pick the target zone (Silent work / Pair work / Group work) which sets the limit;
- while running: share of time inside the zone shown live;
- at the end: "We were in the zone 78 % of the time" and the class's last five results, kept in this browser only (`localStorage`, wrapped in try/catch). No pupil data, nothing sent to the script.

This supports self-regulation of behaviour in class (the class sets the goal, watches itself, reflects).

## Out of scope

- Free-text journals or comments by pupils.
- Comparing pupils with each other, rankings, leaderboards.
- Time-on-task tracking.
- Anything for other subjects. The school can reuse the *model*, not this app.

## Acceptance checks for each feature

- Works for a signed-in pupil; a pupil who is not signed in sees no change.
- *Skip* always works and saves nothing.
- Existing averages, heat-map, class / pupil reports and homework checks give the same numbers as before.
- A pupil's request returns only that pupil's rows.
- The health check passes; `CODE_VERSION` bumped; README and DATA-PROTECTION (EN + SL) updated; leavers cleanup covers any new tab with e-mails.
- Tested in the WordPress iframe and on a phone-width screen.

## Open questions for the teacher (ask before building)

1. Is 80 % the right threshold for "sure" and for the goal presets, or should it follow the grade table (e.g. 65 % = grade 3)?
2. Should the weekly goal be offered to all classes from the start, or piloted in one class first?
3. Feature 4 needs new can-do statements: write them for all seven books at once, or one book first for review?
4. Does the school's data-protection officer need to see the updated `DATA-PROTECTION.md` before features 1–4 go live?
