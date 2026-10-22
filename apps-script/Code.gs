/**
 * English Classroom Hub - results collector + analysis tabs.
 * Paste into the Apps Script project attached to the PRIVATE Google Sheet
 * (Extensions > Apps Script). Full steps: SETUP.md.
 *
 * doPost:  receives {token, cls, unit, topic, activity, score, total}, checks the Google ID token
 *          and adds one row at the TOP of "Results" (newest first). E-mail and name come from the
 *          verified token, never from what the browser claims. School year, the pupil's real class
 *          (from the "Roster" tab), the book, the unit title and the difficulty level are added on the server.
 * Archive: previous school years can be moved to the hidden "Archive" tab (menu), so "Results" stays short.
 *          The analysis tabs always read Results + Archive together.
 * Menu:    "English hub" > set up analysis tabs / refresh classes / new school year / archive / delete.
 */

var CLIENT_ID = '723989491910-q0hi1qdpm23kag6fs11rir3o8gqkb0q5.apps.googleusercontent.com';
var ALLOWED_DOMAIN = 'os-verzej.si';   // only this Google Workspace domain may save; '' = anyone
var TZ = 'Europe/Ljubljana';

var SHEET = 'Results';
var ROSTER = 'Roster';
var ARCHIVE = 'Archive';
var HEADER = ['Time', 'Email', 'First name', 'Last name', 'Class', 'Topic', 'Activity', 'Score', 'Total', 'Percent',
              'School year', 'Class (roster)', 'Book', 'Unit', 'Level', 'Unit title', 'Level name', 'Hard', 'Result id'];
//             A       B        C            D            E        F        G           H        I        J
//             K              L                M       N       O        P            Q            R     S
// "Class" (E) is the coursebook id of the exercise link (6b, 7a...), "Class (roster)" (L) the pupil's real class.
// M-R are worked out on the server: book name, unit, difficulty (1 easy, 2 medium, 3 hard), "Book · Unit · Topic",
// the level as text, and 1 for a hard test. S is a random id sent by the pupil's page: if the same result arrives
// twice (a retry after a lost answer) it is saved only once. O-S are hidden helper columns.
var BASE_COLS = 10;
var NCOLS = HEADER.length;
var BOOK_IDS = ['All', '6b', '7a', '7bc', '8a', '8b', '9a', '9b', 'extra'];
var BOOKS = { '6b': 'Project 1', '7a': 'Dream Team Starter', '7bc': 'Project 2', '8a': 'Dream Team 1',
              '8b': 'Project 3', '9a': 'Dream Team 2', '9b': 'Project 4', 'extra': 'Extra practice' };
var LEVELS = { 1: '1 Easy', 2: '2 Medium', 3: '3 Hard' };
var LEVEL_LIST = ['All', '1 Easy', '2 Medium', '3 Hard'];
// Unit of each exercise topic (book id | topic title), so results saved without a unit still get one.
var UNITS = {
  "6b|Introduction": "Unit 1",
  "6b|Friends and Family": "Unit 2",
  "6b|My world": "Unit 3",
  "6b|Time": "Unit 4",
  "6b|Places": "Unit 5",
  "6b|People": "Unit 6",
  "7a|New start!": "Starter",
  "7a|You are a good player!": "Unit 1",
  "7a|Who's this?": "Unit 2",
  "7a|This is a great place!": "Unit 3",
  "7a|Charlie doesn't like shopping": "Unit 4",
  "7a|Give the ball to me!": "Unit 5",
  "7a|Let's have a party!": "Unit 6",
  "7bc|My life": "Unit 1",
  "7bc|Animals": "Unit 2",
  "7bc|Holidays": "Unit 3",
  "7bc|Food": "Unit 4",
  "7bc|The world": "Unit 5",
  "7bc|Entertainment": "Unit 6",
  "8a|Let's remember": "Revision",
  "8a|He's playing his guitar": "Unit 1",
  "8a|Is Paul buying the tickets?": "Unit 2",
  "8a|I'm having a party tomorrow!": "Unit 3",
  "8a|I'm going to be a millionaire": "Unit 4",
  "8a|I was terrible!": "Unit 5",
  "8a|Did you really love me?": "Unit 6",
  "8b|My life": "Unit 1",
  "8b|The future": "Unit 2",
  "8b|Times and places": "Unit 3",
  "8b|London": "Unit 4",
  "8b|Experiences": "Unit 5",
  "8b|Problems": "Unit 6",
  "9a|Let's remember": "Revision",
  "9a|Jeff's a DJ now!": "Unit 1",
  "9a|Ricky's question": "Unit 2",
  "9a|Tina tells Karen the truth": "Unit 3",
  "9a|The worst day of my life": "Unit 4",
  "9a|We'll need a name!": "Unit 5",
  "9a|The London Eye": "Unit 6",
  "9b|Past and Present": "Unit 1",
  "9b|Fame and Fortune": "Unit 2",
  "9b|Health and safety": "Unit 3",
  "9b|Heroes": "Unit 4",
  "9b|Our environment": "Unit 5",
  "9b|Relationships": "Unit 6"
};

// Change this text whenever the code of doPost changes: the health check compares it with what the published web app answers,
// so it can tell you that the saved code has not been deployed as a new version yet.
var CODE_VERSION = '2026-10-22.1';

// ---------------------------------------------------------------- saving results

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.action === 'roster') return rosterReply_(d);       // teacher-only, used by the Classroom Tools page
    if (d.action === 'stats') return statsReply_(d);         // teacher-only, used by the Results page
    if (d.action === 'qstats') return qstatsReply_(d);       // teacher-only: question-level statistics
    if (d.action === 'homework') return homeworkReply_(d);   // a pupil: own open homework
    if (d.action === 'mistakes') return mistakesReply_(d);   // a pupil: own wrong answers in one unit (for "Practise my mistakes")
    if (d.action === 'myprogress') return myProgressReply_(d); // a pupil: own numbers of this school year ("My progress")
    if (d.action === 'hwlist') return hwListReply_(d);       // teacher-only: assignments with every pupil's progress
    if (d.action === 'hwsave') return hwSaveReply_(d);       // teacher-only: new assignment
    if (d.action === 'hwdelete') return hwDeleteReply_(d);   // teacher-only: remove an assignment
    if (d.action === 'board') return boardReply_(d);         // teacher-only: the exercise keys for the board pages
    if (d.action === 'boardsave') return boardSaveReply_(d); // teacher-only: one edited section of the board text
    if (d.action === 'boardmarks') return boardMarksReply_(d);       // teacher-only: pinned exercises and "where the class stopped"
    if (d.action === 'boardmarkset') return boardMarkSetReply_(d);   // teacher-only: pin / unpin an exercise, set / clear a class stop
    if (d.action === 'goalset') return goalSetReply_(d);             // a pupil: sets the weekly goal (only while SRL_ON = 1)
    if (d.action === 'candoget') return canDoGetReply_(d);           // a pupil: own "I can" ratings of one unit (only while SRL_ON = 1)
    if (d.action === 'candoset') return canDoSetReply_(d);           // a pupil: saves the ratings of one unit
    if (d.action === 'candostats') return canDoStatsReply_(d);       // teacher-only: all ratings with names (pupil detail in Results)
    if (d.action === 'srlstats') return srlStatsReply_(d);           // teacher-only: anonymous self-regulation indicators per class and week
    if (d.action === 'reflectset') return reflectSetReply_(d);       // a pupil: the "Next I will..." choice after a test (only while SRL_ON = 1)
    if (d.action === 'goalmistakes') return goalMistakesReply_(d);   // a pupil: the units where they have open mistakes (for the goal picker)
    if (d.action === 'pupilhome') return pupilHomeReply_(d);         // a pupil: homework + "My progress" in ONE request (faster than two)
    if (d.action === 'puzzlestats') return puzzleStatsReply_(d);       // teacher-only: results of the online puzzles (separate tab "Puzzles")
    if (d.action === 'ping') return out_({ ok: true, v: CODE_VERSION });   // no data; used by "Check that everything works" in the Sheet menu
    var who = verify_(d.token);
    if (!who) return out_({ ok: false, error: 'token' });

    var score = Number(d.score), total = Number(d.total);
    if (!isFinite(score) || !isFinite(total) || total <= 0 || total > 100 || score < 0 || score > total) {
      return out_({ ok: false, error: 'data' });
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var isPuzzle = PUZZLE_ACTS.indexOf(text_(d.activity)) >= 0;       // puzzles go to their own tab
      var sh = isPuzzle ? puzzleSheet_() : resultsSheet_();
      var id = text_(d.id);
      if (id && sh.getLastRow() > 1) {                      // the same result sent again (retry): already saved
        var recent = sh.getRange(2, NCOLS, Math.min(80, sh.getLastRow() - 1), 1).getValues();
        for (var i = 0; i < recent.length; i++) if (recent[i][0] === id) return out_({ ok: true });
      }
      var now = new Date(), year = schoolYear_(now);
      var cls = text_(d.cls), topic = text_(d.topic), activity = text_(d.activity);
      var row = [now, who.email, text_(who.first), text_(who.last), cls, topic,
                 activity, score, total, Math.round(100 * score / total) / 100,
                 year, classFor_(rosterRows_(), who.email, who.first, who.last, year)]
                .concat(derived_(cls, text_(d.unit), topic, activity), [id]);
      sh.insertRowAfter(1);                                 // newest result on top
      sh.getRange(2, 1, 1, NCOLS).setFontWeight('normal').setBackground(null).setValues([row]);
      if (id && d.qs instanceof Array) {                    // question details must never stop the result from being saved
        try { saveQuestions_(now, id, cls, row[15], activity, year, row[11], d.qs); } catch (e2) {}
      }
      if (id && d.srl && srlOn_() && !isPuzzle && REFLECT_ACTS.indexOf(activity) >= 0) {      // the pupil's prediction before a test (only while the prompts are on)
        try {
          var conf = Math.round(Number(d.srl.c)), aim = Math.round(Number(d.srl.t));
          if (conf >= 1 && conf <= 4 && [65, 80, 90].indexOf(aim) >= 0) { var rsh = reflectionsSheet_(), rrow = [now, year, id, 'confidence', conf, aim]; rsh.appendRow(rrow); rsh.getRange(rsh.getLastRow(), 1, 1, RHEADER.length).setValues([rrow]); }
        } catch (e4) {}
      }
    } finally { lock.releaseLock(); }
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: 'server' });
  }
}

// Class lists for the Classroom Tools page: names only (never e-mails), newest school year in the Roster,
// and only for the teacher. Teacher e-mails are kept in Project Settings > Script properties (TEACHER_EMAILS),
// so they are not in this public file.
function rosterReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });

  var sh = SpreadsheetApp.getActive().getSheetByName(ROSTER);
  if (!sh || sh.getLastRow() < 2) return out_({ ok: true, year: '', classes: {} });
  var rows = sh.getRange(2, 1, sh.getLastRow() - 1, Math.max(6, Math.min(8, sh.getLastColumn()))).getValues().filter(function (r) { return catOf_(r[7]) !== 'test'; }), year = '';
  rows.forEach(function (r) { var y = String(r[1]).trim(); if (/^\d{4}-\d{2}$/.test(y) && y > year) year = y; });
  var byClass = {};
  rows.forEach(function (r) {
    // column F (optional) = the name as "Firstname Surname", for names that cannot be split automatically
    var y = String(r[1]).trim(), cls = String(r[2]).trim(), name = String(r[3]).trim(), shown = String(r[5]).trim();
    if (y !== year || !cls || !name) return;
    (byClass[cls] = byClass[cls] || []).push([name, shown]);
  });
  var classes = {};
  Object.keys(byClass).sort().forEach(function (c) { classes[c] = byClass[c].sort(function (a, b) { return a[0].localeCompare(b[0], 'sl'); }); });
  return out_({ ok: true, year: year, classes: classes });
}

// ---------------------------------------------------------------- question-level data
// One row per answered question (no names: the Result id links it to the row in Results).
var QSHEET = 'Questions';
var QHEADER = ['Time', 'Result id', 'Book', 'Unit title', 'Activity', 'Question', 'Right answer', 'Chosen / typed', 'Right', 'School year', 'Class (roster)'];

function clip_(v, n) {
  var s = String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, n);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function questionsSheet_() {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(QSHEET);
  if (!sh) {
    sh = ss.insertSheet(QSHEET);
    sh.appendRow(QHEADER); sh.setFrozenRows(1); sh.getRange(1, 1, 1, QHEADER.length).setFontWeight('bold');
    sh.getRange('A:A').setNumberFormat('dd.mm.yyyy hh:mm'); sh.getRange('J:K').setNumberFormat('@');
    if (ss.getActiveSheet().getName() === QSHEET) ss.setActiveSheet(ss.getSheetByName(SHEET));
    sh.hideSheet();
  }
  return sh;
}

// qs = [[question, right answer, chosen, 1/0], ...] (at most 40)
function saveQuestions_(time, id, book, unitTitle, activity, year, rosterClass, qs) {
  var rows = [];
  qs.slice(0, 40).forEach(function (q) {
    if (!(q instanceof Array) || q.length < 4) return;
    var typed = /^(Fill the gap|Match)$/.test(String(activity));          // typed words / pairs: 40 characters, multiple choice: 90
    rows.push([time, id, clip_(book, 20), clip_(unitTitle, 120), clip_(activity, 30), clip_(q[0], 110), clip_(q[1], 90), clip_(q[2], typed ? 40 : 90),
               Number(q[3]) ? 1 : 0, year, rosterClass]);
  });
  if (!rows.length) return;
  var sh = questionsSheet_(), start = sh.getLastRow() + 1, need = start + rows.length - 1;
  if (need > sh.getMaxRows()) sh.insertRowsAfter(sh.getMaxRows(), need - sh.getMaxRows() + 1000);
  sh.getRange(start, 1, rows.length, QHEADER.length).setValues(rows);
}

// Aggregated per school year, class, book, unit, activity and question.
// [year, class, book id, unit title, activity, question, right answer, answers, wrong answers, most common wrong answers]
function questionStats_() {
  var sh = SpreadsheetApp.getActive().getSheetByName(QSHEET);
  if (!sh || sh.getLastRow() < 2) return [];
  var agg = {}, order = [];
  sh.getRange(2, 1, sh.getLastRow() - 1, QHEADER.length).getValues().forEach(function (r) {
    if (!r[1]) return;
    var k = [r[9], r[10], r[2], r[3], r[4], r[5], r[6]].join('\u0001'), o = agg[k];
    if (!o) { o = agg[k] = { a: [r[9], r[10], r[2], r[3], r[4], r[5], r[6]], n: 0, wrong: 0, w: {} }; order.push(k); }
    o.n++;
    if (!Number(r[8])) { o.wrong++; var c = String(r[7]).trim() || '(empty)'; o.w[c] = (o.w[c] || 0) + 1; }
  });
  return order.map(function (k) {
    var o = agg[k], top = Object.keys(o.w).sort(function (x, y) { return o.w[y] - o.w[x]; }).slice(0, 3)
      .map(function (c) { return c + ' (' + o.w[c] + ')'; }).join(' | ');
    return o.a.concat([o.n, o.wrong, top]);
  });
}

function qstatsReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });
  return out_({ ok: true, rows: questionStats_() });
}
function isTeacher_(email) {
  var allowed = String(PropertiesService.getScriptProperties().getProperty('TEACHER_EMAILS') || '')
    .toLowerCase().split(/[\s,;]+/).filter(String);
  return allowed.indexOf(String(email).toLowerCase()) >= 0;
}

// A signed-in pupil asks for THEIR OWN progress in the current school year (found by the e-mail of the Google sign-in; nobody
// else's data is returned). total, avg (0-1), week = activities in the last 7 days, streak = days in a row with an activity
// (counting back from today, or from yesterday if nothing was done yet today), units = [{book, topic, title, n, avg, best, last}],
// recent = [[time, unit title, activity, percent 0-1]] newest first.
function myProgressReply_(d) {
  var who = verify_(d.token);
  if (!who) return out_({ ok: false, error: 'token' });
  var email = String(who.email).toLowerCase(), year = schoolYear_(new Date()), sh = SpreadsheetApp.getActive().getSheetByName(SHEET), mine = [];
  if (sh && sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, NCOLS).getValues().forEach(function (r) {
    if (r[0] instanceof Date && String(r[1]).toLowerCase() === email && String(r[10]) === year && r[8] > 0) mine.push(r);
  });
  // puzzles (own tab, not part of the numbers below): how many this school year, and how many in the last 7 days
  var puzzles = 0, puzzlesWeek = 0, ps = SpreadsheetApp.getActive().getSheetByName(PSHEET);
  if (ps && ps.getLastRow() > 1) ps.getRange(2, 1, ps.getLastRow() - 1, 11).getValues().forEach(function (r) {
    if (r[0] instanceof Date && String(r[1]).toLowerCase() === email && String(r[10]) === year) { puzzles++; if (r[0].getTime() >= Date.now() - 7 * 86400000) puzzlesWeek++; }
  });
  var DAY = 86400000, now = Date.now(), days = {}, sum = 0, week = 0, units = {}, order = [];
  var key = function (t) { return Utilities.formatDate(new Date(t), TZ, 'yyyy-MM-dd'); };
  var prevDay = function (k) { return Utilities.formatDate(new Date(new Date(k + 'T12:00:00Z').getTime() - DAY), 'UTC', 'yyyy-MM-dd'); };
  mine.forEach(function (r) {
    var t = r[0].getTime(), p = r[7] / r[8];
    days[key(t)] = 1; sum += p; if (t >= now - 7 * DAY) week++;
    var k = r[4] + '\u0001' + r[5], o = units[k];
    if (!o) { o = units[k] = { book: String(r[4]), topic: String(r[5]), title: String(r[15] || r[5]), n: 0, sum: 0, best: 0, last: 0 }; order.push(k); }
    o.n++; o.sum += p; if (p > o.best) o.best = p; if (t > o.last) o.last = t;
  });
  var today = key(now), k2 = days[today] ? today : prevDay(today), streak = 0;
  while (days[k2]) { streak++; k2 = prevDay(k2); }
  // extras: questions answered, active days, longest streak, weekly averages of the last 8 weeks (oldest first), last 30 days vs the 30 before
  var qTotal = 0, qRight = 0, perfect = 0, w8 = [], i, s30 = 0, n30 = 0, sP = 0, nP = 0;
  for (i = 0; i < 8; i++) w8.push({ n: 0, sum: 0 });
  mine.forEach(function (r) {
    var t = r[0].getTime(), p = r[7] / r[8], age = now - t;
    qTotal += r[8]; qRight += r[7]; if (p >= 1) perfect++;
    var wi = Math.floor(age / (7 * DAY)); if (wi >= 0 && wi < 8) { w8[7 - wi].n++; w8[7 - wi].sum += p; }
    if (age < 30 * DAY) { s30 += p; n30++; } else if (age < 60 * DAY) { sP += p; nP++; }
  });
  var dayKeys = Object.keys(days).sort(), longest = 0, run = 0, prevK = '';
  dayKeys.forEach(function (k) { run = (prevK && prevDay(k) === prevK) ? run + 1 : 1; prevK = k; if (run > longest) longest = run; });
  mine.sort(function (a, b) { return b[0].getTime() - a[0].getTime(); });
  return out_({ ok: true, year: year, total: mine.length, avg: mine.length ? sum / mine.length : 0, week: week, streak: streak,
    puzzles: puzzles, puzzlesWeek: puzzlesWeek,
    questions: qTotal, right: qRight, perfect: perfect, activeDays: dayKeys.length, longest: longest,
    weeks: w8.map(function (o) { return o.n ? { n: o.n, avg: o.sum / o.n } : { n: 0, avg: 0 }; }),
    last30: n30 ? { n: n30, avg: s30 / n30 } : null, prev30: nP ? { n: nP, avg: sP / nP } : null,
    units: order.slice(0, 80).map(function (k) { var o = units[k]; return { book: o.book, topic: o.topic, title: o.title, n: o.n, avg: o.sum / o.n, best: o.best, last: o.last }; }),
    recent: mine.slice(0, 6).map(function (r) { return [r[0].getTime(), String(r[15] || r[5]), String(r[6]), r[7] / r[8]]; }) });
}

// A signed-in pupil asks for THEIR OWN mistakes in one unit (book = the class id of the exercise link, topic = the unit title
// the page saves, e.g. "Experiences" or "Food and drink · Hard"). The Questions rows hold no names, so the pupil's rows are found
// through their result ids in Results. A question counts as a mistake while its latest answer (in any activity, also in
// "Mistakes practice") was wrong. Returns [{act, q, ans, n}] = original activity, question, right answer, number of wrong
// answers; most wrong first, at most 30. Nobody else's data is returned.
var MISTAKES_ACT = 'Mistakes practice';
function mistakesReply_(d) {
  var who = verify_(d.token);
  if (!who) return out_({ ok: false, error: 'token' });
  var book = clip_(d.book, 20), topic = clip_(d.topic, 120), email = String(who.email).toLowerCase();
  var ss = SpreadsheetApp.getActive(), rs = ss.getSheetByName(SHEET), qs = ss.getSheetByName(QSHEET);
  if (!book || !topic || !rs || !qs || rs.getLastRow() < 2 || qs.getLastRow() < 2) return out_({ ok: true, items: [] });
  var n = rs.getLastRow() - 1, mails = rs.getRange(2, 2, n, 1).getValues(), rids = rs.getRange(2, NCOLS, n, 1).getValues(), ids = {};
  for (var i = 0; i < n; i++) if (rids[i][0] && String(mails[i][0]).toLowerCase() === email) ids[String(rids[i][0])] = 1;
  var agg = {}, order = [], tail = ' · ' + topic;
  qs.getRange(2, 1, qs.getLastRow() - 1, QHEADER.length).getValues().forEach(function (r) {
    if (!ids[String(r[1])] || String(r[2]) !== book) return;
    var ut = String(r[3]);
    if (ut !== topic && ut.slice(-tail.length) !== tail) return;
    var k = r[5] + '\u0001' + r[6], t = r[0] instanceof Date ? r[0].getTime() : 0, o = agg[k];
    if (!o) { o = agg[k] = { act: '', q: String(r[5]), ans: String(r[6]), n: 0, t: 0, ok: 1 }; order.push(k); }
    if (String(r[4]) !== MISTAKES_ACT && !o.act) o.act = String(r[4]);
    if (!Number(r[8])) o.n++;
    if (t >= o.t) { o.t = t; o.ok = Number(r[8]) ? 1 : 0; }
  });
  var items = order.map(function (k) { return agg[k]; }).filter(function (o) { return !o.ok && o.act; })
    .sort(function (a, b) { return (b.n - a.n) || (b.t - a.t); }).slice(0, 30)
    .map(function (o) { return { act: o.act, q: o.q, ans: o.ans, n: o.n }; });
  return out_({ ok: true, items: items });
}

// ---------------------------------------------------------------- homework
// Tab "Homework": one row per assignment. Class = Roster class (teaching group); Pupils blank = the whole class,
// otherwise the chosen Roster names separated by ";". An activity counts as done when the pupil saved a result for
// that book + topic + activity after the assignment was created (best attempt; at least Min % when set).
// Extra practice homework: Book = extra, Set = '<topic id>.<level>' (food.hard), Topic = 'Food and drink · Hard' (= what the page saves).
var HWSHEET = 'Homework';
var HWHEADER = ['Id', 'Created', 'Class', 'Book', 'Set', 'Topic', 'Unit', 'Activities', 'Min %', 'Due', 'Note', 'Pupils', 'School year', 'Deleted'];
var HW_ACTS = { match: 'Match', quiz: 'Quiz', gap: 'Fill the gap', test: 'Unit test', test2: 'Unit test 2', gcheck: 'Grammar quick check',
  wordsearch: 'Word search', hangman: 'Hangman', scramble: 'Word scramble', crossword: 'Crossword', tarsia: 'Tarsia' };   // the last five are puzzles: their results are in the "Puzzles" tab

function hwSheet_() {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(HWSHEET);
  if (!sh) {
    sh = ss.insertSheet(HWSHEET);
    sh.appendRow(HWHEADER); sh.setFrozenRows(1); sh.getRange(1, 1, 1, HWHEADER.length).setFontWeight('bold');
    sh.getRange('B:B').setNumberFormat('dd.mm.yyyy hh:mm');
    sh.getRange('A:A').setNumberFormat('@'); sh.getRange('C:G').setNumberFormat('@'); sh.getRange('H:H').setNumberFormat('@');
    sh.getRange('J:M').setNumberFormat('@');
    var first = ss.getSheets().filter(function (s) { return s.getName() !== HWSHEET; })[0];
    if (first) ss.setActiveSheet(first);
    sh.hideSheet();
  }
  return sh;
}

function hwDay_(v) { return v instanceof Date ? Utilities.formatDate(v, TZ, 'yyyy-MM-dd') : String(v || '').trim(); }

// all assignments that are not deleted: created = ms, due = 'yyyy-MM-dd', dueEnd = ms (end of that day)
function hwAll_() {
  var sh = hwSheet_();
  if (sh.getLastRow() < 2) return [];
  var out = [];
  sh.getRange(2, 1, sh.getLastRow() - 1, HWHEADER.length).getValues().forEach(function (r) {
    if (!r[0] || Number(r[13]) === 1 || !(r[1] instanceof Date)) return;
    var due = hwDay_(r[9]), acts = String(r[7]).split(',').filter(function (a) { return HW_ACTS[a]; });
    if (!acts.length) return;
    var names = String(r[11]).split(';').map(function (s) { return s.trim(); }).filter(String);
    out.push({ id: String(r[0]), created: r[1].getTime(), cls: String(r[2]), book: String(r[3]), set: String(r[4]), topic: String(r[5]),
      unit: String(r[6]), acts: acts, min: Number(r[8]) || 0, due: due,
      dueEnd: /^\d{4}-\d{2}-\d{2}$/.test(due) ? new Date(due + 'T23:59:59' + Utilities.formatDate(new Date(due + 'T12:00:00Z'), TZ, 'XXX')).getTime() : 0,
      note: String(r[10]), names: names, keys: names.map(nameKey_), year: String(r[12]) });
  });
  return out;
}

// finished results (Results tab only: homework is about the current school year): [time ms, email, first, last, book, topic, activity, score, total]
function hwResults_() {
  var out = [];
  [SHEET, PSHEET].forEach(function (n) {                       // the puzzles are saved in their own tab, but they can be homework too
    var sh = SpreadsheetApp.getActive().getSheetByName(n);
    if (!sh || sh.getLastRow() < 2) return;
    sh.getRange(2, 1, sh.getLastRow() - 1, 9).getValues().forEach(function (r) {
      if (r[0] instanceof Date && r[8] > 0) out.push({ t: r[0].getTime(), email: String(r[1]).toLowerCase(), nk: null, first: r[2], last: r[3],
        book: String(r[4]), topic: String(r[5]), act: String(r[6]), p: r[7] / r[8] });
    });
  });
  return out;
}

// progress of ONE person on one assignment: per activity best percent (null = not tried) and when it was first done properly
function hwProgress_(a, results, email, keys) {
  var names = a.acts.map(function (id) { return HW_ACTS[id]; });
  var per = names.map(function () { return { pct: null, at: null }; });
  email = String(email || '').toLowerCase();
  results.forEach(function (r) {
    if (r.book !== a.book || r.topic !== a.topic || r.t < a.created) return;
    var i = names.indexOf(r.act); if (i < 0) return;
    var mine = email && r.email === email;
    if (!mine) { if (r.nk === null) r.nk = nameKey_(r.first + ' ' + r.last); mine = keys.indexOf(r.nk) >= 0; }
    if (!mine) return;
    var o = per[i];
    if (o.pct === null || r.p > o.pct) o.pct = r.p;
    if (r.p * 100 >= a.min - 1e-9 && (o.at === null || r.t < o.at)) o.at = r.t;
  });
  var done = per.every(function (o) { return o.at !== null; });
  var doneAt = done ? Math.max.apply(null, per.map(function (o) { return o.at; })) : null;
  return { per: per, done: done, doneAt: doneAt, late: done && a.dueEnd > 0 && doneAt > a.dueEnd };
}

// One request for the exercise page: the pupil's homework and "My progress" ({ok, hw: {...homework reply}, prog: {...myprogress reply}}).
function pupilHomeReply_(d) {
  var who = verify_(d.token);
  if (!who) return out_({ ok: false, error: 'token' });
  var hw = null, prog = null;
  try { hw = JSON.parse(homeworkReply_(d).getContent()); } catch (e) { hw = { ok: false }; }
  try { prog = JSON.parse(myProgressReply_(d).getContent()); } catch (e2) { prog = { ok: false }; }
  var srl = { on: false };                                            // self-regulation prompts: only while the teacher has switched them on (srlSwitch)
  try { if (srlOn_()) srl = srlState_(who); } catch (e3) { srl = { on: false }; }
  return out_({ ok: true, hw: hw, prog: prog, srl: srl });
}

// A pupil asks for their own homework (any signed-in school account; returns nothing for accounts without a class).
function homeworkReply_(d) {
  var who = verify_(d.token);
  if (!who) return out_({ ok: false, error: 'token' });
  var year = schoolYear_(new Date()), roster = rosterRows_(), cls = classFor_(roster, who.email, who.first, who.last, year);
  if (!cls) return out_({ ok: true, items: [] });
  var gk = nameKey_(who.first + ' ' + who.last), keys = [gk], email = String(who.email).toLowerCase();
  roster.forEach(function (r) {                       // the Roster name of this pupil (it may differ from the Google name)
    if ((r.year === year || !r.year) && ((r.email && r.email === email) || (r.name && r.name === gk)) && r.name) keys.push(r.name);
  });
  var list = hwAll_().filter(function (a) {
    return a.cls === cls && a.year === year && (!a.keys.length || a.keys.some(function (k) { return keys.indexOf(k) >= 0; }));
  });
  if (!list.length) return out_({ ok: true, items: [] });
  var results = hwResults_(), now = Date.now(), items = [];
  list.forEach(function (a) {
    var p = hwProgress_(a, results, who.email, keys);
    if (p.done && now - p.doneAt > 14 * 86400000) return;            // finished long ago: stop showing it
    items.push({ id: a.id, book: a.book, set: a.set, topic: a.topic, unit: a.unit, due: a.due, min: a.min, note: a.note, created: a.created,
      done: p.done, late: p.late,
      acts: a.acts.map(function (id, i) { return { id: id, name: HW_ACTS[id], pct: p.per[i].pct, ok: p.per[i].at !== null }; }) });
  });
  items.sort(function (x, y) { return (x.done - y.done) || (x.due < y.due ? -1 : x.due > y.due ? 1 : 0); });
  return out_({ ok: true, items: items });
}

// Teacher: every assignment of the school year with all pupils of the class (or the chosen ones).
// assignment: {id, created, cls, book, set, topic, unit, acts:[ids], min, due, note, all: true if the whole class, pupils:[[name, [pct|null ...], doneAt|null, late]]}
function hwListReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });
  var year = schoolYear_(new Date()), rs = SpreadsheetApp.getActive().getSheetByName(ROSTER), people = [];
  if (rs && rs.getLastRow() > 1) {
    rs.getRange(2, 1, rs.getLastRow() - 1, Math.max(4, Math.min(8, rs.getLastColumn()))).getValues().forEach(function (r) {
      var y = String(r[1]).trim(), cls = String(r[2]).trim(), name = String(r[3]).trim(), email = String(r[0]).trim().toLowerCase();
      if (catOf_(r[7]) === 'test') return;
      if ((y === year || !y) && cls && (name || email)) people.push({ cls: cls, name: name || email, email: email, key: nameKey_(name) });
    });
  }
  var results = hwResults_(), items = [];
  hwAll_().filter(function (a) { return a.year === year; }).sort(function (x, y) { return y.created - x.created; }).forEach(function (a) {
    var pupils = people.filter(function (p) { return p.cls === a.cls && (!a.keys.length || a.keys.indexOf(p.key) >= 0); }).map(function (p) {
      var pr = hwProgress_(a, results, p.email, p.key ? [p.key] : []);
      return [p.name, pr.per.map(function (o) { return o.pct; }), pr.doneAt, pr.late ? 1 : 0, pr.per.map(function (o) { return o.at !== null ? 1 : 0; })];
    });
    items.push({ id: a.id, created: a.created, cls: a.cls, book: a.book, set: a.set, topic: a.topic, unit: a.unit, acts: a.acts, min: a.min,
      due: a.due, dueEnd: a.dueEnd, note: a.note, all: !a.keys.length, pupils: pupils });
  });
  return out_({ ok: true, year: year, items: items });
}

function hwSaveReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });
  var a = d.hw || {};
  var acts = (a.acts instanceof Array ? a.acts : []).filter(function (x) { return HW_ACTS[x]; });
  var due = String(a.due || ''), min = Math.round(Number(a.min) || 0);
  if (!clip_(a.cls, 40) || !clip_(a.book, 20) || !clip_(a.set, 60) || !clip_(a.topic, 80) || !acts.length || !/^\d{4}-\d{2}-\d{2}$/.test(due) || min < 0 || min > 100) {
    return out_({ ok: false, error: 'data' });
  }
  var names = (a.pupils instanceof Array ? a.pupils : []).slice(0, 60).map(function (n) { return clip_(n, 60).replace(/;/g, ' '); }).filter(String);
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = hwSheet_(), now = new Date();
    // the same assignment saved twice within 10 minutes (e.g. the button was pressed again because the page was slow) is saved only once
    if (sh.getLastRow() > 1) {
      var recent = sh.getRange(Math.max(2, sh.getLastRow() - 14), 1, Math.min(15, sh.getLastRow() - 1), HWHEADER.length).getValues();
      for (var q = 0; q < recent.length; q++) {
        var x = recent[q];
        if (x[1] instanceof Date && now - x[1] < 600000 && Number(x[13]) !== 1 && String(x[2]) === clip_(a.cls, 40) && String(x[3]) === clip_(a.book, 20) && String(x[4]) === clip_(a.set, 60) &&
            String(x[7]) === acts.join(',') && hwDay_(x[9]) === due && String(x[11]) === names.join('; ') && Number(x[8]) === min) return out_({ ok: true, duplicate: true });
      }
    }
    var id = 'hw' + Utilities.formatDate(now, TZ, 'yyMMddHHmmss') + Math.floor(Math.random() * 90 + 10);
    var row = [id, now, clip_(a.cls, 40), clip_(a.book, 20), clip_(a.set, 60), clip_(a.topic, 80), clip_(a.unit, 30), acts.join(','), min, due,
               clip_(a.note, 300), names.join('; '), schoolYear_(now), 0];
    sh.appendRow(row);
    sh.getRange(sh.getLastRow(), 1, 1, HWHEADER.length).setNumberFormat('@');
    sh.getRange(sh.getLastRow(), 2).setNumberFormat('dd.mm.yyyy hh:mm'); sh.getRange(sh.getLastRow(), 9).setNumberFormat('0'); sh.getRange(sh.getLastRow(), 14).setNumberFormat('0');
    sh.getRange(sh.getLastRow(), 1, 1, HWHEADER.length).setValues([row]);
  } finally { lock.releaseLock(); }
  return out_({ ok: true });
}

function hwDeleteReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });
  var id = String(d.id || ''), found = false;
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = hwSheet_();
    if (sh.getLastRow() > 1) {
      var ids = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues();
      for (var i = 0; i < ids.length; i++) if (String(ids[i][0]) === id) { sh.deleteRow(i + 2); found = true; break; }          // really removed, with the pupil names in it
    }
  } finally { lock.releaseLock(); }
  return out_({ ok: found });
}

// ---------------------------------------------------------------- board pages
// Tab "Board" (hidden): the teacher's exercise keys from the coursebooks, one row per section (long sections are
// split into parts). Book = book id (6b, 7a ...), Order = position in the book, Level = 1/2/3 (heading level),
// Content = JSON array of blocks: {t:'ref'|'li'|'p', x:text} or {t:'tbl', rows:[[cell,...],...]}.
// In a text, {{W:...}} marks the parts the teacher made white in Word (hidden by a button on the board page).
// The copyrighted book text lives only here, never in the public repository.
var BOARDSHEET = 'Board';
var BOARDHEADER = ['Book', 'Order', 'Part', 'Level', 'Heading', 'Content (JSON)'];

function boardSheet_() {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(BOARDSHEET);
  if (!sh) {
    sh = ss.insertSheet(BOARDSHEET);
    sh.appendRow(BOARDHEADER); sh.setFrozenRows(1); sh.getRange(1, 1, 1, BOARDHEADER.length).setFontWeight('bold');
    sh.getRange('A:A').setNumberFormat('@'); sh.getRange('E:F').setNumberFormat('@');
    var first = ss.getSheets().filter(function (s) { return s.getName() !== BOARDSHEET; })[0];
    if (first) ss.setActiveSheet(first);
    sh.hideSheet();
  }
  return sh;
}

// sections: [{h: heading, lvl: 1-4, blocks: [...]}, ...]; replaces everything stored for that book
function importBoardBook_(book, sections) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sh = boardSheet_(), rows = [];
    sections.forEach(function (s, i) {
      var blocks = s.blocks || [], parts = [[]], size = 0;
      blocks.forEach(function (b) {
        var n = JSON.stringify(b).length;
        if (size + n > 40000 && parts[parts.length - 1].length) { parts.push([]); size = 0; }
        parts[parts.length - 1].push(b); size += n;
      });
      parts.forEach(function (p, k) { rows.push([String(book), i + 1, k + 1, Number(s.lvl) || 0, String(s.h || ''), JSON.stringify(p)]); });
    });
    if (sh.getLastRow() > 1) {                       // drop the old rows of this book
      var old = sh.getRange(2, 1, sh.getLastRow() - 1, BOARDHEADER.length).getValues().filter(function (r) { return String(r[0]) !== String(book); });
      sh.getRange(2, 1, sh.getLastRow() - 1, BOARDHEADER.length).clearContent();
      if (old.length) sh.getRange(2, 1, old.length, BOARDHEADER.length).setNumberFormat('@').setValues(old);
    }
    if (rows.length) {
      var start = sh.getLastRow() + 1, need = start + rows.length - 1;
      if (need > sh.getMaxRows()) sh.insertRowsAfter(sh.getMaxRows(), need - sh.getMaxRows() + 100);
      sh.getRange(start, 1, rows.length, BOARDHEADER.length).setNumberFormat('@').setValues(rows);
    }
    return rows.length;
  } finally { lock.releaseLock(); }
}

function boardReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });
  var sh = SpreadsheetApp.getActive().getSheetByName(BOARDSHEET);
  if (!sh || sh.getLastRow() < 2) return out_({ ok: true, books: [], sections: [] });
  var rows = sh.getRange(2, 1, sh.getLastRow() - 1, BOARDHEADER.length).getValues();
  if (!d.book) {                                       // list of books with their number of sections
    var cnt = {}, order = [];
    rows.forEach(function (r) { var b = String(r[0]); if (!b) return; if (!(b in cnt)) { cnt[b] = {}; order.push(b); } cnt[b][r[1]] = 1; });
    return out_({ ok: true, books: order.map(function (b) { return [b, Object.keys(cnt[b]).length]; }) });
  }
  var secs = {}, keys = [];
  rows.forEach(function (r) {
    if (String(r[0]) !== String(d.book)) return;
    var k = Number(r[1]), s = secs[k];
    if (!s) { s = secs[k] = { n: k, lvl: Number(r[3]), h: String(r[4]), parts: [] }; keys.push(k); }
    s.parts.push([Number(r[2]), String(r[5])]);
  });
  keys.sort(function (a, b) { return a - b; });
  var out = keys.map(function (k) {
    var s = secs[k], blocks = [];
    s.parts.sort(function (a, b) { return a[0] - b[0]; }).forEach(function (p) { try { blocks = blocks.concat(JSON.parse(p[1])); } catch (e) {} });
    return { lvl: s.lvl, h: s.h, blocks: blocks };
  });
  return out_({ ok: true, book: String(d.book), sections: out });
}

// ---- editing the board text on the board page ("Edit" button): one section is saved at a time.
// The first save makes a hidden backup tab "BoardOriginal" (menu: English hub > Restore board text from backup...).
var BOARD_BACKUP = 'BoardOriginal';

function boardBackup_() {
  var ss = SpreadsheetApp.getActive();
  if (ss.getSheetByName(BOARD_BACKUP)) return;
  var src = ss.getSheetByName(BOARDSHEET);
  if (!src) return;
  var first = ss.getSheets().filter(function (s) { return s.getName() !== BOARDSHEET && s.getName() !== BOARD_BACKUP; })[0];
  var c = src.copyTo(ss); c.setName(BOARD_BACKUP);
  if (first) ss.setActiveSheet(first);
  c.hideSheet();
}

// rows of the Board tab for one section (long sections are split into parts of at most 40,000 characters)
function boardRows_(book, n, s) {
  var parts = [[]], size = 0;
  (s.blocks || []).forEach(function (b) {
    var len = JSON.stringify(b).length;
    if (size + len > 40000 && parts[parts.length - 1].length) { parts.push([]); size = 0; }
    parts[parts.length - 1].push(b); size += len;
  });
  return parts.map(function (p, k) { return [String(book), n, k + 1, Number(s.lvl) || 0, String(s.h || ''), JSON.stringify(p)]; });
}

function boardSaveReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });
  var book = String(d.book || ''), n = Math.floor(Number(d.n)), s = d.section;
  if (!/^[0-9a-z]{1,6}$/.test(book) || !(n >= 1 && n <= 2000) || !s || !(s.blocks instanceof Array) || s.blocks.length > 3000) return out_({ ok: false, error: 'data' });
  var str = function (v, max) { return String(v == null ? '' : v).slice(0, max); };
  var blocks = [];
  for (var i = 0; i < s.blocks.length; i++) {
    var b = s.blocks[i] || {};
    if (b.t === 'tbl') {
      if (!(b.rows instanceof Array) || b.rows.length > 300) return out_({ ok: false, error: 'data' });
      blocks.push({ t: 'tbl', rows: b.rows.map(function (r) { return (r instanceof Array ? r : []).slice(0, 30).map(function (c) { return str(c, 2000); }); }) });
    } else if (b.t === 'ref' || b.t === 'p' || b.t === 'h') {       // h = a title line between exercises; keep = "belongs to the previous exercise"
      var o = { t: b.t, x: str(b.x, 4000) }; if (b.keep && b.t === 'p') o.keep = 1; blocks.push(o);
    } else if (b.t === 'li') {
      var li = { t: 'li', x: str(b.x, 4000), l: Math.max(0, Math.min(4, Math.floor(Number(b.l)) || 0)), n: str(b.n, 12) };
      if (b.r) li.r = 1;                                              // r = "numbering restarts here" (set when you type a number or press the restart button)
      blocks.push(li);
    } else return out_({ ok: false, error: 'data' });
  }
  var sec = { lvl: Math.max(0, Math.min(4, Math.floor(Number(s.lvl)) || 0)), h: str(s.h, 300), blocks: blocks };
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    boardBackup_();
    var sh = boardSheet_();
    if (sh.getLastRow() > 1) {                         // remove the old rows of this section (bottom-up)
      var ids = sh.getRange(2, 1, sh.getLastRow() - 1, 2).getValues();
      for (var r = ids.length - 1; r >= 0; r--) if (String(ids[r][0]) === book && Number(ids[r][1]) === n) sh.deleteRow(r + 2);
    }
    var rows = boardRows_(book, n, sec), start = sh.getLastRow() + 1, need = start + rows.length - 1;
    if (need > sh.getMaxRows()) sh.insertRowsAfter(sh.getMaxRows(), need - sh.getMaxRows() + 50);
    sh.getRange(start, 1, rows.length, BOARDHEADER.length).setNumberFormat('@').setValues(rows);
  } finally { lock.releaseLock(); }
  return out_({ ok: true });
}

// ---------------------------------------------------------------- board bookmarks
// Hidden tab "BoardMarks": Kind = pin (an exercise the teacher uses a lot) or stop (where a class stopped; one row per class),
// Class (stop only), Book (6b ...), Section (index of the section on the board), Exercise (its label, e.g. "Book p.20/1"), Label (text of the chip), Time.
var MARKSSHEET = 'BoardMarks', MARKSHEADER = ['Kind', 'Class', 'Book', 'Section', 'Exercise', 'Label', 'Time'];
function marksSheet_() {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(MARKSSHEET);
  if (!sh) {
    sh = ss.insertSheet(MARKSSHEET);
    sh.appendRow(MARKSHEADER); sh.setFrozenRows(1); sh.getRange(1, 1, 1, MARKSHEADER.length).setFontWeight('bold');
    sh.getRange('A:F').setNumberFormat('@');
    var first = ss.getSheets().filter(function (s) { return s.getName() !== MARKSSHEET; })[0];
    if (first) ss.setActiveSheet(first);
    sh.hideSheet();
  }
  return sh;
}
function marksList_() {
  var sh = marksSheet_();
  if (sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, MARKSHEADER.length).getValues().filter(function (r) { return r[0]; }).map(function (r) {
    return { kind: String(r[0]), cls: String(r[1]), book: String(r[2]), si: Number(r[3]) || 0, ref: String(r[4]), label: String(r[5]), t: Number(r[6]) || 0 };
  });
}
function boardMarksReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });
  return out_({ ok: true, marks: marksList_() });
}
function boardMarkSetReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });
  var m = d.mark || {}, kind = String(m.kind || ''), book = String(m.book || ''), si = Math.floor(Number(m.si)), on = d.on !== false;
  var cls = clip_(m.cls, 20), ref = clip_(m.ref, 80), label = clip_(m.label, 200);
  if ((kind !== 'pin' && kind !== 'stop') || !/^[0-9a-z]{1,6}$/.test(book) || !(si >= 0 && si <= 2000) || (kind === 'stop' && !cls)) return out_({ ok: false, error: 'data' });
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = marksSheet_(), vals = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, MARKSHEADER.length).getValues() : [];
    for (var i = vals.length - 1; i >= 0; i--) {                       // remove the row this mark replaces / switches off (bottom-up)
      var r = vals[i], same = kind === 'stop' ? (String(r[0]) === 'stop' && String(r[1]) === cls)
        : (String(r[0]) === 'pin' && String(r[2]) === book && Number(r[3]) === si && String(r[4]) === ref);
      if (same) sh.deleteRow(i + 2);
    }
    if (on) {
      if (kind === 'pin' && vals.filter(function (r) { return String(r[0]) === 'pin'; }).length >= 100) return out_({ ok: false, error: 'limit' });
      var row = [kind, kind === 'stop' ? cls : '', book, si, ref, label, Date.now()], at = sh.getLastRow() + 1;
      sh.getRange(at, 1, 1, MARKSHEADER.length).setNumberFormat('@').setValues([row]);
    }
  } finally { lock.releaseLock(); }
  return out_({ ok: true, marks: marksList_() });
}

function restoreBoardOriginal() {
  var ui = SpreadsheetApp.getUi(), ss = SpreadsheetApp.getActive(), bk = ss.getSheetByName(BOARD_BACKUP);
  if (!bk || bk.getLastRow() < 2) { ui.alert('There is no board backup yet. It is made automatically when the first edit on the board page is saved.'); return; }
  if (ui.alert('Restore the board text from the backup?', 'All edits made on the board page since the backup was made will be lost.', ui.ButtonSet.YES_NO) !== ui.Button.YES) return;
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sh = boardSheet_(), vals = bk.getRange(2, 1, bk.getLastRow() - 1, BOARDHEADER.length).getValues();
    if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, BOARDHEADER.length).clearContent();
    if (vals.length > sh.getMaxRows() - 1) sh.insertRowsAfter(sh.getMaxRows(), vals.length - sh.getMaxRows() + 50);
    sh.getRange(2, 1, vals.length, BOARDHEADER.length).setNumberFormat('@').setValues(vals);
  } finally { lock.releaseLock(); }
  ui.alert('Done. The board text is back to the backup (' + vals.length + ' rows).');
}

// All results (Results + Archive) and the Roster with activity counts, for the private Results page. Teacher only.
// rows:   [time ms, last name, first name, class, book id, unit title, activity, level 1-3, score, total, school year, category (teacher / guest / other for an account without a class, else '')]
// roster: [school year, class, name, attempts that year, last time ms (0 = never)]
function statsReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });
  var ss = SpreadsheetApp.getActive(), rows = [], byEmail = {}, byName = {}, cats = rosterCats_();
  [SHEET, ARCHIVE].forEach(function (n) {
    var sh = ss.getSheetByName(n);
    if (!sh || sh.getLastRow() < 2) return;
    sh.getRange(2, 1, sh.getLastRow() - 1, 18).getValues().forEach(function (r) {
      if (!(r[0] instanceof Date) || !r[1]) return;
      var t = r[0].getTime(), y = String(r[10]);
      var ct = catFor_(cats, r[1], r[2], r[3]);                                   // a test pupil is shown WITHOUT a class and with category 'test'
      rows.push([t, r[3], r[2], ct === 'test' ? '' : r[11], r[4], r[15], r[6], r[14], r[7], r[8], y, ct === 'test' ? 'test' : String(r[11]).trim() ? '' : ct]);
      [[byEmail, y + '|' + String(r[1]).toLowerCase()], [byName, y + '|' + nameKey_(r[2] + ' ' + r[3])]].forEach(function (p) {
        var o = p[0][p[1]] = p[0][p[1]] || { n: 0, t: 0 };
        o.n++; if (t > o.t) o.t = t;
      });
    });
  });
  var roster = [], rs = ss.getSheetByName(ROSTER);
  if (rs && rs.getLastRow() > 1) {
    rs.getRange(2, 1, rs.getLastRow() - 1, Math.max(4, Math.min(8, rs.getLastColumn()))).getValues().forEach(function (r) {
      var email = String(r[0]).trim().toLowerCase(), y = String(r[1]).trim(), cls = String(r[2]).trim(), name = String(r[3]).trim();
      if (!/^\d{4}-\d{2}$/.test(y) || !cls || !(email || name) || catOf_(r[7]) === 'test') return;                // test pupils are not on the class lists
      var a = email && byEmail[y + '|' + email], b = name && byName[y + '|' + nameKey_(name)];
      var n = (a ? a.n : 0), t = (a ? a.t : 0);
      if (b && (!a || b.n > a.n)) { n = b.n; t = b.t; }
      roster.push([y, cls, name || email, n, t]);
    });
  }
  return out_({ ok: true, rows: rows, roster: roster });
}
// The "Results" tab (current school year, newest first). An older layout is kept under another name;
// newer columns are added in place and the old rows get their values.
function resultsSheet_() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(SHEET);
  if (sh && sh.getLastRow() > 0 &&
      sh.getRange(1, 1, 1, BASE_COLS).getValues()[0].join('|') !== HEADER.slice(0, BASE_COLS).join('|')) {
    sh.setName('Results (old ' + Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH-mm') + ')');
    sh = null;
  }
  if (!sh) sh = ss.insertSheet(SHEET, 0);
  return prepare_(sh);
}

// The hidden "Archive" tab: same columns as Results, holds earlier school years.
function archiveSheet_() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(ARCHIVE) || ss.insertSheet(ARCHIVE);
  prepare_(sh);
  if (!sh.isSheetHidden()) {
    if (ss.getActiveSheet().getName() === ARCHIVE) ss.setActiveSheet(ss.getSheetByName(SHEET));
    sh.hideSheet();
  }
  return sh;
}

// The hidden "Puzzles" tab (added 15 Oct 2026): results of the online puzzles (word search, hangman, word scramble, crossword).
// Same columns as Results, but a SEPARATE tab, so averages, the heat-map, homework, the analysis tabs and "My progress" are not affected.
// Score / total: hangman and scramble = words right / words; word search, crossword and tarsia = 1 / 1 when finished. Rows of leavers are
// handled by the same cleanup as Results; earlier school years stay here (every row has its school year).
var PSHEET = 'Puzzles';
var PUZZLE_ACTS = ['Word search', 'Hangman', 'Word scramble', 'Crossword', 'Tarsia', 'Mind map'];
function puzzleSheet_() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(PSHEET) || ss.insertSheet(PSHEET);
  prepare_(sh);
  if (!sh.isSheetHidden()) {
    if (ss.getActiveSheet().getName() === PSHEET) ss.setActiveSheet(ss.getSheetByName(SHEET));
    sh.hideSheet();
  }
  return sh;
}
// Teacher only: the puzzle results in the same row format as `stats` (rows only, no roster).
function puzzleStatsReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });
  var sh = SpreadsheetApp.getActive().getSheetByName(PSHEET), rows = [], cats = rosterCats_();
  if (sh && sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, 18).getValues().forEach(function (r) {
    if (!(r[0] instanceof Date) || !r[1]) return;
    var ct = catFor_(cats, r[1], r[2], r[3]);
    rows.push([r[0].getTime(), r[3], r[2], ct === 'test' ? '' : r[11], r[4], r[15], r[6], r[14], r[7], r[8], String(r[10]), ct === 'test' ? 'test' : String(r[11]).trim() ? '' : ct]);
  });
  return out_({ ok: true, rows: rows });
}

// Makes sure a Results/Archive tab has the current header, formats and hidden helper columns.
function prepare_(sh) {
  if (sh.getLastRow() > 0 && sh.getRange(1, 1, 1, NCOLS).getValues()[0].join('|') === HEADER.join('|')) return sh;
  var older = sh.getLastRow() > 1;
  if (sh.getMaxColumns() < NCOLS) sh.insertColumnsAfter(sh.getMaxColumns(), NCOLS - sh.getMaxColumns());
  sh.getRange(1, 1, 1, NCOLS).setValues([HEADER]).setFontWeight('bold');
  sh.setFrozenRows(1);
  sh.getRange('A:A').setNumberFormat('dd.mm.yyyy hh:mm');
  sh.getRange('J:J').setNumberFormat('0%');
  sh.getRange('K:L').setNumberFormat('@');             // plain text, so "2026-27" is never turned into a date
  sh.getRange('O:O').setNumberFormat('0');
  sh.getRange('R:R').setNumberFormat('0');
  sh.hideColumns(15, 5);                               // O-S: helper columns for the analysis tabs
  if (older) fillDerived_(sh);                         // older rows get their school year / class / book / level
  return sh;
}

// Book, unit, level, "Book · Unit · Topic", level name, hard flag
function derived_(cls, unit, topic, activity) {
  var c = String(cls || '').trim();
  var book = BOOKS[c] || c || 'Other';
  var u = unitLabel_(unit || UNITS[c + '|' + String(topic || '').trim()]);
  var lv = level_(activity);
  return [book, u, lv, [book, u, String(topic || '').trim()].filter(String).join(' · '), LEVELS[lv], lv === 3 ? 1 : 0];
}

// "Unit 3" stays, "Starter"/"Revision" become "Unit 0 (...)" so they sort first.
function unitLabel_(unit) {
  var u = String(unit || '').trim();
  var m = /^unit\s*(\d+)$/i.exec(u);
  if (m) return 'Unit ' + Number(m[1]);
  if (/^(starter|revision)$/i.test(u)) return 'Unit 0 (' + u.charAt(0).toUpperCase() + u.slice(1).toLowerCase() + ')';
  return u;
}

// Difficulty of an activity: 1 words (match, quiz, flashcards), 2 sentences and the unit test, 3 the harder unit test.
function level_(activity) {
  var a = String(activity || '').trim().toLowerCase();
  if (a === 'unit test 2') return 3;
  if (a === 'quiz' || a === 'match' || a === 'flashcards') return 1;
  return 2;
}
// "2026-27" for a date between 1 Sep 2026 and 31 Aug 2027.
function schoolYear_(d) {
  if (!(d instanceof Date)) return '';
  var y = Number(Utilities.formatDate(d, TZ, 'yyyy')), m = Number(Utilities.formatDate(d, TZ, 'M'));
  var start = m >= 9 ? y : y - 1;
  return start + '-' + String(start + 1).slice(2);
}

// Roster tab: A e-mail (optional), B school year (blank = any year), C real class (e.g. 7.a),
// D name as in the school register (optional; matched ignoring case, accents and word order)
function rosterRows_() {
  var sh = SpreadsheetApp.getActive().getSheetByName(ROSTER);
  if (!sh || sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, Math.max(4, Math.min(8, sh.getLastColumn()))).getValues().map(function (r) {
    return { email: String(r[0]).trim().toLowerCase(), year: String(r[1]).trim(), cls: String(r[2]).trim(),
             name: nameKey_(r[3]), test: catOf_(r[7]) === 'test' };                // test = a test pupil (Roster column H = test): has a class, but is left out of every count
  }).filter(function (r) { return (r.email || r.name) && r.cls; });
}

// Category of an account WITHOUT a class: Roster column H (teacher / guest / other). Only for rows with a name or e-mail; it never changes a pupil's class.
// Returns { byEmail: {email: 'teacher'|'guest'|'other'}, byName: {nameKey: ...} }; rows that have a class are ignored (those are pupils).
function catOf_(v) { var s = String(v || '').trim().toLowerCase(); if (!s) return ''; if (/^test/.test(s)) return 'test'; if (/^(t|u)/.test(s)) return 'teacher'; if (/^g/.test(s)) return 'guest'; return 'other'; }
function rosterCats_() {
  var sh = SpreadsheetApp.getActive().getSheetByName(ROSTER), out = { byEmail: {}, byName: {} };
  if (!sh || sh.getLastRow() < 2 || sh.getLastColumn() < 8) return out;
  sh.getRange(2, 1, sh.getLastRow() - 1, 8).getValues().forEach(function (r) {
    var c = catOf_(r[7]), email = String(r[0]).trim().toLowerCase(), key = nameKey_(r[3]);
    if (!c || !(email || key)) return;
    if (String(r[2]).trim() && c !== 'test') return;                         // a category only for people WITHOUT a class, except 'test': a test pupil has a class like everybody else
    if (email) out.byEmail[email] = c;
    if (key) out.byName[key] = c;
  });
  return out;
}
// test pupils (Roster column H = test): { byEmail, byName }; they work like a pupil of their class but are left out of every number the teacher sees
function testSet_() {
  var o = { byEmail: {}, byName: {} };
  rosterRows_().forEach(function (r) { if (!r.test) return; if (r.email) o.byEmail[r.email] = 1; if (r.name) o.byName[r.name] = 1; });
  return o;
}
function isTest_(ts, email, first, last) { return !!(ts.byEmail[String(email).toLowerCase()] || (first !== undefined && ts.byName[nameKey_(first + ' ' + last)])); }
function catFor_(cats, email, first, last) { return cats.byEmail[String(email).toLowerCase()] || cats.byName[nameKey_(first + ' ' + last)] || ''; }

// "Cretnik Sara" and "Sara Čretnik" give the same key.
function nameKey_(s) {
  return String(s || '').toLowerCase().replace(/đ/g, 'd').normalize('NFD').replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9]+/).filter(String).sort().join(' ');
}

function classFor_(rows, email, first, last, year) {
  email = String(email).trim().toLowerCase();
  var name = nameKey_(first + ' ' + last), any = '';
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    if (!((r.email && r.email === email) || (r.name && r.name === name))) continue;
    if (r.year === year) return r.cls;
    if (!r.year) any = r.cls;
  }
  return any;
}

// (Re)computes columns K-R (school year, class, book, level...) for every row of a Results/Archive tab.
function fillDerived_(sh) {
  var n = sh.getLastRow() - 1;
  if (n < 1) return;
  var v = sh.getRange(2, 1, n, 14).getValues();       // A-N
  var roster = rosterRows_(), out = [];
  for (var i = 0; i < n; i++) {
    var r = v[i], y = schoolYear_(r[0]);
    out.push([y, classFor_(roster, r[1], r[2], r[3], y)].concat(derived_(r[4], r[13], r[5], r[6])));
  }
  sh.getRange(2, 11, n, 2).setNumberFormat('@');
  sh.getRange(2, 11, n, 8).setValues(out);
}
// Returns {email, first, last} from the verified token, or null.
function verify_(token) {
  if (!token || !CLIENT_ID) return null;
  // a token that was verified in the last 5 minutes is not sent to Google again (saves about half a second per request)
  var cache = CacheService.getScriptCache(), ckey = 'v' + Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, token)).slice(0, 40);
  try { var hit = cache.get(ckey); if (hit) { var o = JSON.parse(hit); if (o.exp > Date.now()) return o.who; } } catch (e0) {}
  var r = UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(token),
                            { muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) return null;
  var t = JSON.parse(r.getContentText());
  if (t.aud !== CLIENT_ID) return null;
  if (t.iss !== 'https://accounts.google.com' && t.iss !== 'accounts.google.com') return null;
  if (Number(t.exp) * 1000 < Date.now()) return null;
  if (String(t.email_verified) !== 'true') return null;
  if (ALLOWED_DOMAIN && t.hd !== ALLOWED_DOMAIN) return null;
  var who = { email: t.email, first: t.given_name || '', last: t.family_name || '' };
  try { cache.put(ckey, JSON.stringify({ who: who, exp: Number(t.exp) * 1000 }), 300); } catch (e1) {}
  return who;
}

// Trim, cap the length, and stop spreadsheet formulas ("=...", "+...") from running.
function text_(v) {
  var s = String(v == null ? '' : v).slice(0, 80);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// ---------------------------------------------------------------- backup to Drive
// A copy of the whole Sheet (all tabs, also the hidden ones) goes into the Drive folder "NoisyClassRoom backups" of the
// Sheet's owner, every Sunday night (a time trigger made by "Set up weekly backup") or on demand. The newest 8 copies are
// kept; older ones go to the Drive bin (they can still be restored from there for 30 days). The copies hold pupil data
// like the Sheet itself: they stay in the owner's private Drive, never shared.
var BACKUP_FOLDER = 'NoisyClassRoom backups', BACKUP_PREFIX = 'NoisyClassRoom backup ', BACKUP_KEEP = 8;

function backupFolder_() {
  var it = DriveApp.getFoldersByName(BACKUP_FOLDER);
  while (it.hasNext()) { var f = it.next(); if (!f.isTrashed()) return f; }
  return DriveApp.createFolder(BACKUP_FOLDER);
}

function doBackup_() {
  var ss = SpreadsheetApp.getActive(), folder = backupFolder_(), now = new Date();
  var name = BACKUP_PREFIX + Utilities.formatDate(now, TZ, 'yyyy-MM-dd HH.mm');
  DriveApp.getFileById(ss.getId()).makeCopy(name, folder);
  var files = [], it = folder.getFiles();
  while (it.hasNext()) { var f = it.next(); if (f.getName().indexOf(BACKUP_PREFIX) === 0) files.push(f); }
  files.sort(function (a, b) { return b.getDateCreated().getTime() - a.getDateCreated().getTime(); });
  var trashed = 0;
  for (var i = BACKUP_KEEP; i < files.length; i++) { files[i].setTrashed(true); trashed++; }
  var p = PropertiesService.getScriptProperties();
  p.setProperty('LAST_BACKUP', String(now.getTime())); p.deleteProperty('LAST_BACKUP_ERROR');
  return { name: name, kept: Math.min(files.length, BACKUP_KEEP), trashed: trashed, url: folder.getUrl() };
}

function backupLast_() {
  var p = PropertiesService.getScriptProperties(), t = Number(p.getProperty('LAST_BACKUP')) || 0;
  return t ? Utilities.formatDate(new Date(t), TZ, 'd. M. yyyy HH:mm') : '';
}

function weeklyBackup() {                                     // runs from the time trigger
  try { doBackup_(); }
  catch (e) { PropertiesService.getScriptProperties().setProperty('LAST_BACKUP_ERROR', Utilities.formatDate(new Date(), TZ, 'd. M. yyyy HH:mm') + ': ' + e); }
}

function backupNow() {
  var ui = SpreadsheetApp.getUi();
  try {
    var r = doBackup_();
    ui.alert('Backup done', r.name + '\n\nCopies kept: ' + r.kept + (r.trashed ? ' (' + r.trashed + ' older moved to the Drive bin)' : '') + '\nFolder: ' + r.url, ui.ButtonSet.OK);
    onOpen();
  } catch (e) { ui.alert('The backup did not work', String(e), ui.ButtonSet.OK); }
}

function weeklyTrigger_() {
  return ScriptApp.getProjectTriggers().filter(function (t) { return t.getHandlerFunction() === 'weeklyBackup'; });
}

function backupSetup() {
  var ui = SpreadsheetApp.getUi();
  if (weeklyTrigger_().length) { ui.alert('Weekly backup is already on', 'A copy is made every Sunday night (about 03:00). Use "Backup status" to see the last one.', ui.ButtonSet.OK); return; }
  ScriptApp.newTrigger('weeklyBackup').timeBased().onWeekDay(ScriptApp.WeekDay.SUNDAY).atHour(3).create();
  try { var r = doBackup_(); ui.alert('Weekly backup is on', 'A first copy was made now:\n' + r.name + '\n\nFrom now on a copy is made every Sunday night (about 03:00); the newest ' + BACKUP_KEEP + ' are kept.\nFolder: ' + r.url, ui.ButtonSet.OK); onOpen(); }
  catch (e) { ui.alert('Weekly backup is on, but the first copy did not work', String(e), ui.ButtonSet.OK); }
}

function backupStop() {
  var ui = SpreadsheetApp.getUi(), ts = weeklyTrigger_();
  if (!ts.length) { ui.alert('Weekly backup is not on.'); return; }
  if (ui.alert('Switch the weekly backup off?', 'Existing copies stay in Drive.', ui.ButtonSet.OK_CANCEL) !== ui.Button.OK) return;
  ts.forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ui.alert('Weekly backup is off.');
}

function backupStatus() {
  var ui = SpreadsheetApp.getUi(), p = PropertiesService.getScriptProperties(), err = p.getProperty('LAST_BACKUP_ERROR');
  var n = 0, it = backupFolder_().getFiles();
  while (it.hasNext()) if (it.next().getName().indexOf(BACKUP_PREFIX) === 0) n++;
  ui.alert('Backup status', 'Weekly backup: ' + (weeklyTrigger_().length ? 'ON (every Sunday night)' : 'OFF') + '\nLast copy: ' + (backupLast_() || 'none yet') +
    '\nCopies in Drive: ' + n + ' (the newest ' + BACKUP_KEEP + ' are kept)\nFolder: ' + backupFolder_().getUrl() + (err ? '\n\nLast problem: ' + err : ''), ui.ButtonSet.OK);
}

// ---------------------------------------------------------------- health check
// Menu "English hub > Check that everything works": looks at the web app, the Sheet, the Board text, the exercise files on
// GitHub Pages, the website and the backup, and reports in plain words (OK / look at this / broken). It changes nothing.
var SITE_BASE = 'https://noisyclassroom.github.io/english-tools/';
var CLASS_IDS = ['6b', '7a', '7bc', '8a', '8b', '9a', '9b'];

function healthRun_() {
  var rep = [], add = function (lvl, text) { rep.push([lvl, text]); };
  var steps = [['The published web app', hcWebApp_], ['The Sheet', hcSheet_], ['The Board text', hcBoard_], ['Pupils and the Roster', hcPupils_],
               ['The backup', hcBackup_], ['The exercise files on GitHub', hcFiles_], ['The website', hcSite_]];
  steps.forEach(function (s) {
    add('head', s[0]);
    try { s[1](add); } catch (e) { add('bad', 'This check itself failed: ' + e); }
  });
  return rep;
}

// the same check, written to the execution log (Extensions > Apps Script > select healthCheckLog > Run)
function healthCheckLog() {
  healthRun_().forEach(function (r) { Logger.log((r[0] === 'head' ? '\n== ' : '[' + r[0] + '] ') + r[1]); });
}

function healthCheck() {
  var ui = SpreadsheetApp.getUi();
  SpreadsheetApp.getActive().toast('Checking everything - this takes about half a minute...', 'English hub', 30);
  var rep = healthRun_();
  var n = { ok: 0, warn: 0, bad: 0 };
  rep.forEach(function (r) { if (n[r[0]] != null) n[r[0]]++; });
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
  var icon = { ok: '✅', warn: '⚠️', bad: '❌' };
  var html = '<div style="font:14px/1.5 Arial,sans-serif;max-width:640px"><p><b>' + (n.bad ? 'Something is broken (' + n.bad + ').' : n.warn ? 'Everything works; ' + n.warn + ' thing(s) to look at.' : 'Everything works.') +
    '</b> ' + n.ok + ' checks OK' + (n.warn ? ', ' + n.warn + ' to look at' : '') + (n.bad ? ', ' + n.bad + ' broken' : '') + '.</p>' +
    rep.map(function (r) {
      return r[0] === 'head' ? '<h3 style="margin:14px 0 4px;font-size:15px">' + esc(r[1]) + '</h3>' : '<div style="margin:2px 0 2px 4px">' + icon[r[0]] + ' ' + esc(r[1]) + '</div>';
    }).join('') + '</div>';
  ui.showModalDialog(HtmlService.createHtmlOutput(html).setWidth(700).setHeight(560), 'Health check');
}

// 1) the published web app answers and is the same version as the saved code
function hcWebApp_(add) {
  // the address the pupils' pages really use (written in exercises/tracking.js on GitHub Pages)
  var cfg = UrlFetchApp.fetch(SITE_BASE + 'exercises/tracking.js?check=' + Date.now(), { muteHttpExceptions: true }).getContentText();
  var m = /endpoint:\s*["'](https:\/\/script\.google\.com\/macros\/s\/[^"']+)["']/.exec(cfg), url = m && m[1];
  if (!url) { add('bad', 'The exercise pages (exercises/tracking.js) contain no web app address: results cannot be saved.'); return; }
  var r = UrlFetchApp.fetch(url, { method: 'post', contentType: 'text/plain', payload: JSON.stringify({ action: 'ping' }), muteHttpExceptions: true, followRedirects: true });
  var j; try { j = JSON.parse(r.getContentText()); } catch (e) { j = null; }
  if (r.getResponseCode() !== 200 || !j) { add('bad', 'The web app does not answer correctly (HTTP ' + r.getResponseCode() + '). Pupils cannot save results until this is fixed.'); return; }
  if (j.v === CODE_VERSION) add('ok', 'The web app answers and is up to date (' + CODE_VERSION + ').');
  else add('warn', 'The published web app is older than the code saved here. Publish it: Extensions > Apps Script > Deploy > Manage deployments > pencil > Version: New version > Deploy.');
}

// 2) tabs, size, teacher accounts
function hcSheet_(add) {
  var ss = SpreadsheetApp.getActive(), sheets = ss.getSheets(), names = sheets.map(function (s) { return s.getName(); });
  [[SHEET, 'results', true], [ROSTER, 'class list (Roster)', true], [BOARDSHEET, 'Board text', true]].forEach(function (t) {
    if (names.indexOf(t[0]) < 0) add('bad', 'The tab "' + t[0] + '" (' + t[1] + ') is missing.');
  });
  var rs = ss.getSheetByName(SHEET), qs = ss.getSheetByName(QSHEET), ro = ss.getSheetByName(ROSTER);
  if (rs) add('ok', 'Results: ' + Math.max(0, rs.getLastRow() - 1) + ' rows this school year' + (qs ? '; question details: ' + Math.max(0, qs.getLastRow() - 1) + ' rows.' : '.'));
  if (ro) add(ro.getLastRow() > 1 ? 'ok' : 'warn', 'Roster: ' + Math.max(0, ro.getLastRow() - 1) + ' rows' + (ro.getLastRow() > 1 ? '.' : ' - empty, so pupils have no class.'));
  var cells = sheets.reduce(function (a, s) { return a + s.getMaxRows() * s.getMaxColumns(); }, 0), pct = Math.round(cells / 100000);
  add(pct >= 85 ? 'bad' : pct >= 60 ? 'warn' : 'ok', 'The Sheet uses ' + pct + ' % of the 10 million cells Google allows' + (pct >= 60 ? ' - consider "Move earlier school years to Archive" or deleting old results.' : '.'));
  // self-regulation tabs (created when the first row is written): how much they hold, and whether the pupil prompts are on
  [[PSHEET, 'puzzle results'], [GSHEET, 'weekly goals'], [RSHEET, 'test predictions and next steps'], [CSHEET, '"I can" ratings']].forEach(function (t) {
    var sh = ss.getSheetByName(t[0]);
    if (sh) add('ok', 'The hidden tab "' + t[0] + '" (' + t[1] + '): ' + Math.max(0, sh.getLastRow() - 1) + ' rows.');
  });
  add('ok', 'Self-regulation prompts for pupils (My goal ...): ' + (srlOn_() ? 'ON.' : 'OFF (menu English hub > Self-regulation prompts).'));
  var mails = String(PropertiesService.getScriptProperties().getProperty('TEACHER_EMAILS') || '').split(/[\s,;]+/).filter(String);
  add(mails.length ? 'ok' : 'bad', mails.length ? mails.length + ' teacher account(s) are allowed (Results, Board, Today).' : 'No teacher account is set (script property TEACHER_EMAILS): the teacher pages will refuse everybody.');
  if (rs && rs.getLastRow() > 1) {
    var last = rs.getRange(2, 1).getValue();
    if (last instanceof Date) { var days = Math.floor((Date.now() - last.getTime()) / 86400000); add('ok', 'The latest result was saved ' + (days <= 0 ? 'today' : days + ' day(s) ago') + ' (' + Utilities.formatDate(last, TZ, 'd. M. yyyy HH:mm') + ').'); }
  }
}

// 3) the Board text can be read: every row is valid JSON, all seven books are there
function hcBoard_(add) {
  var sh = SpreadsheetApp.getActive().getSheetByName(BOARDSHEET);
  if (!sh || sh.getLastRow() < 2) { add('bad', 'The Board text is empty.'); return; }
  var vals = sh.getRange(2, 1, sh.getLastRow() - 1, 6).getValues(), books = {}, secs = {}, badRows = [];
  vals.forEach(function (r, i) {
    if (!r[0]) return;
    books[String(r[0])] = 1; secs[r[0] + '|' + r[1]] = 1;
    try { var p = JSON.parse(r[5]); if (!(p instanceof Array)) throw 0; } catch (e) { badRows.push(i + 2); }
  });
  var have = Object.keys(books), missing = CLASS_IDS.filter(function (b) { return !books[b]; });
  add(missing.length ? 'warn' : 'ok', 'Board: ' + Object.keys(secs).length + ' sections in ' + have.length + ' books' + (missing.length ? '; no text for: ' + missing.join(', ') + '.' : '.'));
  if (badRows.length) add('bad', 'Board rows that cannot be read (broken text): ' + badRows.slice(0, 8).join(', ') + (badRows.length > 8 ? ' ...' : '') + '. Restore them with "Restore board text from backup...".');
  var bk = SpreadsheetApp.getActive().getSheetByName(BOARD_BACKUP);
  add('ok', bk ? 'The Board backup tab exists (' + Math.max(0, bk.getLastRow() - 1) + ' rows).' : 'No Board backup yet: it is made when you save your first edit on the Board page.');
}

// 4) results from accounts that are not in the Roster (pupils who would not appear in any class)
function hcPupils_(add) {
  var rs = SpreadsheetApp.getActive().getSheetByName(SHEET);
  if (!rs || rs.getLastRow() < 2) { add('ok', 'No results yet.'); return; }
  var year = schoolYear_(new Date()), teachers = String(PropertiesService.getScriptProperties().getProperty('TEACHER_EMAILS') || '').toLowerCase().split(/[\s,;]+/).filter(String), who = {}, cats = rosterCats_(), listed = {};
  rs.getRange(2, 1, rs.getLastRow() - 1, NCOLS).getValues().forEach(function (r) {
    if (!(r[0] instanceof Date) || String(r[10]) !== year || String(r[11]).trim() || teachers.indexOf(String(r[1]).toLowerCase()) >= 0) return;
    var cat = catFor_(cats, r[1], r[2], r[3]); if (cat) { listed[String(r[1]).toLowerCase()] = cat; return; }                // teacher / guest / other: not a missing pupil
    who[String(r[1]).toLowerCase()] = String(r[3] || '') + ' ' + String(r[2] || '');
  });
  var list = Object.keys(who), nl = Object.keys(listed).length;
  if (nl) add('ok', nl + ' account(s) with results this year are listed in the Roster as teacher / guest / other (not counted as pupils).');
  if (!list.length) add('ok', 'Every other account with results this year has a class in the Roster.');
  else add('warn', list.length + ' account(s) have results but no class in the Roster: ' + list.slice(0, 8).map(function (k) { return who[k].trim() || k; }).join(', ') + (list.length > 8 ? ' ...' : '') + '. Add them to the Roster, then run "Refresh classes from Roster".');
}

// 5) the weekly backup
function hcBackup_(add) {
  var p = PropertiesService.getScriptProperties(), t = Number(p.getProperty('LAST_BACKUP')) || 0, err = p.getProperty('LAST_BACKUP_ERROR'), on = weeklyTrigger_().length > 0;
  if (!on) add('warn', 'The weekly backup is OFF. Turn it on with "Set up weekly backup".');
  if (!t) add(on ? 'warn' : 'bad', 'There is no backup copy yet.');
  else { var d = Math.floor((Date.now() - t) / 86400000); add(d > 9 ? 'bad' : 'ok', 'The last backup copy is ' + (d <= 0 ? 'from today' : d + ' day(s) old') + ' (' + backupLast_() + ')' + (d > 9 ? ' - the weekly backup is not running.' : '.')); }
  if (err) add('warn', 'The last backup problem: ' + err);
}

// 6) every exercise file on GitHub Pages exists, is not cut off and has no syntax error
function hcFiles_(add) {
  var files = [['index.html', ''], ['exercises/index.html', ''], ['exercises/classes.js', 'CLASSES'], ['exercises/tracking.js', 'TRACK_CONFIG'], ['exercises/sets.js', 'window.SETS'],
    ['exercises/hints.js', 'WORD_HINTS'], ['exercises/levels-1.js', 'EXTRA_LEVELS'], ['exercises/levels-2.js', 'EXTRA_LEVELS'], ['exercises/levels-3.js', 'EXTRA_LEVELS'], ['exercises/levels-4.js', 'EXTRA_LEVELS'], ['exercises/levels-5.js', 'EXTRA_LEVELS'], ['exercises/levels-6.js', 'EXTRA_LEVELS'],['exercises/explain.js', 'EXPLAIN'], ['exercises/cando-8b.js', 'CANDO'], ['exercises/cando-6b.js', 'CANDO'], ['exercises/cando-7a.js', 'CANDO'], ['exercises/cando-7bc.js', 'CANDO'], ['exercises/cando-8a.js', 'CANDO'], ['exercises/cando-9a.js', 'CANDO'], ['exercises/cando-9b.js', 'CANDO'],['exercises/puzzles.js', 'Puzzles'], ['exercises/tarsia.js', 'Tarsia'], ['exercises/mindmaps.js', 'MINDMAPS'], ['exercises/unitmaps-6b.js', 'UNITMAPS'], ['exercises/unitmaps-7a.js', 'UNITMAPS'], ['exercises/unitmaps-7bc.js', 'UNITMAPS'], ['exercises/unitmaps-8a.js', 'UNITMAPS'], ['exercises/unitmaps-8b.js', 'UNITMAPS'], ['exercises/grammarmaps-8b.js', 'GMAPS'], ['exercises/grammarmaps-6b.js', 'GMAPS'], ['exercises/grammarmaps-7a.js', 'GMAPS'], ['exercises/grammarmaps-7bc.js', 'GMAPS'], ['exercises/grammarmaps-8a.js', 'GMAPS'], ['exercises/grammarmaps-9a.js', 'GMAPS'], ['exercises/grammarmaps-9b.js', 'GMAPS'], ['exercises/reading-6b.js', 'READING'], ['exercises/reading-7a.js', 'READING'], ['exercises/reading-7bc.js', 'READING'], ['exercises/reading-8a.js', 'READING'], ['exercises/reading-8b.js', 'READING'], ['exercises/reading-9a.js', 'READING'], ['exercises/reading-9b.js', 'READING'], ['exercises/deepmaps.js', 'DEEPMAPS'], ['exercises/deepunits-6b.js', 'DEEPUNITS'], ['exercises/deepunits-7a.js', 'DEEPUNITS'], ['exercises/deepunits-7bc.js', 'DEEPUNITS'], ['exercises/deepunits-8a.js', 'DEEPUNITS'], ['exercises/deepunits-8b.js', 'DEEPUNITS'], ['exercises/deepunits-9a.js', 'DEEPUNITS'], ['exercises/deepunits-9b.js', 'DEEPUNITS'], ['exercises/unitmaps-9a.js', 'UNITMAPS'], ['exercises/unitmaps-9b.js', 'UNITMAPS'], ['mindmap/index.html', ''], ['puzzles/index.html', ''], ['tests/index.html', ''], ['vendor/qrcode.min.js', 'qrcode'], ['results/index.html', ''], ['board/index.html', ''], ['today/index.html', '']];
  CLASS_IDS.forEach(function (id) {
    [['class-', 'CLASS_SETS'], ['hard-', 'HARD_TESTS'], ['more-', 'MORE_SETS'], ['more2-', 'MORE2_SETS'], ['grammar-', 'GRAMMAR']].forEach(function (f) { files.push(['exercises/' + f[0] + id + '.js', f[1]]); });
  });
  var res = UrlFetchApp.fetchAll(files.map(function (f) { return { url: SITE_BASE + f[0] + '?check=' + Date.now(), muteHttpExceptions: true }; })), bad = [];
  res.forEach(function (r, i) {
    var f = files[i], code = r.getResponseCode(), txt = code === 200 ? r.getContentText() : '';
    if (code !== 200) { bad.push(f[0] + ' (not found, HTTP ' + code + ')'); return; }
    if (f[1] && txt.indexOf(f[1]) < 0) { bad.push(f[0] + ' (does not look right)'); return; }
    if (/\.js$/.test(f[0])) { try { new Function(txt); } catch (e) { bad.push(f[0] + ' (syntax error: ' + e.message + ')'); } }
  });
  if (!bad.length) add('ok', 'All ' + files.length + ' files of the exercise pages are on GitHub Pages and readable.');
  else bad.forEach(function (b) { add('bad', 'Problem with ' + b + '. Pupils may see an error on that page.'); });
}

// 7) the public website answers
function hcSite_(add) {
  var r = UrlFetchApp.fetch('https://noisy.splet.arnes.si/', { muteHttpExceptions: true, followRedirects: true });
  add(r.getResponseCode() === 200 ? 'ok' : 'bad', r.getResponseCode() === 200 ? 'The website noisy.splet.arnes.si answers.' : 'The website answers with HTTP ' + r.getResponseCode() + '.');
}

// ---------------------------------------------------------------- self-regulation (SELF-REGULATION-PLAN.md, features 1-4)
// The new pupil prompts are OFF until the teacher switches them on (menu "English hub > Self-regulation prompts", script property
// SRL_ON = 1): while off, pupilhome answers {on:false}, nothing is stored and `goalset` refuses.
// Feature 1 "My goal": hidden tab Goals (one row per pupil and week; picking again overwrites it). Whether a goal was reached is
// COMPUTED from Results / Puzzles / Questions, never stored. Types: score (best result of the week in a unit >= target %: 65, 80 or 90),
// count (target activities this week: 3, 5 or 10; puzzles count too), mistakes (no open mistakes left in a unit; for an older week:
// a "Mistakes practice" of that unit was done), finish (all of the unit's activities done this week; target = how many there are).
var GSHEET = 'Goals';
var GHEADER = ['Time', 'School year', 'E-mail', 'Class', 'Week start', 'Type', 'Book', 'Set', 'Topic', 'Target'];
var GOAL_TARGETS = { score: [65, 80, 90], count: [3, 5, 10], mistakes: [0] };
var UNIT_ACTS = ['Match', 'Quiz', 'Fill the gap', 'Unit test', 'Unit test 2'];

function srlOn_() { return PropertiesService.getScriptProperties().getProperty('SRL_ON') === '1'; }

function goalsSheet_() {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(GSHEET);
  if (!sh) {
    sh = ss.insertSheet(GSHEET); sh.appendRow(GHEADER); sh.setFrozenRows(1); sh.getRange(1, 1, 1, GHEADER.length).setFontWeight('bold');
    sh.getRange('A:A').setNumberFormat('dd.mm.yyyy hh:mm'); sh.getRange('B:I').setNumberFormat('@'); sh.getRange('J:J').setNumberFormat('0');
    var first = ss.getSheets().filter(function (s) { return s.getName() !== GSHEET; })[0]; if (first) ss.setActiveSheet(first);
    sh.hideSheet();
  }
  return sh;
}

// 'yyyy-MM-dd' of the Monday of the week that contains ms; and the [start, end) milliseconds of such a week
function srlWeek_(ms) {
  var noon = Utilities.parseDate(Utilities.formatDate(new Date(ms), TZ, 'yyyy-MM-dd') + ' 12:00', TZ, 'yyyy-MM-dd HH:mm').getTime();
  return Utilities.formatDate(new Date(noon - (Number(Utilities.formatDate(new Date(ms), TZ, 'u')) - 1) * 86400000), TZ, 'yyyy-MM-dd');
}
function srlWeekRange_(ymd) {
  var s = Utilities.parseDate(ymd + ' 00:00', TZ, 'yyyy-MM-dd HH:mm').getTime();
  var next = Utilities.formatDate(new Date(s + 7 * 86400000 + 12 * 3600000), TZ, 'yyyy-MM-dd');
  return [s, Utilities.parseDate(next + ' 00:00', TZ, 'yyyy-MM-dd HH:mm').getTime()];
}

// the week of a Goals row as 'yyyy-MM-dd': Sheets may turn the text into a real date, so accept both
function srlWk_(v) { return v instanceof Date ? Utilities.formatDate(v, TZ, 'yyyy-MM-dd') : String(v).trim(); }

function srlGoals_(email, year) {
  var sh = SpreadsheetApp.getActive().getSheetByName(GSHEET), out = [];
  if (!sh || sh.getLastRow() < 2) return out;
  sh.getRange(2, 1, sh.getLastRow() - 1, GHEADER.length).getValues().forEach(function (r, i) {
    if (String(r[2]).toLowerCase() !== email || String(r[1]) !== year) return;
    out.push({ rowNo: i + 2, week: srlWk_(r[4]), type: String(r[5]), book: String(r[6]), set: String(r[7]), topic: String(r[8]), target: Number(r[9]) });
  });
  return out;
}

// the pupil's own finished activities (Results + Puzzles) since fromMs
function srlRows_(email, fromMs) {
  var out = [], ss = SpreadsheetApp.getActive();
  [SHEET, PSHEET].forEach(function (n) {
    var sh = ss.getSheetByName(n); if (!sh || sh.getLastRow() < 2) return;
    sh.getRange(2, 1, sh.getLastRow() - 1, 9).getValues().forEach(function (r) {
      if (r[0] instanceof Date && r[8] > 0 && String(r[1]).toLowerCase() === email && r[0].getTime() >= fromMs) out.push({ t: r[0].getTime(), book: String(r[4]), topic: String(r[5]), act: String(r[6]), p: r[7] / r[8] });
    });
  });
  return out;
}

// open mistakes of one pupil per unit: { 'book\u0001unit title': number } (the same rule as "My mistakes": the latest answer was wrong)
function openMistakesMap_(email) {
  var ss = SpreadsheetApp.getActive(), rs = ss.getSheetByName(SHEET), qs = ss.getSheetByName(QSHEET), map = {};
  if (!rs || !qs || rs.getLastRow() < 2 || qs.getLastRow() < 2) return map;
  var n = rs.getLastRow() - 1, mails = rs.getRange(2, 2, n, 1).getValues(), rids = rs.getRange(2, NCOLS, n, 1).getValues(), ids = {}, agg = {};
  for (var i = 0; i < n; i++) if (rids[i][0] && String(mails[i][0]).toLowerCase() === email) ids[String(rids[i][0])] = 1;
  qs.getRange(2, 1, qs.getLastRow() - 1, QHEADER.length).getValues().forEach(function (r) {
    if (!ids[String(r[1])]) return;
    var unit = String(r[2]) + '\u0001' + String(r[3]), k = unit + '\u0002' + r[5] + '\u0001' + r[6], t = r[0] instanceof Date ? r[0].getTime() : 0, o = agg[k];
    if (!o) o = agg[k] = { unit: unit, act: '', t: 0, ok: 1 };
    if (String(r[4]) !== MISTAKES_ACT && !o.act) o.act = String(r[4]);
    if (t >= o.t) { o.t = t; o.ok = Number(r[8]) ? 1 : 0; }
  });
  Object.keys(agg).forEach(function (k) { var o = agg[k]; if (!o.ok && o.act) map[o.unit] = (map[o.unit] || 0) + 1; });
  return map;
}

// how far a goal got: { cur, reached } (openMap = live open mistakes, only for a goal of this week)
function srlEval_(g, rows, openMap) {
  var rg = srlWeekRange_(g.week), cur = 0, reached = false;
  var sub = rows.filter(function (r) { return r.t >= rg[0] && r.t < rg[1]; });
  var mine = sub.filter(function (r) { return r.book === g.book && r.topic === g.topic; });
  if (g.type === 'count') { cur = sub.length; reached = cur >= g.target; }
  else if (g.type === 'score') { var best = 0; mine.forEach(function (r) { if (PUZZLE_ACTS.indexOf(r.act) < 0 && r.p > best) best = r.p; }); cur = Math.round(best * 100); reached = cur >= g.target; }
  else if (g.type === 'finish') { var seen = {}; mine.forEach(function (r) { if (UNIT_ACTS.indexOf(r.act) >= 0) seen[r.act] = 1; }); cur = Object.keys(seen).length; reached = cur >= g.target; }
  else if (g.type === 'mistakes') {
    if (openMap) { cur = openMap[g.book + '\u0001' + g.topic] || 0; reached = cur === 0; }
    else { reached = mine.some(function (r) { return r.act === MISTAKES_ACT; }); cur = reached ? 0 : null; }
  }
  return { week: g.week, type: g.type, book: g.book, set: g.set, topic: g.topic, target: g.target, cur: cur, reached: reached };
}

// what the pupil's page needs: this week's goal with its progress, last week's goal, and how many goals were reached this school year
function srlState_(who) {
  var email = String(who.email).toLowerCase(), now = Date.now(), year = schoolYear_(new Date(now)), weekNow = srlWeek_(now);
  var goals = srlGoals_(email, year), cur = null, last = null;
  // the pupil may not open the app every week: "last" is the most recent EARLIER goal, whichever week it was
  goals.forEach(function (g) { if (g.week === weekNow) cur = g; else if (g.week < weekNow && (!last || g.week > last.week)) last = g; });
  var st = { on: true, week: weekNow, goal: null, last: null, reached: 0, total: goals.length };
  if (!goals.length) return st;
  var from = Math.min.apply(null, goals.map(function (g) { return srlWeekRange_(g.week)[0]; })), rows = srlRows_(email, from);
  var openMap = cur && cur.type === 'mistakes' ? openMistakesMap_(email) : null;
  goals.forEach(function (g) { if (srlEval_(g, rows, g === cur ? openMap : null).reached) st.reached++; });
  if (cur) st.goal = srlEval_(cur, rows, openMap);
  if (last) st.last = srlEval_(last, rows, null);
  return st;
}

function goalSetReply_(d) {
  var who = verify_(d.token);
  if (!who) return out_({ ok: false, error: 'token' });
  if (!srlOn_()) return out_({ ok: false, error: 'off' });
  var g = d.goal || {}, type = String(g.type), target = Math.round(Number(g.target));
  var book = clip_(g.book, 20), set = clip_(g.set, 60), topic = clip_(g.topic, 120);
  var okT = type === 'finish' ? (target >= 1 && target <= 6) : (GOAL_TARGETS[type] && GOAL_TARGETS[type].indexOf(target) >= 0);
  if (!okT || (type !== 'count' && (BOOK_IDS.indexOf(book) < 1 || !topic))) return out_({ ok: false, error: 'data' });
  if (type === 'count') { book = ''; set = ''; topic = ''; }
  var email = String(who.email).toLowerCase(), now = new Date(), year = schoolYear_(now), week = srlWeek_(now.getTime());
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var sh = goalsSheet_(), cls = classFor_(rosterRows_(), who.email, who.first, who.last, year);
    var row = [now, year, email, cls, week, type, book, set, topic, target], mine = srlGoals_(email, year).filter(function (x) { return x.week === week; })[0];
    var at = mine ? sh.getRange(mine.rowNo, 1, 1, GHEADER.length) : sh.getRange(sh.getLastRow() + 1, 1, 1, GHEADER.length);
    at.setNumberFormats([['dd.mm.yyyy hh:mm', '@', '@', '@', '@', '@', '@', '@', '@', '0']]);       // text first, so the week stays '2026-10-19' and is not turned into a date
    at.setValues([row]);
  } finally { lock.releaseLock(); }
  var st; try { st = srlState_(who); } catch (e) { st = { on: true, week: week, goal: { week: week, type: type, book: book, set: set, topic: topic, target: target, cur: 0, reached: false }, last: null, reached: 0, total: 1 }; }   // the goal IS saved: never show an error for a failed progress calculation
  return out_({ ok: true, srl: st });
}

// Features 2 and 3: "How sure are you?" before a Unit test / Unit test 2 / Grammar quick check and "Next I will..." after it.
// Hidden tab Reflections: [time, school year, RESULT ID, kind, value, extra]; no name or e-mail in the row (it is linked to its result
// like the question rows, and the leavers cleanup removes it with the result). kind = confidence: value 1-4 (not sure ... very sure),
// extra = the percentage the pupil aimed for (65 / 80 / 90); kind = next: value = the choice, extra empty. Nothing is typed by the pupil.
var RSHEET = 'Reflections';
var RHEADER = ['Time', 'School year', 'Result id', 'Kind', 'Value', 'Extra'];
var REFLECT_ACTS = ['Unit test', 'Unit test 2', 'Grammar quick check'];
var NEXT_CHOICES = ['mistakes', 'grammar', 'words', 'harder', 'happy'];

function reflectionsSheet_() {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(RSHEET);
  if (!sh) {
    sh = ss.insertSheet(RSHEET); sh.appendRow(RHEADER); sh.setFrozenRows(1); sh.getRange(1, 1, 1, RHEADER.length).setFontWeight('bold');
    sh.getRange('A:A').setNumberFormat('dd.mm.yyyy hh:mm'); sh.getRange('B:E').setNumberFormat('@'); sh.getRange('F:F').setNumberFormat('@');
    var first = ss.getSheets().filter(function (s) { return s.getName() !== RSHEET; })[0]; if (first) ss.setActiveSheet(first);
    sh.hideSheet();
  }
  return sh;
}

// the choice after a test ("Next I will..."), linked to the pupil's own result; the pupil's page sends it once the result is saved
function reflectSetReply_(d) {
  var who = verify_(d.token);
  if (!who) return out_({ ok: false, error: 'token' });
  if (!srlOn_()) return out_({ ok: false, error: 'off' });
  var rid = clip_(d.rid, 40), value = String(d.value);
  if (!rid || NEXT_CHOICES.indexOf(value) < 0) return out_({ ok: false, error: 'data' });
  var ss = SpreadsheetApp.getActive(), rs = ss.getSheetByName(SHEET), email = String(who.email).toLowerCase(), mine = false;
  if (rs && rs.getLastRow() > 1) {                                        // the result must be this pupil's own and a test
    var n = Math.min(rs.getLastRow() - 1, 400), top = rs.getRange(2, 1, n, NCOLS).getValues();
    for (var i = 0; i < top.length; i++) if (String(top[i][NCOLS - 1]) === rid && String(top[i][1]).toLowerCase() === email && REFLECT_ACTS.indexOf(String(top[i][6])) >= 0) { mine = true; break; }
  }
  if (!mine) return out_({ ok: false, error: 'noresult' });
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var sh = reflectionsSheet_(), now = new Date(), row = [now, schoolYear_(now), rid, 'next', value, ''], found = 0;
    if (sh.getLastRow() > 1) sh.getRange(2, 3, sh.getLastRow() - 1, 2).getValues().forEach(function (r, i) { if (!found && String(r[0]) === rid && String(r[1]) === 'next') found = i + 2; });
    if (found) sh.getRange(found, 1, 1, RHEADER.length).setValues([row]); else { sh.appendRow(row); sh.getRange(sh.getLastRow(), 1, 1, RHEADER.length).setValues([row]); }
  } finally { lock.releaseLock(); }
  return out_({ ok: true });
}

// Feature 4 "I can": the pupil rates 3-4 can-do statements per unit (texts in exercises/cando-<class id>.js) on the school's scale
// 1 Not yet (Še ne) / 2 With help (S pomočjo) / 3 On my own (Sam/a). Hidden tab CanDo: [time, school year, e-mail, class, book, unit id,
// statement number, rating]; every save appends rows, so the first and the latest rating of a statement can be compared.
var CSHEET = 'CanDo';
var CHEADER = ['Time', 'School year', 'E-mail', 'Class', 'Book', 'Unit', 'Statement', 'Rating'];

function canDoSheet_() {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(CSHEET);
  if (!sh) {
    sh = ss.insertSheet(CSHEET); sh.appendRow(CHEADER); sh.setFrozenRows(1); sh.getRange(1, 1, 1, CHEADER.length).setFontWeight('bold');
    sh.getRange('A:A').setNumberFormat('dd.mm.yyyy hh:mm'); sh.getRange('B:F').setNumberFormat('@'); sh.getRange('G:H').setNumberFormat('0');
    var first = ss.getSheets().filter(function (s) { return s.getName() !== CSHEET; })[0]; if (first) ss.setActiveSheet(first);
    sh.hideSheet();
  }
  return sh;
}

// one pupil's ratings of one unit: { statement number: { first, last, t (ms of the latest) } }
function canDoFor_(email, year, book, unit) {
  var sh = SpreadsheetApp.getActive().getSheetByName(CSHEET), out = {};
  if (!sh || sh.getLastRow() < 2) return out;
  sh.getRange(2, 1, sh.getLastRow() - 1, CHEADER.length).getValues().forEach(function (r) {
    if (String(r[2]).toLowerCase() !== email || String(r[1]) !== year || String(r[4]) !== book || String(r[5]) !== unit || !(r[0] instanceof Date)) return;
    var i = Number(r[6]), t = r[0].getTime(), o = out[i] = out[i] || { first: Number(r[7]), firstT: t, last: Number(r[7]), t: t };
    if (t < o.firstT) { o.first = Number(r[7]); o.firstT = t; }
    if (t >= o.t) { o.last = Number(r[7]); o.t = t; }
  });
  return out;
}

function canDoGetReply_(d) {
  var who = verify_(d.token);
  if (!who) return out_({ ok: false, error: 'token' });
  if (!srlOn_()) return out_({ ok: false, error: 'off' });
  var book = clip_(d.book, 20), unit = clip_(d.unit, 60);
  if (BOOK_IDS.indexOf(book) < 1 || !unit) return out_({ ok: false, error: 'data' });
  return out_({ ok: true, items: canDoFor_(String(who.email).toLowerCase(), schoolYear_(new Date()), book, unit) });
}

function canDoSetReply_(d) {
  var who = verify_(d.token);
  if (!who) return out_({ ok: false, error: 'token' });
  if (!srlOn_()) return out_({ ok: false, error: 'off' });
  var book = clip_(d.book, 20), unit = clip_(d.unit, 60), rs = d.ratings instanceof Array ? d.ratings.slice(0, 10) : [];
  var good = rs.filter(function (x) { return x && Math.round(x.i) >= 0 && Math.round(x.i) <= 9 && [1, 2, 3].indexOf(Math.round(x.r)) >= 0; });
  if (BOOK_IDS.indexOf(book) < 1 || !unit || !good.length) return out_({ ok: false, error: 'data' });
  var email = String(who.email).toLowerCase(), now = new Date(), year = schoolYear_(now);
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var sh = canDoSheet_(), cls = classFor_(rosterRows_(), who.email, who.first, who.last, year);
    var rows = good.map(function (x) { return [now, year, email, cls, book, unit, Math.round(x.i), Math.round(x.r)]; });
    sh.getRange(sh.getLastRow() + 1, 1, rows.length, CHEADER.length).setValues(rows);
  } finally { lock.releaseLock(); }
  return out_({ ok: true, items: canDoFor_(email, year, book, unit) });
}

// teacher only: every rating with the pupil's name and class (for the pupil detail in Results, later the Self-regulation tab)
function canDoStatsReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(CSHEET), rows = [];
  if (!sh || sh.getLastRow() < 2) return out_({ ok: true, rows: rows });
  var rs = ss.getSheetByName(SHEET), names = {};
  if (rs && rs.getLastRow() > 1) rs.getRange(2, 2, rs.getLastRow() - 1, 3).getValues().forEach(function (r) { var k = String(r[0]).toLowerCase(); if (k && !names[k]) names[k] = [String(r[2]), String(r[1])]; });
  sh.getRange(2, 1, sh.getLastRow() - 1, CHEADER.length).getValues().forEach(function (r) {
    if (!(r[0] instanceof Date)) return;
    var nm = names[String(r[2]).toLowerCase()] || ['', ''];
    rows.push([r[0].getTime(), nm[0], nm[1], String(r[3]), String(r[4]), String(r[5]), Number(r[6]), Number(r[7]), String(r[1])]);
  });
  return out_({ ok: true, rows: rows });
}

// Feature 5 (teacher): anonymous self-regulation indicators per class and week, for the Results tab "Self-regulation" and the Team report.
// Nothing with a name or e-mail leaves the script: only counts (the e-mails are used here to count DISTINCT pupils). d = {token, year,
// from, to (ms, optional)}. Answer: cells = [{cls, wk, ...counts}] where wk is the Monday of the week or '*' (the whole period) and cls is
// the class or '*' (all classes), pupilsIn = {cls: number of pupils in the Roster}. "Self-started" = an activity that was not part of an
// open homework of that pupil's class at that moment. Prediction matched = sure (3-4) and reached the aimed % or not sure (1-2) and did not.
// Goals: reached is computed like for the pupil (a "clear my mistakes" goal counts when a Mistakes practice of that unit was done).
// "I can" is counted for the whole school year (not by dates): ratings first vs latest per statement.
function srlStatsReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });
  var year = clip_(d.year, 10) || schoolYear_(new Date()), from = Number(d.from) || 0, to = Number(d.to) || 0;
  var ss = SpreadsheetApp.getActive(), agg = {}, wkCache = {}, rowsBy = {}, ridInfo = {}, weeks = {}, tst = testSet_();
  var inRange = function (t) { return t >= from && (!to || t < to) && schoolYear_(new Date(t)) === year; };
  var weekOf = function (t) { var day = Utilities.formatDate(new Date(t), TZ, 'yyyy-MM-dd'); return wkCache[day] || (wkCache[day] = srlWeek_(t)); };
  var cell = function (cls, wk) {
    var k = cls + '\u0001' + wk;
    return agg[k] || (agg[k] = { cls: cls, wk: wk, acts: 0, self: 0, pup: {}, selfPup: {}, mist: {}, lvl: 0, hard: 0, pn: 0, pm: 0,
      goalPup: {}, goals: 0, goalsOk: 0, next: {}, cdN: 0, cdFirst: 0, cdLast: 0, cdTwo: 0, cdUp: 0 });
  };
  var each = function (cls, wk, fn) { [cell(cls, wk), cell(cls, '*'), cell('*', wk), cell('*', '*')].forEach(fn); };
  var tot = function (cls, fn) { [cell(cls, '*'), cell('*', '*')].forEach(fn); };

  // open homework per book + topic (this school year)
  var hwBy = {};
  hwAll_().forEach(function (a) { if (a.year && a.year !== year) return; (hwBy[a.book + '\u0001' + a.topic] = hwBy[a.book + '\u0001' + a.topic] || []).push(a); });
  var isHw = function (cls, nk, book, topic, act, t) {
    var list = hwBy[book + '\u0001' + topic] || [];
    for (var i = 0; i < list.length; i++) {
      var a = list[i];
      if (a.cls !== cls || t < a.created || (a.dueEnd > 0 && t > a.dueEnd)) continue;
      if (a.names.length && a.keys.indexOf(nk) < 0) continue;
      for (var j = 0; j < a.acts.length; j++) if (HW_ACTS[a.acts[j]] === act) return true;
    }
    return false;
  };

  // finished activities (Results + Puzzles)
  [SHEET, PSHEET].forEach(function (n) {
    var sh = ss.getSheetByName(n); if (!sh || sh.getLastRow() < 2) return;
    var w = Math.min(NCOLS, sh.getLastColumn());
    sh.getRange(2, 1, sh.getLastRow() - 1, w).getValues().forEach(function (r) {
      if (!(r[0] instanceof Date) || !(r[8] > 0) || isTest_(tst, r[1], r[2], r[3])) return;
      var t = r[0].getTime(), email = String(r[1]).toLowerCase(), act = String(r[6]), cls = String(r[11] || '').trim(), puzzle = n === PSHEET;
      (rowsBy[email] = rowsBy[email] || []).push({ t: t, book: String(r[4]), topic: String(r[5]), act: act, p: r[7] / r[8] });
      if (!puzzle && w >= NCOLS && r[NCOLS - 1]) ridInfo[String(r[NCOLS - 1])] = { t: t, cls: cls, p: r[7] / r[8] };
      if (!cls || !inRange(t)) return;                                  // only pupils with a class (teachers, guests and unlisted accounts are not part of the team numbers)
      var wk = weekOf(t), self = !isHw(cls, nameKey_(r[2] + ' ' + r[3]), String(r[4]), String(r[5]), act, t), lvl = !puzzle && w > 14 ? Number(r[14]) : 0;
      weeks[wk] = 1;
      each(cls, wk, function (c) {
        c.acts++; c.pup[email] = 1;
        if (self) { c.self++; c.selfPup[email] = 1; }
        if (act === MISTAKES_ACT) c.mist[email] = 1;
        if (lvl >= 1 && lvl <= 3) { c.lvl++; if (lvl >= 2) c.hard++; }
      });
    });
  });

  // predictions and next steps (linked to their result)
  var rf = ss.getSheetByName(RSHEET);
  if (rf && rf.getLastRow() > 1) rf.getRange(2, 1, rf.getLastRow() - 1, RHEADER.length).getValues().forEach(function (r) {
    var info = ridInfo[String(r[2])]; if (!info || !info.cls || !inRange(info.t)) return;
    var wk = weekOf(info.t), kind = String(r[3]);
    if (kind === 'confidence') {
      var sure = Number(r[4]) >= 3, aim = Number(r[5]) || 80, hit = info.p * 100 >= aim - 1e-9;
      each(info.cls, wk, function (c) { c.pn++; if (sure === hit) c.pm++; });
    } else if (kind === 'next') each(info.cls, wk, function (c) { c.next[String(r[4])] = (c.next[String(r[4])] || 0) + 1; });
  });

  // weekly goals
  var gs = ss.getSheetByName(GSHEET);
  if (gs && gs.getLastRow() > 1) gs.getRange(2, 1, gs.getLastRow() - 1, GHEADER.length).getValues().forEach(function (r) {
    if (String(r[1]) !== year) return;
    var g = { week: srlWk_(r[4]), type: String(r[5]), book: String(r[6]), set: String(r[7]), topic: String(r[8]), target: Number(r[9]) }, rg = srlWeekRange_(g.week);
    if (rg[1] <= from || (to && rg[0] >= to)) return;
    var email = String(r[2]).toLowerCase(), cls = String(r[3]).trim(); if (isTest_(tst, email)) return;
    var ok = srlEval_(g, rowsBy[email] || [], null).reached;
    if (!cls) return;
    weeks[g.week] = 1;
    each(cls, g.week, function (c) { c.goals++; c.goalPup[email] = 1; if (ok) c.goalsOk++; });
  });

  // "I can": first vs latest rating of every statement (whole school year)
  var cs = ss.getSheetByName(CSHEET), cd = {};
  if (cs && cs.getLastRow() > 1) cs.getRange(2, 1, cs.getLastRow() - 1, CHEADER.length).getValues().forEach(function (r) {
    if (!(r[0] instanceof Date) || String(r[1]) !== year || !String(r[3]).trim() || isTest_(tst, r[2])) return;
    var k = String(r[2]).toLowerCase() + '\u0001' + r[4] + '\u0001' + r[5] + '\u0001' + r[6], t = r[0].getTime(), o = cd[k] = cd[k] || { cls: String(r[3]).trim(), n: 0, f: 0, ft: Infinity, l: 0, lt: -1 };
    o.n++; if (t < o.ft) { o.ft = t; o.f = Number(r[7]); } if (t >= o.lt) { o.lt = t; o.l = Number(r[7]); }
  });
  Object.keys(cd).forEach(function (k) {
    var o = cd[k]; tot(o.cls, function (c) { c.cdN++; if (o.f === 3) c.cdFirst++; if (o.l === 3) c.cdLast++; if (o.n > 1) { c.cdTwo++; if (o.l > o.f) c.cdUp++; } });
  });

  // pupils per class (Roster of this year)
  var pupilsIn = { '*': 0 }, seen = {};
  rosterRows_().forEach(function (r) {
    if ((r.year && r.year !== year) || r.test) return;
    var k = (r.email || r.name) + '\u0001' + r.cls; if (seen[k]) return; seen[k] = 1;
    pupilsIn[r.cls] = (pupilsIn[r.cls] || 0) + 1; pupilsIn['*']++;
  });

  var cells = Object.keys(agg).map(function (k) {
    var c = agg[k];
    return { cls: c.cls, wk: c.wk, acts: c.acts, self: c.self, pup: Object.keys(c.pup).length, selfPup: Object.keys(c.selfPup).length, mist: Object.keys(c.mist).length,
      lvl: c.lvl, hard: c.hard, pn: c.pn, pm: c.pm, goalPup: Object.keys(c.goalPup).length, goals: c.goals, goalsOk: c.goalsOk, next: c.next,
      cdN: c.cdN, cdFirst: c.cdFirst, cdLast: c.cdLast, cdTwo: c.cdTwo, cdUp: c.cdUp };
  });
  return out_({ ok: true, year: year, cells: cells, pupilsIn: pupilsIn, weeks: Object.keys(weeks).sort() });
}

// the units where this pupil has open mistakes: { ok, units: [{book, topic, n}] } (most first)
function goalMistakesReply_(d) {
  var who = verify_(d.token);
  if (!who) return out_({ ok: false, error: 'token' });
  if (!srlOn_()) return out_({ ok: false, error: 'off' });
  var map = openMistakesMap_(String(who.email).toLowerCase());
  return out_({ ok: true, units: Object.keys(map).map(function (k) { var p = k.split('\u0001'); return { book: p[0], topic: p[1], n: map[k] }; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 40) });
}

// a dry run for the editor (Run > srlSelfTestLog): week helpers and the goal rules on made-up rows; reads and writes nothing
function srlSelfTestLog() {
  var now = Date.now(), w = srlWeek_(now), rg = srlWeekRange_(w);
  Logger.log('this week: ' + w + ' (' + Utilities.formatDate(new Date(rg[0]), TZ, 'EEE d.M. HH:mm') + ' to ' + Utilities.formatDate(new Date(rg[1]), TZ, 'EEE d.M. HH:mm') + '), last week: ' + srlWeek_(rg[0] - 12 * 3600000) + ', length ' + Math.round((rg[1] - rg[0]) / 3600000) + ' h');
  var rows = [{ t: rg[0] + 3600000, book: '8b', topic: 'My life', act: 'Quiz', p: 0.7 }, { t: rg[0] + 7200000, book: '8b', topic: 'My life', act: 'Unit test', p: 0.9 },
              { t: rg[0] + 9000000, book: '8b', topic: 'My life', act: 'Word search', p: 1 }, { t: rg[0] - 3600000, book: '8b', topic: 'My life', act: 'Quiz', p: 1 }];
  [{ type: 'score', target: 80 }, { type: 'score', target: 90 }, { type: 'count', target: 3 }, { type: 'finish', target: 2 }, { type: 'finish', target: 3 }, { type: 'mistakes', target: 0 }].forEach(function (g) {
    g.week = w; g.book = g.type === 'count' ? '' : '8b'; g.topic = g.type === 'count' ? '' : 'My life'; g.set = '';
    var a = srlEval_(g, rows, null), b = g.type === 'mistakes' ? srlEval_(g, rows, { '8b\u0001My life': 2 }) : null;
    Logger.log(g.type + ' ' + g.target + ' -> cur ' + a.cur + ' reached ' + a.reached + (b ? ' | with 2 open mistakes: cur ' + b.cur + ' reached ' + b.reached : ''));
  });
  Logger.log('expected: score80 cur 90 reached; score90 reached (90); count3 cur 3 reached (the puzzle counts, last week row does not); finish2 cur 2 reached; finish3 cur 2 not reached; mistakes without map: not reached; with 2 open: cur 2 not reached');
}

// Sheet menu: show whether the pupil prompts are on, and switch them on or off
function srlSwitch() {
  var ui = SpreadsheetApp.getUi(), on = srlOn_(), p = PropertiesService.getScriptProperties();
  var r = ui.alert('Self-regulation prompts for pupils: ' + (on ? 'ON' : 'OFF'),
    on ? 'The pupils see "My goal" and the other new prompts of the self-regulation plan. Switch them OFF? (Nothing is deleted.)'
       : 'Switch them ON for all signed-in pupils? Do this only after the data-protection officer has seen the updated DATA-PROTECTION.md.', ui.ButtonSet.YES_NO);
  if (r !== ui.Button.YES) return;
  p.setProperty('SRL_ON', on ? '0' : '1');
  ui.alert('Self-regulation prompts are now ' + (on ? 'OFF' : 'ON') + '.');
}

// ---------------------------------------------------------------- Monday summary e-mail (19 Oct 2026)
// Every Monday about 07:00 the teacher(s) in TEACHER_EMAILS get one short e-mail: activity of the last 7 days by class (with the
// 7 days before), classes with no activity, pupils who have not practised for 14+ days (numbers only: NO pupil names are e-mailed),
// homework that is open and overdue / due this week (numbers per assignment), puzzles, the number of often-missed questions without
// an explanation (explain.js), the backup and the health check (only what is not OK). Menu "English hub": set up / send now / stop.
// Needs the permission to send e-mail (a Google screen appears once when it is set up or sent the first time).
var SUMMARY_FN = 'weeklySummary';

function summaryData_() {
  var DAY = 86400000, now = Date.now(), w0 = now - 7 * DAY, p0 = w0 - 7 * DAY, q0 = now - 14 * DAY, year = schoolYear_(new Date());
  var ss = SpreadsheetApp.getActive(), roster = rosterRows_().filter(function (r) { return (r.year === year || !r.year) && !r.test; }), tst = testSet_();
  var classes = {}, order = [];
  roster.forEach(function (r) {
    var c = classes[r.cls]; if (!c) { c = classes[r.cls] = { cls: r.cls, pupils: 0, active: {}, n: 0, np: 0, last: 0, quiet: 0 }; order.push(r.cls); }
    c.pupils++;
  });
  var lastByEmail = {}, lastByName = {};
  var sh = ss.getSheetByName(SHEET);
  if (sh && sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, 12).getValues().forEach(function (r) {
    if (!(r[0] instanceof Date) || String(r[10]) !== year || isTest_(tst, r[1], r[2], r[3])) return;
    var t = r[0].getTime(), email = String(r[1]).toLowerCase(), nk = nameKey_(r[2] + ' ' + r[3]), c = classes[String(r[11])];
    if (t > (lastByEmail[email] || 0)) lastByEmail[email] = t;
    if (t > (lastByName[nk] || 0)) lastByName[nk] = t;
    if (!c) return;
    if (t > c.last) c.last = t;
    if (t >= w0) { c.n++; c.active[email] = 1; } else if (t >= p0) c.np++;
  });
  roster.forEach(function (r) {                                   // pupils with nothing for 14+ days (or never)
    var t = Math.max(r.email ? (lastByEmail[r.email] || 0) : 0, r.name ? (lastByName[r.name] || 0) : 0);
    if (t < q0) classes[r.cls].quiet++;
  });
  var puzzles = 0, ps = ss.getSheetByName(PSHEET);
  if (ps && ps.getLastRow() > 1) ps.getRange(2, 1, ps.getLastRow() - 1, 11).getValues().forEach(function (r) { if (r[0] instanceof Date && r[0].getTime() >= w0 && String(r[10]) === year) puzzles++; });
  // homework: open assignments that are overdue (up to 21 days) or due in the next 7 days
  var hw = [], results = hwResults_();
  hwAll_().filter(function (a) { return a.year === year; }).forEach(function (a) {
    var people = roster.filter(function (r) { return r.cls === a.cls && (!a.keys.length || a.keys.indexOf(r.name) >= 0); }), open = 0;
    people.forEach(function (p) { if (!hwProgress_(a, results, p.email, p.name ? [p.name] : []).done) open++; });
    var overdue = a.dueEnd > 0 && now > a.dueEnd;
    if (!open || !people.length) return;
    if (overdue && now - a.dueEnd > 21 * DAY) return;
    if (!overdue && a.dueEnd - now > 7 * DAY) return;
    hw.push({ cls: a.cls, unit: [a.unit, a.topic].filter(String).join(' · '), due: a.due, overdue: overdue, open: open, total: people.length });
  });
  // often-missed questions that still have no explanation (the same rule as the card on the Today page)
  var unexplained = null;
  try {
    var src = UrlFetchApp.fetch(SITE_BASE + 'exercises/explain.js?x=' + now, { muteHttpExceptions: true }).getContentText(), have = {}, m, re = /^\s*"((?:[^"\\]|\\.)*)"\s*:/gm;
    while ((m = re.exec(src))) have[m[1].replace(/\\"/g, '"')] = 1;
    var by = {};
    questionStats_().filter(function (a) { return a[0] === year && !/^(Quiz|Match)$/.test(a[4]); }).forEach(function (a) {
      var k = String(a[5]).trim().toLowerCase() + '||' + String(a[6]).trim().toLowerCase(), o = by[k] = by[k] || { k: k, n: 0, w: 0 };
      o.n += a[7]; o.w += a[8];
    });
    unexplained = Object.keys(by).filter(function (k) { var o = by[k]; return o.n >= 5 && o.w / o.n >= 0.4 && !have[k] && !have[k.split('||')[0]]; }).length;
  } catch (e) {}
  var health = null;
  try { health = healthRun_().filter(function (r) { return r[0] === 'warn' || r[0] === 'bad'; }); } catch (e2) { health = [['bad', 'The health check itself failed: ' + e2]]; }
  return { year: year, w0: w0, now: now, classes: order.sort(function (a, b) { return a.localeCompare(b, 'sl', { numeric: true }); }).map(function (c) { return classes[c]; }),
    puzzles: puzzles, hw: hw, unexplained: unexplained, health: health, backup: backupLast_(), backupOn: weeklyTrigger_().length > 0 };
}

function summaryHtml_(d) {
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }, f = function (t) { return Utilities.formatDate(new Date(t), TZ, 'd. M.'); };
  var td = 'style="padding:3px 10px;border-bottom:1px solid #ddd"', tdn = 'style="padding:3px 10px;border-bottom:1px solid #ddd;text-align:right"';
  var h = '<div style="font:14px/1.5 Arial,sans-serif;color:#222;max-width:680px"><h2 style="margin:0 0 4px">NoisyClassRoom: the week ' + f(d.w0) + ' – ' + f(d.now) + '</h2>';
  var total = d.classes.reduce(function (s, c) { return s + c.n; }, 0), prev = d.classes.reduce(function (s, c) { return s + c.np; }, 0);
  h += '<p>' + total + ' finished activities in the last 7 days (the 7 days before: ' + prev + ')' + (d.puzzles ? ', and ' + d.puzzles + ' puzzles (counted separately)' : '') + '.</p>';
  h += '<table style="border-collapse:collapse;width:100%"><tr style="background:#f2efe9"><th ' + td + ' align="left">Class</th><th ' + tdn + '>Pupils active</th><th ' + tdn + '>Activities</th><th ' + tdn + '>Before</th><th ' + tdn + '>No practice 14+ days</th><th ' + td + ' align="left">Last activity</th></tr>';
  d.classes.forEach(function (c) {
    var act = Object.keys(c.active).length, quietRow = !c.n;
    h += '<tr' + (quietRow ? ' style="color:#b45309"' : '') + '><td ' + td + '><b>' + esc(c.cls) + '</b></td><td ' + tdn + '>' + act + ' / ' + c.pupils + '</td><td ' + tdn + '>' + c.n + '</td><td ' + tdn + '>' + c.np + '</td><td ' + tdn + '>' + c.quiet + '</td><td ' + td + '>' + (c.last ? f(c.last) : '–') + '</td></tr>';
  });
  h += '</table>';
  var silent = d.classes.filter(function (c) { return !c.n; }).map(function (c) { return c.cls; });
  if (silent.length) h += '<p style="color:#b45309">⚠ No activity at all in: ' + esc(silent.join(', ')) + '.</p>';
  h += '<h3 style="margin:16px 0 4px">Homework</h3>';
  if (!d.hw.length) h += '<p>Nothing open that is overdue or due in the next 7 days. 🎉</p>';
  else h += '<ul>' + d.hw.map(function (x) { return '<li>' + esc(x.cls) + ' · ' + esc(x.unit) + ' – ' + (x.overdue ? '<b style="color:#b91c1c">overdue</b> since ' : 'due ') + esc(x.due) + ': ' + x.open + ' of ' + x.total + ' pupils not finished</li>'; }).join('') + '</ul>';
  h += '<h3 style="margin:16px 0 4px">Other</h3><ul>';
  if (d.unexplained != null) h += '<li>Often-missed questions without a short explanation: <b>' + d.unexplained + '</b>' + (d.unexplained >= 20 ? ' – time to write the next batch (open the Results page, then ask Claude to "write more mistake explanations").' : '.') + '</li>';
  h += '<li>Backup: ' + (d.backupOn ? 'weekly backup is on' : '<b style="color:#b91c1c">weekly backup is OFF</b>') + (d.backup ? ', last copy ' + esc(d.backup) : ', no copy yet') + '.</li>';
  if (d.health && d.health.length) h += '<li>Health check: ' + d.health.map(function (r) { return (r[0] === 'bad' ? '❌ ' : '⚠️ ') + esc(r[1]); }).join('; ') + '</li>';
  else h += '<li>Health check: everything works ✅</li>';
  h += '</ul><p style="color:#777;font-size:12px">Pupil names are never sent by e-mail: open the Today and Results pages for details (' + SITE_BASE + 'today/). This e-mail is sent every Monday; switch it off in the Sheet menu English hub.</p></div>';
  return h;
}

function summaryRecipients_() {
  return String(PropertiesService.getScriptProperties().getProperty('TEACHER_EMAILS') || '').split(/[\s,;]+/).filter(function (e) { return /@/.test(e); });
}

function summarySend_() {
  var to = summaryRecipients_();
  if (!to.length) throw new Error('No teacher e-mail address (script property TEACHER_EMAILS).');
  var d = summaryData_();
  MailApp.sendEmail({ to: to.join(','), subject: 'NoisyClassRoom: weekly summary (' + Utilities.formatDate(new Date(d.w0), TZ, 'd. M.') + ' – ' + Utilities.formatDate(new Date(d.now), TZ, 'd. M.') + ')',
    htmlBody: summaryHtml_(d), name: 'NoisyClassRoom' });
  PropertiesService.getScriptProperties().setProperty('LAST_SUMMARY', String(Date.now()));
  return to.length;
}

function weeklySummary() {                                    // runs from the time trigger
  try { summarySend_(); PropertiesService.getScriptProperties().deleteProperty('LAST_SUMMARY_ERROR'); }
  catch (e) { PropertiesService.getScriptProperties().setProperty('LAST_SUMMARY_ERROR', Utilities.formatDate(new Date(), TZ, 'd. M. yyyy HH:mm') + ': ' + e); }
}

// a dry run: builds the e-mail and writes it to the execution log (nothing is sent)
function summaryLog() {
  var d = summaryData_();
  Logger.log('classes: ' + d.classes.map(function (c) { return c.cls + ' ' + Object.keys(c.active).length + '/' + c.pupils + ' act ' + c.n + ' prev ' + c.np + ' quiet ' + c.quiet; }).join(' | '));
  Logger.log('puzzles ' + d.puzzles + ' | homework ' + JSON.stringify(d.hw) + ' | unexplained ' + d.unexplained + ' | health issues ' + JSON.stringify(d.health) + ' | backup ' + d.backup);
  Logger.log('html length ' + summaryHtml_(d).length);
}

function summaryTrigger_() {
  return ScriptApp.getProjectTriggers().filter(function (t) { return t.getHandlerFunction() === SUMMARY_FN; });
}

function summaryNow() {
  var ui = SpreadsheetApp.getUi();
  try { var n = summarySend_(); ui.alert('Summary sent', 'The summary e-mail was sent to ' + n + ' address(es). Check your inbox (and spam folder).', ui.ButtonSet.OK); }
  catch (e) { ui.alert('The summary did not work', String(e), ui.ButtonSet.OK); }
}

function summarySetup() {
  var ui = SpreadsheetApp.getUi();
  if (summaryTrigger_().length) { ui.alert('The Monday summary is already on', 'An e-mail is sent every Monday at about 07:00. Use "Send the summary e-mail now" to see one.', ui.ButtonSet.OK); return; }
  ScriptApp.newTrigger(SUMMARY_FN).timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(7).create();
  try { var n = summarySend_(); ui.alert('The Monday summary is on', 'A first e-mail was sent now to ' + n + ' address(es). From now on one comes every Monday at about 07:00.', ui.ButtonSet.OK); }
  catch (e) { ui.alert('The Monday summary is on, but the first e-mail did not work', String(e), ui.ButtonSet.OK); }
}

function summaryStop() {
  var ui = SpreadsheetApp.getUi(), ts = summaryTrigger_();
  if (!ts.length) { ui.alert('The Monday summary is not on.'); return; }
  if (ui.alert('Switch the Monday summary e-mail off?', 'You can switch it on again later.', ui.ButtonSet.OK_CANCEL) !== ui.Button.OK) return;
  ts.forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ui.alert('The Monday summary is off.');
}

// ---------------------------------------------------------------- menu

function onOpen() {
  var last = backupLast_();
  SpreadsheetApp.getUi().createMenu('English hub')
    .addItem('Set up analysis tabs', 'setupAnalysis')
    .addItem('Refresh classes from Roster', 'refreshClasses')
    .addItem('Set up the Roster category column (teacher / guest / other)', 'rosterCategorySetup')
    .addItem('Add accounts with results that are not in the Roster...', 'rosterAddUnlisted')
    .addItem('Start new school year (copy Roster)', 'startNewSchoolYear')
    .addItem('End of school year (guided)...', 'endOfYear')
    .addSeparator()
    .addItem('Move earlier school years to Archive...', 'archiveOldYears')
    .addItem('Remove duplicate results (save bug)...', 'removeDuplicateResults')
    .addItem('Delete old results...', 'deleteOldResults')
    .addItem('Delete results of pupils who left...', 'deleteLeavers')
    .addSeparator()
    .addItem('Restore board text from backup...', 'restoreBoardOriginal')
    .addSeparator()
    .addItem('Back up the Sheet to Drive now' + (last ? ' (last: ' + last + ')' : ''), 'backupNow')
    .addItem('Set up weekly backup', 'backupSetup')
    .addItem('Backup status', 'backupStatus')
    .addItem('Switch weekly backup off...', 'backupStop')
    .addSeparator()
    .addItem('Set up the Monday summary e-mail', 'summarySetup')
    .addItem('Send the summary e-mail now', 'summaryNow')
    .addItem('Switch the Monday summary off...', 'summaryStop')
    .addSeparator()
    .addItem('Self-regulation prompts for pupils: on / off...', 'srlSwitch')
    .addSeparator()
    .addItem('Check that everything works', 'healthCheck')
    .addToUi();
}

// After you edit the Roster: put the right class on every result row (Results and Archive).
function refreshClasses() {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { fillDerived_(resultsSheet_()); fillDerived_(archiveSheet_()); } finally { lock.releaseLock(); }
  SpreadsheetApp.getActive().toast('Classes updated from the Roster.', 'English hub', 5);
}

// Keeps "Results" short: moves every result that is not from the current school year to the hidden
// "Archive" tab. Nothing is deleted, and the analysis tabs still count the archived results.
function archiveOldYears() {
  var ui = SpreadsheetApp.getUi();
  var cur = schoolYear_(new Date());
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  var moved = 0;
  try {
    var sh = resultsSheet_(), n = sh.getLastRow() - 1;
    if (n < 1) { ui.alert('There are no results yet.'); return; }
    var range = sh.getRange(2, 1, n, NCOLS), values = range.getValues(), keep = [], move = [];
    values.forEach(function (r) {
      var y = String(r[10]).trim();
      (y && y !== cur ? move : keep).push(r);
    });
    if (!move.length) { ui.alert('Nothing to move: all ' + n + ' results are from ' + cur + '.'); return; }
    var ok = ui.alert('Move ' + move.length + ' results to the Archive?',
      'They are from earlier school years. The ' + keep.length + ' results from ' + cur + ' stay on the Results tab. ' +
      'Nothing is deleted; the analysis tabs still include the archive. The Archive tab is hidden (right-click the tabs > Show hidden sheets).',
      ui.ButtonSet.YES_NO);
    if (ok !== ui.Button.YES) return;
    var arc = archiveSheet_(), start = Math.max(arc.getLastRow(), 1) + 1, need = start + move.length - 1;
    if (need > arc.getMaxRows()) arc.insertRowsAfter(arc.getMaxRows(), need - arc.getMaxRows());
    arc.getRange(start, 1, move.length, NCOLS).setValues(move);
    range.clearContent();
    if (keep.length) sh.getRange(2, 1, keep.length, NCOLS).setValues(keep);
    moved = move.length;
  } finally { lock.releaseLock(); }
  ui.alert('Done. ' + moved + ' results moved to the Archive.');
}

// On 2 Oct 2026 the first collector version failed after saving every result (a typo in releasing the lock),
// so the pupils' pages sent each result up to three times. This finds those extra copies among the results
// saved before DEDUPE_BEFORE: for every group of identical results (same pupil, topic, activity, score) it keeps
// one result per three copies (the earliest ones) and moves the rest to the hidden tab "Duplicates". Nothing is deleted.
var DEDUPE_BEFORE = '2026-10-02T23:59:00+02:00';
function removeDuplicateResults() { dedupe_(''); }

// only = '' for all pupils (or an e-mail prefix, used for testing); auto = no dialogs, no questions (testing)
function dedupe_(only, auto) {
  var ui = auto ? null : SpreadsheetApp.getUi(), ss = SpreadsheetApp.getActive();
  var say = function (m) { if (ui) ui.alert(m); else Logger.log(m); };
  var before = new Date(DEDUPE_BEFORE);
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  var moved = 0;
  try {
    var sh = resultsSheet_(), n = sh.getLastRow() - 1;
    if (n < 1) { say('There are no results yet.'); return; }
    var values = sh.getRange(2, 1, n, NCOLS).getValues(), groups = {};
    values.forEach(function (r, i) {                     // newest first
      if (!(r[0] instanceof Date) || r[0] >= before || r[NCOLS - 1]) return;
      if (only && String(r[1]).indexOf(only) !== 0) return;   // rows with a result id are never copies
      var k = [r[1], r[4], r[5], r[6], r[7], r[8]].join('|');
      (groups[k] = groups[k] || []).push(i);
    });
    var drop = {}, count = 0;
    Object.keys(groups).forEach(function (k) {
      var idx = groups[k], keep = Math.ceil(idx.length / 3);
      idx.slice(0, idx.length - keep).forEach(function (i) { drop[i] = true; count++; });   // the newest copies
    });
    if (!count) { say('No duplicate results found.'); return; }
    var ok = !ui ? 'auto' : ui.alert('Move ' + count + ' duplicate results to the hidden "Duplicates" tab?',
      'The ' + (n - count) + ' other results stay on the Results tab. Identical results of the same pupil are counted in threes ' +
      '(one real result = up to three copies); results saved after ' + Utilities.formatDate(before, TZ, 'dd.MM.yyyy HH:mm') +
      ' are not touched. Nothing is deleted: the copies can be found on the hidden tab.', ui && ui.ButtonSet.YES_NO);
    if (ui && ok !== ui.Button.YES) return;
    var dup = ss.getSheetByName('Duplicates') || ss.insertSheet('Duplicates');
    if (dup.getLastRow() === 0) { dup.appendRow(HEADER); dup.setFrozenRows(1); dup.getRange('K:L').setNumberFormat('@'); }
    var gone = [], keepRows = [];
    values.forEach(function (r, i) { (drop[i] ? gone : keepRows).push(r); });
    var start = dup.getLastRow() + 1;
    if (start + gone.length - 1 > dup.getMaxRows()) dup.insertRowsAfter(dup.getMaxRows(), start + gone.length - dup.getMaxRows());
    dup.getRange(start, 1, gone.length, NCOLS).setValues(gone);
    sh.getRange(2, 1, n, NCOLS).clearContent();
    sh.getRange(2, 1, keepRows.length, NCOLS).setValues(keepRows);
    if (!dup.isSheetHidden()) {
      if (ss.getActiveSheet().getName() === 'Duplicates') ss.setActiveSheet(sh);
      dup.hideSheet();
    }
    moved = gone.length;
  } finally { lock.releaseLock(); }
  say('Done. ' + moved + ' duplicate results moved to the hidden tab "Duplicates".');
}
// ---------------------------------------------------------------- pupils who left the school
// A pupil has "left" when the last school year the Roster lists them in has ended (31 August) and that was more
// than N years ago. Pupils without a school year in the Roster (= every year) and accounts that are not in the Roster
// at all (teachers, anyone missed) are never counted as leavers. The Roster itself is never changed.

function schoolYearEnd_(y) {
  var m = /^(\d{4})-\d{2}$/.exec(String(y).trim());
  return m ? new Date(Number(m[1]) + 1, 7, 31, 23, 59, 59) : null;
}

// when each pupil's last Roster year ended (ms; Infinity = no end), by e-mail and by name
function leaverMaps_() {
  var sh = SpreadsheetApp.getActive().getSheetByName(ROSTER), byEmail = {}, byName = {};
  if (!sh || sh.getLastRow() < 2) return { byEmail: byEmail, byName: byName };
  sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues().forEach(function (r) {
    var email = String(r[0]).trim().toLowerCase(), key = nameKey_(r[3]);
    if (!email && !key) return;
    var end = schoolYearEnd_(r[1]), t = end ? end.getTime() : Infinity;
    if (email) byEmail[email] = Math.max(byEmail[email] || 0, t);
    if (key) byName[key] = Math.max(byName[key] || 0, t);
  });
  return { byEmail: byEmail, byName: byName };
}

// the plan: which rows of Results / Archive / Duplicates belong to pupils who left more than `years` years ago
function findLeavers_(years) {
  var ss = SpreadsheetApp.getActive(), maps = leaverMaps_(), cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - years);
  var plan = { cutoff: cutoff, parts: [], pupils: {}, rows: 0, ids: {} };
  [SHEET, ARCHIVE, 'Duplicates', PSHEET].forEach(function (n) {
    var sh = ss.getSheetByName(n);
    if (!sh || sh.getLastRow() < 2) return;
    var cnt = sh.getLastRow() - 1, values = sh.getRange(2, 1, cnt, NCOLS).getValues(), keep = [], gone = 0;
    values.forEach(function (r) {
      if (!r[1]) { keep.push(r); return; }
      var a = maps.byEmail[String(r[1]).trim().toLowerCase()], b = maps.byName[nameKey_(r[2] + ' ' + r[3])];
      var left = (a == null && b == null) ? null : Math.max(a || 0, b || 0);
      if (left !== null && left < cutoff.getTime()) {
        gone++; plan.rows++;
        if (r[NCOLS - 1]) plan.ids[r[NCOLS - 1]] = 1;
        var k = String(r[1]).toLowerCase(), p = plan.pupils[k] = plan.pupils[k] || { name: r[3] + ' ' + r[2], left: left, n: 0 };
        p.n++;
      } else keep.push(r);
    });
    plan.parts.push({ sh: sh, n: cnt, keep: keep, gone: gone });
  });
  // Homework tab: the names of chosen pupils who left are removed; an assignment given only to leavers is deleted
  // (it is never left with an empty list, because an empty list means the whole class)
  plan.hw = null; plan.hwNames = 0; plan.hwRows = 0; plan.hwPupils = {};
  var hs = ss.getSheetByName(HWSHEET);
  if (hs && hs.getLastRow() > 1) {
    var hn = hs.getLastRow() - 1, hv = hs.getRange(2, 1, hn, HWHEADER.length).getValues(), hkeep = [], changed = false;
    hv.forEach(function (r) {
      var names = String(r[11]).split(';').map(function (s) { return s.trim(); }).filter(String);
      var stay = names.filter(function (nm) { var b = maps.byName[nameKey_(nm)]; return !(b != null && b < cutoff.getTime()); });
      var gone = names.length - stay.length;
      if (!gone) { hkeep.push(r); return; }
      changed = true; plan.hwNames += gone;
      names.forEach(function (nm) { if (stay.indexOf(nm) < 0) plan.hwPupils[nm] = 1; });
      if (!stay.length) { plan.hwRows++; return; }
      r[11] = stay.join('; '); hkeep.push(r);
    });
    if (changed) plan.hw = { sh: hs, n: hn, keep: hkeep };
  }
  // tabs of the self-regulation plan with another layout that hold pupil e-mails: [tab, number of columns, column of the e-mail]
  plan.extra = []; plan.extraRows = 0;
  [[GSHEET, GHEADER.length, 2], [CSHEET, CHEADER.length, 2]].forEach(function (x) {
    var sh = ss.getSheetByName(x[0]); if (!sh || sh.getLastRow() < 2) return;
    var cnt = sh.getLastRow() - 1, vals = sh.getRange(2, 1, cnt, x[1]).getValues(), keep = [], gone = 0;
    vals.forEach(function (r) {
      var a = maps.byEmail[String(r[x[2]]).trim().toLowerCase()];
      if (a != null && a < cutoff.getTime()) { gone++; plan.extraRows++; } else keep.push(r);
    });
    if (gone) plan.extra.push({ sh: sh, n: cnt, width: x[1], keep: keep });
  });
  return plan;
}

function deleteLeavers() { deleteLeavers_(null, false); }

// years = null: ask. auto = true: no dialogs, delete at once (testing only)
function deleteLeavers_(years, auto) {
  var ui = auto ? null : SpreadsheetApp.getUi();
  var say = function (m) { if (ui) ui.alert(m); else Logger.log(m); };
  if (years == null) {
    var ans = ui.prompt('Delete results of pupils who left',
      'Delete the results of pupils who left the school more than how many years ago?\n(whole number from 0 to 20; leave empty for 2)\n' +
      'A pupil has left when the last school year in the Roster has ended. Pupils who are not in the Roster are never deleted.', ui.ButtonSet.OK_CANCEL);
    if (ans.getSelectedButton() !== ui.Button.OK) return;
    var txt = String(ans.getResponseText()).trim();
    years = txt === '' ? 2 : parseInt(txt, 10);
    if (!(years >= 0 && years <= 20) || String(years) !== (txt === '' ? '2' : txt)) { ui.alert('Please enter a whole number between 0 and 20.'); return; }
  }
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  var total = 0, count = 0, hwDone = 0;
  try {
    var plan = findLeavers_(years);
    if (!plan.rows && !plan.hwNames && !plan.extraRows) { say('Nobody left the school more than ' + years + ' year(s) ago (before ' + Utilities.formatDate(plan.cutoff, TZ, 'dd.MM.yyyy') + '), so there is nothing to delete.'); return; }
    var list = Object.keys(plan.pupils).map(function (k) { return plan.pupils[k]; }).sort(function (a, b) { return a.name.localeCompare(b.name, 'sl'); });
    if (ui) {
      var names = list.slice(0, 25).map(function (p) { return p.name + ' (' + p.n + ' results, last year at school ' + schoolYear_(new Date(p.left - 86400000 * 30)) + ')'; }).join('\n');
      var ok = ui.alert('Delete ' + plan.rows + ' results of ' + list.length + ' pupils who left before ' + Utilities.formatDate(plan.cutoff, TZ, 'dd.MM.yyyy') + '?',
        names + (list.length > 25 ? '\n... and ' + (list.length - 25) + ' more' : '') +
        '\n\nThis also removes their rows from the Archive and the hidden Duplicates tab and the question details linked to them. ' +
        (plan.hwNames ? 'Homework: ' + plan.hwNames + ' name(s) of these pupils (' + Object.keys(plan.hwPupils).slice(0, 15).join(', ') + ') are removed from the hidden Homework tab' + (plan.hwRows ? '; ' + plan.hwRows + ' assignment(s) given only to pupils who left are deleted' : '') + '. ' : '') +
        'The Roster is not changed. This cannot be undone here (only via File > Version history).', ui.ButtonSet.YES_NO);
      if (ok !== ui.Button.YES) return;
    }
    plan.parts.forEach(function (p) {
      if (!p.gone) return;
      p.sh.getRange(2, 1, p.n, NCOLS).clearContent();
      if (p.keep.length) p.sh.getRange(2, 1, p.keep.length, NCOLS).setValues(p.keep);
    });
    var q = SpreadsheetApp.getActive().getSheetByName(QSHEET);
    if (q && q.getLastRow() > 1 && Object.keys(plan.ids).length) {
      var qn = q.getLastRow() - 1, qv = q.getRange(2, 1, qn, QHEADER.length).getValues();
      var qkeep = qv.filter(function (r) { return !plan.ids[r[1]]; });
      if (qkeep.length < qn) {
        q.getRange(2, 1, qn, QHEADER.length).clearContent();
        if (qkeep.length) q.getRange(2, 1, qkeep.length, QHEADER.length).setValues(qkeep);
      }
    }
    var rf = SpreadsheetApp.getActive().getSheetByName(RSHEET);      // Reflections: linked to results by the result id only
    if (rf && rf.getLastRow() > 1 && Object.keys(plan.ids).length) {
      var rn = rf.getLastRow() - 1, rv = rf.getRange(2, 1, rn, RHEADER.length).getValues(), rkeep = rv.filter(function (r) { return !plan.ids[String(r[2])]; });
      if (rkeep.length < rn) {
        rf.getRange(2, 1, rn, RHEADER.length).clearContent();
        if (rkeep.length) rf.getRange(2, 1, rkeep.length, RHEADER.length).setValues(rkeep);
      }
    }
    (plan.extra || []).forEach(function (x) {                     // Goals (and later the other self-regulation tabs): the rows of the pupils who left
      x.sh.getRange(2, 1, x.n, x.width).clearContent();
      if (x.keep.length) x.sh.getRange(2, 1, x.keep.length, x.width).setValues(x.keep);
    });
    if (plan.hw) {
      plan.hw.sh.getRange(2, 1, plan.hw.n, HWHEADER.length).clearContent();
      if (plan.hw.keep.length) plan.hw.sh.getRange(2, 1, plan.hw.keep.length, HWHEADER.length).setValues(plan.hw.keep);
    }
    total = plan.rows; count = list.length; hwDone = plan.hwNames;
  } finally { lock.releaseLock(); }
  if (total || hwDone) say('Done. Deleted ' + total + ' results of ' + count + ' pupils' + (hwDone ? ' and removed ' + hwDone + ' name(s) from the Homework tab' : '') + '.');
}
// Removes results older than N years (whole school years are the sensible choice: 1, 2, 3...),
// from Results and Archive. Always asks for confirmation first.
function deleteOldResults() {
  var ui = SpreadsheetApp.getUi();
  var ans = ui.prompt('Delete old results',
    'Delete all results older than how many years? (whole number, e.g. 3)', ui.ButtonSet.OK_CANCEL);
  if (ans.getSelectedButton() !== ui.Button.OK) return;
  var years = parseInt(ans.getResponseText(), 10);
  if (!(years >= 1 && years <= 20)) { ui.alert('Please enter a whole number between 1 and 20.'); return; }

  var cutoff = new Date(); cutoff.setFullYear(cutoff.getFullYear() - years);
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  var gone = 0;
  try {
    var parts = [resultsSheet_(), archiveSheet_()].map(function (sh) {
      var n = sh.getLastRow() - 1;
      if (n < 1) return { sh: sh, n: 0, keep: [] };
      var values = sh.getRange(2, 1, n, NCOLS).getValues();
      return { sh: sh, n: n, keep: values.filter(function (r) { return !(r[0] instanceof Date) || r[0] >= cutoff; }) };
    });
    var total = 0;
    parts.forEach(function (p) { total += p.n; gone += p.n - p.keep.length; });
    if (!total) { ui.alert('There are no results yet.'); return; }
    if (!gone) { ui.alert('Nothing is older than ' + years + ' year(s).'); return; }
    var ok = ui.alert('Delete ' + gone + ' of ' + total + ' results older than ' +
      Utilities.formatDate(cutoff, TZ, 'dd.MM.yyyy') + '?', 'This cannot be undone here (only via File > Version history).',
      ui.ButtonSet.YES_NO);
    if (ok !== ui.Button.YES) { gone = 0; return; }
    parts.forEach(function (p) {
      if (p.n === p.keep.length) return;
      p.sh.getRange(2, 1, p.n, NCOLS).clearContent();
      if (p.keep.length) p.sh.getRange(2, 1, p.keep.length, NCOLS).setValues(p.keep);
    });
  } finally { lock.releaseLock(); }
  if (gone) ui.alert('Done. Deleted ' + gone + ' results.');
}
// September: copies the newest school year of the Roster to the next one, moving every class up a grade
// (7.A -> 8.A). Pupils who finished the 9th grade are not copied. Existing rows are never changed.
function startNewSchoolYear() {
  var ui = SpreadsheetApp.getUi();
  var sh = rosterSheet_();
  var data = sh.getRange(2, 1, sh.getMaxRows() - 1, 4).getValues();
  var last = -1, src = '';
  data.forEach(function (r, i) {
    if (r[0] !== '' || r[1] !== '' || r[2] !== '' || r[3] !== '') last = i;
    var y = String(r[1]).trim();
    if (/^\d{4}-\d{2}$/.test(y) && y > src) src = y;
  });
  if (!src) { ui.alert('The Roster has no rows with a school year like 2026-27.'); return; }
  var start = Number(src.slice(0, 4)), next = (start + 1) + '-' + String(start + 2).slice(2);
  if (data.some(function (r) { return String(r[1]).trim() === next; })) {
    ui.alert('The Roster already has rows for ' + next + '. Nothing was copied.');
    return;
  }

  var out = [], finished = 0, check = [];
  data.forEach(function (r) {
    if (String(r[1]).trim() !== src) return;
    var m = /^\s*(\d+)(.*)$/.exec(String(r[2]));
    if (!m) { out.push([r[0], next, r[2], r[3]]); check.push(out.length - 1); return; }   // class not like "7.A": copy, mark
    var grade = Number(m[1]) + 1;
    if (grade > 9) { finished++; return; }
    out.push([r[0], next, grade + m[2], r[3]]);
  });
  if (!out.length) { ui.alert('There is nobody to copy from ' + src + '.'); return; }

  var ok = ui.alert('Start school year ' + next,
    'Copy ' + out.length + ' pupils from ' + src + ' to ' + next + ', each one class up (7.A becomes 8.A)?\n' +
    finished + ' pupils finished the 9th grade and are not copied.', ui.ButtonSet.YES_NO);
  if (ok !== ui.Button.YES) return;

  var first = last + 3;                                 // first empty sheet row below the data
  var need = first + out.length - 1;
  if (need > sh.getMaxRows()) sh.insertRowsAfter(sh.getMaxRows(), need - sh.getMaxRows());
  sh.getRange(first, 1, out.length, 4).setNumberFormat('@').setValues(out);
  check.forEach(function (i) { sh.getRange(first + i, 3).setBackground('#fff2b3'); });

  ui.alert('Done: ' + out.length + ' pupils copied to ' + next + '.',
    'Now:\n1. Add the new pupils (usually the new 6th grade) and remove pupils who left the school.\n' +
    '2. Pupils who repeat a year: change their class in the ' + next + ' rows.\n' +
    (check.length ? '3. Yellow classes could not be moved up automatically: please fix them.\n' : '') +
    'Last: menu English hub > Refresh classes from Roster.', ui.ButtonSet.OK);
}

// ---------------------------------------------------------------- end of school year (guided)
// One menu item that knows which step comes next. Two stages, because the Roster has to be edited by hand in between:
//   stage 1 "prepare" (June-August, or any time before 1 September): backup, copy the Roster one grade up (startNewSchoolYear),
//           then you add the new 6th graders, remove pupils who left, fix repeaters;
//   stage 2 "finish" (on or after 1 September, when results of the new school year have a new year): backup, refresh the classes,
//           move last year's results to the Archive, offer the leavers cleanup, old homework and last year's "where we stopped"
//           bookmarks, then the health check. Every step that deletes something asks first.
function rosterNewestYear_() {
  var ro = SpreadsheetApp.getActive().getSheetByName(ROSTER), newest = '';
  if (ro && ro.getLastRow() > 1) ro.getRange(2, 2, ro.getLastRow() - 1, 1).getValues().forEach(function (r) {
    var y = String(r[0]).trim(); if (/^\d{4}-\d{2}$/.test(y) && y > newest) newest = y;
  });
  return newest;
}

// which step comes next: noroster | ready (Roster of the next year exists, wait for 1 September) | running (nothing from earlier years) |
// prepare (the new year has started but the Roster was not copied yet) | finish (new year, old results still on Results)
function endOfYearState_() {
  var cur = schoolYear_(new Date()), newest = rosterNewestYear_(), rs = SpreadsheetApp.getActive().getSheetByName(SHEET), old = 0, stage;
  if (rs && rs.getLastRow() > 1) rs.getRange(2, 11, rs.getLastRow() - 1, 1).getValues().forEach(function (r) { var y = String(r[0]).trim(); if (y && y !== cur) old++; });
  stage = !newest ? 'noroster' : newest > cur ? 'ready' : newest < cur ? 'prepare' : old === 0 ? 'running' : 'finish';
  return { cur: cur, newest: newest, old: old, stage: stage };
}

// for testing (Extensions > Apps Script > run endOfYearLog): shows which step would come next and what step 2 would offer; changes nothing
function endOfYearLog() {
  var s = endOfYearState_(), ss = SpreadsheetApp.getActive(), hs = ss.getSheetByName(HWSHEET), ms = ss.getSheetByName(MARKSSHEET), hw = 0, stops = 0;
  if (hs && hs.getLastRow() > 1) hs.getRange(2, 13, hs.getLastRow() - 1, 1).getValues().forEach(function (r) { var y = String(r[0]).trim(); if (y && y !== s.cur) hw++; });
  if (ms && ms.getLastRow() > 1) ms.getRange(2, 1, ms.getLastRow() - 1, 1).getValues().forEach(function (r) { if (String(r[0]) === 'stop') stops++; });
  Logger.log(JSON.stringify(s) + ' | homework of earlier years: ' + hw + ' | "where we stopped" bookmarks: ' + stops);
}

function endOfYear() {
  var ui = SpreadsheetApp.getUi(), s = endOfYearState_();
  if (s.stage === 'noroster') { ui.alert('The Roster has no rows with a school year like 2026-27, so there is nothing to carry over. Fill in the Roster first.'); return; }
  if (s.stage === 'ready') {
    ui.alert('The Roster for ' + s.newest + ' is ready', 'Check it (new 6th graders, pupils who left, pupils who repeat a year).\n\nOn or after 1 September choose "End of school year (guided)..." again to finish: it updates the classes, moves last year\'s results to the Archive and tidies up.', ui.ButtonSet.OK);
    return;
  }
  if (s.stage === 'running') {
    if (ui.alert('End of school year', 'School year ' + s.cur + ' is running and there are no results from earlier years.\n\nPrepare the next school year now (backup, then copy the Roster one grade up)?', ui.ButtonSet.YES_NO) !== ui.Button.YES) return;
    endOfYearPrepare_(ui, s.newest); return;
  }
  if (s.stage === 'prepare') { endOfYearPrepare_(ui, s.newest); return; }         // the new year has started but the Roster was not copied yet
  endOfYearFinish_(ui, s.cur, s.old);
}

function endOfYearBackup_(ui) {
  try { var r = doBackup_(); SpreadsheetApp.getActive().toast('Backup done: ' + r.name, 'English hub', 6); return true; }
  catch (e) { return ui.alert('The backup did not work', String(e) + '\n\nContinue WITHOUT a backup?', ui.ButtonSet.YES_NO) === ui.Button.YES; }
}

function endOfYearPrepare_(ui, before) {
  if (!endOfYearBackup_(ui)) return;
  startNewSchoolYear();                                                          // shows its own questions
  var after = rosterNewestYear_();
  if (after === before) return;                                                  // cancelled or nothing copied
  ui.alert('Step 1 of 2 is done: the Roster for ' + after + ' exists',
    'Now edit it by hand:\n- add the new pupils (the new 6th grade),\n- remove pupils who left the school,\n- change the class of pupils who repeat a year,\n- fix yellow classes.\n\n' +
    'On or after 1 September choose "End of school year (guided)..." again for step 2.', ui.ButtonSet.OK);
}

function endOfYearFinish_(ui, cur, old) {
  var ss = SpreadsheetApp.getActive();
  if (ui.alert('End of school year - step 2 of 2', 'A new school year (' + cur + ') has started: ' + old + ' results from earlier years are still on the Results tab.\n\n' +
    'This will, one after the other (each deleting step asks first):\n1. make a backup copy,\n2. put the right class on every result (Refresh classes from Roster),\n3. move last year\'s results to the Archive,\n4. offer to delete results of pupils who left more than 2 years ago,\n5. offer to delete homework of earlier years,\n6. offer to clear last year\'s "where we stopped" bookmarks on the Board,\n7. run the health check.\n\nContinue?', ui.ButtonSet.YES_NO) !== ui.Button.YES) return;
  if (!endOfYearBackup_(ui)) return;
  refreshClasses();
  archiveOldYears();                                                             // asks before it moves anything
  if (ui.alert('Pupils who left', 'Delete the results of pupils who left the school more than 2 years ago (retention rule)?\nYou will see the names and numbers first and can still say no.', ui.ButtonSet.YES_NO) === ui.Button.YES) deleteLeavers();
  // homework of earlier years: assignments with pupil names, no longer shown anywhere
  var hs = ss.getSheetByName(HWSHEET);
  if (hs && hs.getLastRow() > 1) {
    var hv = hs.getRange(2, 1, hs.getLastRow() - 1, HWHEADER.length).getValues(), keep = hv.filter(function (r) { var y = String(r[12]).trim(); return !y || y === cur; }), gone = hv.length - keep.length;
    if (gone && ui.alert('Homework of earlier years', gone + ' homework assignment(s) from earlier school years are still stored (with the names of chosen pupils). Pupils and you no longer see them.\n\nDelete them now? (Results are not affected.)', ui.ButtonSet.YES_NO) === ui.Button.YES) {
      var lock = LockService.getScriptLock(); lock.waitLock(20000);
      try {
        hs.getRange(2, 1, hv.length, HWHEADER.length).clearContent();
        if (keep.length) hs.getRange(2, 1, keep.length, HWHEADER.length).setValues(keep);
      } finally { lock.releaseLock(); }
    }
  }
  // "where we stopped" bookmarks refer to last year's classes
  var ms = ss.getSheetByName(MARKSSHEET);
  if (ms && ms.getLastRow() > 1) {
    var mv = ms.getRange(2, 1, ms.getLastRow() - 1, 1).getValues(), stops = mv.filter(function (r) { return String(r[0]) === 'stop'; }).length;
    if (stops && ui.alert('Board bookmarks', stops + ' "where we stopped" bookmark(s) on the Board belong to last year\'s classes (the classes moved up a grade).\n\nClear them? (Pinned exercises stay.)', ui.ButtonSet.YES_NO) === ui.Button.YES) {
      var lock2 = LockService.getScriptLock(); lock2.waitLock(20000);
      try { for (var i = mv.length - 1; i >= 0; i--) if (String(mv[i][0]) === 'stop') ms.deleteRow(i + 2); } finally { lock2.releaseLock(); }
    }
  }
  ui.alert('The school year is set up', 'The health check follows. Pupils do not need to do anything: they sign in as before and see their new class (from the Roster).\n\nStill to do by hand if needed: the TEACHER_EMAILS setting when teachers change.', ui.ButtonSet.OK);
  healthCheck();
}

// ---------------------------------------------------------------- analysis tabs

/**
 * Builds the Roster tab (only if missing) and the live overview tabs from "Results" + "Archive".
 * Safe to run again: the overview tabs are rebuilt, the Roster is never touched.
 * Each overview tab has four selectors in row 1: school year, class (from the Roster), coursebook, level.
 * Columns of the data (for the Col numbers below): 1 Time, 2 Email, 3 First, 4 Last, 5 Book id, 6 Topic,
 * 7 Activity, 8 Score, 9 Total, 10 Percent, 11 School year, 12 Class, 13 Book, 14 Unit, 15 Level (number),
 * 16 Unit title, 17 Level name, 18 Hard (1/0).
 */
function setupAnalysis() {
  resultsSheet_();
  archiveSheet_();
  rosterSheet_();
  var DATA = '{' + SHEET + '!$A$1:$S;' + ARCHIVE + '!$A$2:$S}';
  // WHERE part, driven by the selectors in B1 (school year), D1 (class), F1 (coursebook), H1 (level)
  var where = '"where Col2 is not null"' +
    '&IF($B$1="All",""," and Col11 = \'"&$B$1&"\'")' +
    '&IF($D$1="All",""," and Col12 = \'"&$D$1&"\'")' +
    '&IF($F$1="All",""," and Col5 = \'"&$F$1&"\'")' +
    '&IF($H$1="All",""," and Col17 = \'"&$H$1&"\'")&" ';
  var Q = function (select, rest) { return '=IFERROR(QUERY(' + DATA + ',"select ' + select + ' ' + where.slice(1) + rest + '",1),"No results yet")'; };
  var pupil = "Col4 'Last name', Col3 'First name', Col12 'Class'";

  // 0) teacher summary: one row per pupil, one column per unit (book included), best result in each cell
  build_('Summary', 'Best result of each pupil in each unit (best of all activities and attempts). Columns are sorted by book and unit; use the Book selector to see one book. Red = below 60 %, green = 90 % or more, empty = not practised yet.',
    Q('Col4,Col3,Col12,max(Col10)', "group by Col4,Col3,Col12 pivot Col16 order by Col4,Col3 label " + pupil), {}, 0);
  finishSummary_();

  // 1) one row per student and school year: how much (attempts, questions) and how hard (average level, hard tests)
  build_('Students', 'Every student and school year: Attempts = finished activities, Questions = questions answered, Average = average result, Avg difficulty = average level (1 easy, 2 medium, 3 hard), Hard tests = finished "Unit test 2". Red = average below 60 %.',
    Q('Col2,Col3,Col4,Col11,Col12,count(Col10),sum(Col9),avg(Col10),avg(Col15),sum(Col18),max(Col1)',
      "group by Col2,Col3,Col4,Col11,Col12 order by Col4,Col3,Col11 label Col2 'Email', Col3 'First name', Col4 'Last name', Col11 'School year', Col12 'Class', count(Col10) 'Attempts', sum(Col9) 'Questions', avg(Col10) 'Average', avg(Col15) 'Avg difficulty (1-3)', sum(Col18) 'Hard tests', max(Col1) 'Last practised'"),
    { 6: '0', 7: '0', 8: '0%', 9: '0.0', 10: '0', 11: 'dd.mm.yyyy hh:mm' }, 8);

  // 2) difficulty: how many activities of each level, and how well (two blocks side by side)
  build_('Difficulty', 'Left: how many activities each pupil finished at each level (1 Easy = Match and Quiz, 2 Medium = Fill the gap and Unit test, 3 Hard = Unit test 2). Right: the average result at each level.',
    Q('Col4,Col3,Col12,count(Col10)', "group by Col4,Col3,Col12 pivot Col17 order by Col4,Col3 label " + pupil), { 4: '0', 5: '0', 6: '0' }, 0);
  blockOf_('Difficulty', 'H3', Q('Col4,Col3,Col12,avg(Col10)', "group by Col4,Col3,Col12 pivot Col17 order by Col4,Col3 label " + pupil), 11, 3);

  // 3) by book: pupils may practise units from books of other grades
  build_('By book', 'Left: number of finished activities per pupil and coursebook. Right: the average result in each book.',
    Q('Col4,Col3,Col12,count(Col10)', "group by Col4,Col3,Col12 pivot Col13 order by Col4,Col3 label " + pupil), {}, 0);
  blockOf_('By book', 'N3', Q('Col4,Col3,Col12,avg(Col10)', "group by Col4,Col3,Col12 pivot Col13 order by Col4,Col3 label " + pupil), 17, 8);
  numberFormat_('By book', 4, 8, '0');

  // 4) best score per student, unit and activity
  build_('Best scores', 'Best result of each student in each unit and activity.',
    Q('Col2,Col3,Col4,Col11,Col12,Col16,Col7,max(Col10),count(Col10)',
      "group by Col2,Col3,Col4,Col11,Col12,Col16,Col7 order by Col4,Col3,Col11,Col16,Col7 label Col2 'Email', Col3 'First name', Col4 'Last name', Col11 'School year', Col12 'Class', Col16 'Unit', Col7 'Activity', max(Col10) 'Best', count(Col10) 'Attempts'"),
    { 8: '0%', 9: '0' }, 8);

  // 5) units / activities - where the class struggles
  build_('Topics', 'Which units and activities are hard: a low average = needs more practice.',
    Q('Col16,Col7,count(Col10),sum(Col9),avg(Col10)',
      "group by Col16,Col7 order by Col16,Col7 label Col16 'Unit', Col7 'Activity', count(Col10) 'Attempts', sum(Col9) 'Questions', avg(Col10) 'Average'"),
    { 3: '0', 4: '0', 5: '0%' }, 5);

  // 6) activity over time
  build_('By day', 'How much practice happened each day.',
    Q('todate(Col1),count(Col10),sum(Col9),avg(Col10)',
      "group by todate(Col1) order by todate(Col1) desc label todate(Col1) 'Day', count(Col10) 'Attempts', sum(Col9) 'Questions', avg(Col10) 'Average'"),
    { 1: 'dd.mm.yyyy', 2: '0', 3: '0', 4: '0%' }, 4);

  var ss = SpreadsheetApp.getActive();
  ss.setActiveSheet(ss.getSheetByName('Summary'));
  archiveSheet_();                                      // keeps the Archive hidden after the tabs were rebuilt
  SpreadsheetApp.getActive().toast('Analysis tabs are ready.', 'English hub', 5);
}

// A second table on the same tab: formula in `cell`, number-format 0% for `nCols` columns from column `firstCol`.
function blockOf_(name, cell, formula, firstCol, nCols) {
  var sh = SpreadsheetApp.getActive().getSheetByName(name);
  sh.getRange(cell).setFormula(formula);
  sh.getRange(cell).offset(0, 0, 1, firstCol).setFontWeight('bold').setBackground('#f1efe8');
  sh.setColumnWidths(sh.getRange(cell).getColumn(), 3, 100);
  var col = sh.getRange(4, firstCol, sh.getMaxRows() - 3, nCols);
  col.setNumberFormat('0%').setHorizontalAlignment('center');
  sh.setConditionalFormatRules(sh.getConditionalFormatRules().concat([
    SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(0.6).setBackground('#fde4e4').setRanges([col]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(0.9).setBackground('#dcf5e6').setRanges([col]).build()
  ]));
}

function numberFormat_(name, firstCol, nCols, fmt) {
  var sh = SpreadsheetApp.getActive().getSheetByName(name);
  sh.getRange(4, firstCol, sh.getMaxRows() - 3, nCols).setNumberFormat(fmt).setHorizontalAlignment('center');
}
// The Summary is a matrix whose width depends on the data: make room, colour every topic column, put the tab first.
function finishSummary_() {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName('Summary');
  if (sh.getMaxColumns() < 80) sh.insertColumnsAfter(sh.getMaxColumns(), 80 - sh.getMaxColumns());
  var body = sh.getRange(4, 4, sh.getMaxRows() - 3, sh.getMaxColumns() - 3);
  body.setNumberFormat('0%').setHorizontalAlignment('center');
  sh.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(0.6).setBackground('#fde4e4').setRanges([body]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(0.9).setBackground('#dcf5e6').setRanges([body]).build()
  ]);
  sh.getRange(3, 4, 1, sh.getMaxColumns() - 3).setWrap(true).setHorizontalAlignment('center').setVerticalAlignment('middle');
  sh.setColumnWidths(4, sh.getMaxColumns() - 3, 90);
  sh.setFrozenColumns(3);
  ss.setActiveSheet(sh);
  ss.moveActiveSheet(1);
}

// The Roster: created once, never overwritten.
function rosterSheet_() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(ROSTER);
  if (sh) return sh;
  sh = ss.insertSheet(ROSTER);
  sh.getRange('A1:D1').setValues([['Email (optional)', 'School year', 'Class', 'Name (as in eAsistent)']]).setFontWeight('bold');
  sh.getRange('B:D').setNumberFormat('@');
  sh.getRange('E1').setValue('Class list (automatic)').setFontWeight('bold');
  sh.getRange('F1').setValue('Display name (optional)').setFontWeight('bold');
  sh.getRange('H1').setValue('Category (teacher / guest / other, only for people WITHOUT a class)').setFontWeight('bold');
  sh.getRange('E2').setFormula('={"All";IFERROR(SORT(UNIQUE(FILTER(C2:C,C2:C<>""))),"")}');
  sh.getRange('G1').setValue('How to use').setFontWeight('bold');
  sh.getRange('G2').setValue('One row per pupil and school year. Fill the Email and/or the Name (surname and first name as in eAsistent, any order); School year like 2026-27 (blank = every year); Class e.g. 7.B');
  sh.getRange('G3').setValue('Every September: add the new rows (or copy the old ones and change the year and class).');
  sh.getRange('G4').setValue('After editing: menu English hub > Refresh classes from Roster.');
  sh.getRange('G5').setValue('Keep this Sheet private. Do not copy this tab into the public repository.');
  sh.getRange('G6').setValue('Display name (column F): only if the Classroom Tools show a name in the wrong order; write it as Firstname Surname.');
  sh.setFrozenRows(1);
  sh.setColumnWidth(1, 260);
  return sh;
}

// One-time set-up of the "Category" column (H) in the Roster: a header, a drop-down (teacher / guest / other) and a short note.
// Use it for accounts WITHOUT a class: type the e-mail (or the name), leave School year and Class empty, choose the category in column H.
// Results then shows them under Accounts > Teachers / Guests / Other instead of "no class"; they are left out of the class numbers.
function rosterCategorySetup() {
  var sh = rosterSheet_();
  sh.getRange('H1').setValue('Category (teacher / guest / other, only for people WITHOUT a class)').setFontWeight('bold');
  sh.getRange('H2:H500').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['teacher', 'guest', 'other'], true).setAllowInvalid(false).build());
  sh.getRange('G7').setValue('Accounts WITHOUT a class (teachers, guests, former pupils): one row with the E-mail, leave School year and Class empty, choose teacher / guest / other in column H. They are shown separately in Results and are not part of the class numbers.');
  sh.setColumnWidth(8, 150);
  SpreadsheetApp.getUi().alert('Done. In the Roster, column H is now the Category column (drop-down: teacher / guest / other). For an account without a class add a row with the e-mail, leave School year and Class empty and choose the category in column H. Then reload the Results page.');
}

// Adds the accounts that have results this school year but are NOT in the Roster (no class, no category) as new Roster rows:
// e-mail and name filled in, School year / Class empty, Category pre-filled "teacher" for the addresses in TEACHER_EMAILS, otherwise empty
// for you to choose (teacher / guest / other) or to type the class of a pupil. Asks first; adds rows only, never changes or deletes anything.
function rosterAddUnlisted() {
  var ui = SpreadsheetApp.getUi(), ss = SpreadsheetApp.getActive(), rs = ss.getSheetByName(SHEET);
  if (!rs || rs.getLastRow() < 2) { ui.alert('No results yet.'); return; }
  rosterCategorySetupQuiet_();
  var ro = rosterSheet_(), year = schoolYear_(new Date()), cats = rosterCats_();
  var teachers = String(PropertiesService.getScriptProperties().getProperty('TEACHER_EMAILS') || '').toLowerCase().split(/[\s,;]+/).filter(String);
  var listed = {}; if (ro.getLastRow() > 1) ro.getRange(2, 1, ro.getLastRow() - 1, 1).getValues().forEach(function (r) { var e = String(r[0]).trim().toLowerCase(); if (e) listed[e] = 1; });
  var found = {};
  rs.getRange(2, 1, rs.getLastRow() - 1, NCOLS).getValues().forEach(function (r) {
    var e = String(r[1]).toLowerCase();
    if (!(r[0] instanceof Date) || String(r[10]) !== year || String(r[11]).trim() || !e || listed[e] || catFor_(cats, r[1], r[2], r[3])) return;
    found[e] = (String(r[3] || '') + ' ' + String(r[2] || '')).trim();
  });
  var list = Object.keys(found);
  if (!list.length) { ui.alert('Every account with results this school year is already in the Roster (with a class or a category).'); return; }
  var msg = list.length + ' account(s) have results but are not in the Roster:\n\n' + list.slice(0, 15).map(function (e) { return found[e] + '  <' + e + '>'; }).join('\n') + (list.length > 15 ? '\n...' : '') +
    '\n\nAdd them as new rows at the end of the Roster? (School year and Class stay empty; the Category is set to "teacher" for the teacher addresses and left empty for the others, so you choose teacher / guest / other, or type the class of a pupil.)';
  if (ui.alert('Add unlisted accounts to the Roster', msg, ui.ButtonSet.YES_NO) !== ui.Button.YES) return;
  var start = ro.getLastRow() + 1;
  var rows = list.map(function (e) { return [e, '', '', found[e], '', '', '', teachers.indexOf(e) >= 0 ? 'teacher' : '']; });
  ro.getRange(start, 2, rows.length, 3).setNumberFormat('@');
  ro.getRange(start, 1, rows.length, 8).setValues(rows);
  ui.alert('Added ' + rows.length + ' row(s) at the end of the Roster (from row ' + start + '). Choose the category in column H (or type the school year and class for a pupil), then reload the Results page.');
}
function rosterCategorySetupQuiet_() {
  var sh = rosterSheet_();
  if (!String(sh.getRange('H1').getValue()).trim()) sh.getRange('H1').setValue('Category (teacher / guest / other, only for people WITHOUT a class)').setFontWeight('bold');
  sh.getRange('H2:H500').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['teacher', 'guest', 'other'], true).setAllowInvalid(false).build());
}

// A school year label list for the selector: "All" plus this year and the five before.
function yearList_() {
  var cur = schoolYear_(new Date()), start = Number(cur.slice(0, 4)), list = ['All'];
  for (var i = 0; i < 6; i++) list.push((start - i) + '-' + String(start - i + 1).slice(2));
  return list;
}

// Creates/rebuilds one tab: selectors in row 1, note in row 2, table from A3.
function build_(name, note, formula, formats, pctCol) {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  sh.clear();
  sh.getRange(1, 1, sh.getMaxRows(), sh.getMaxColumns()).clearFormat().clearDataValidations();   // clear() keeps old number formats
  var labels = [['A1', 'School year:'], ['C1', 'Class:'], ['E1', 'Book:'], ['G1', 'Level:']];
  labels.forEach(function (l) { sh.getRange(l[0]).setValue(l[1]).setFontWeight('bold').setHorizontalAlignment('right'); });
  var pick = function (cell, rule) {
    sh.getRange(cell).setNumberFormat('@').setValue('All').setDataValidation(rule)
      .setBackground('#e6eefc').setFontWeight('bold');
  };
  pick('B1', SpreadsheetApp.newDataValidation().requireValueInList(yearList_(), true).build());
  pick('D1', SpreadsheetApp.newDataValidation()
    .requireValueInRange(ss.getSheetByName(ROSTER).getRange('E2:E100'), true).setAllowInvalid(false).build());
  pick('F1', SpreadsheetApp.newDataValidation().requireValueInList(BOOK_IDS, true).build());
  pick('H1', SpreadsheetApp.newDataValidation().requireValueInList(LEVEL_LIST, true).build());
  sh.getRange('A3').setFormula(formula);
  sh.setFrozenRows(3);
  sh.getRange('A3:Z3').setFontWeight('bold').setBackground('#f1efe8');
  var rows = sh.getMaxRows() - 3;
  Object.keys(formats).forEach(function (c) { sh.getRange(4, Number(c), rows, 1).setNumberFormat(formats[c]); });
  // colour the percentage column: red < 60 %, green >= 90 % (pctCol 0 = none)
  if (pctCol) {
    var col = sh.getRange(4, pctCol, rows, 1);
    sh.setConditionalFormatRules([
      SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(0.6).setBackground('#fde4e4').setRanges([col]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(0.9).setBackground('#dcf5e6').setRanges([col]).build()
    ]);
  }
  sh.autoResizeColumns(1, 12);
  sh.getRange('A2').setValue(note).setFontColor('#6b7280');   // after resizing, so a long note does not widen column A
}
