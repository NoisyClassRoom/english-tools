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

// ---------------------------------------------------------------- saving results

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.action === 'roster') return rosterReply_(d);       // teacher-only, used by the Classroom Tools page
    if (d.action === 'stats') return statsReply_(d);         // teacher-only, used by the Results page
    if (d.action === 'qstats') return qstatsReply_(d);       // teacher-only: question-level statistics
    if (d.action === 'homework') return homeworkReply_(d);   // a pupil: own open homework
    if (d.action === 'hwlist') return hwListReply_(d);       // teacher-only: assignments with every pupil's progress
    if (d.action === 'hwsave') return hwSaveReply_(d);       // teacher-only: new assignment
    if (d.action === 'hwdelete') return hwDeleteReply_(d);   // teacher-only: remove an assignment
    var who = verify_(d.token);
    if (!who) return out_({ ok: false, error: 'token' });

    var score = Number(d.score), total = Number(d.total);
    if (!isFinite(score) || !isFinite(total) || total <= 0 || total > 100 || score < 0 || score > total) {
      return out_({ ok: false, error: 'data' });
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var sh = resultsSheet_();
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
  var rows = sh.getRange(2, 1, sh.getLastRow() - 1, 6).getValues(), year = '';
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

// ---------------------------------------------------------------- homework
// Tab "Homework": one row per assignment. Class = Roster class (teaching group); Pupils blank = the whole class,
// otherwise the chosen Roster names separated by ";". An activity counts as done when the pupil saved a result for
// that book + topic + activity after the assignment was created (best attempt; at least Min % when set).
var HWSHEET = 'Homework';
var HWHEADER = ['Id', 'Created', 'Class', 'Book', 'Set', 'Topic', 'Unit', 'Activities', 'Min %', 'Due', 'Note', 'Pupils', 'School year', 'Deleted'];
var HW_ACTS = { match: 'Match', quiz: 'Quiz', gap: 'Fill the gap', test: 'Unit test', test2: 'Unit test 2' };

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
  var sh = SpreadsheetApp.getActive().getSheetByName(SHEET);
  if (!sh || sh.getLastRow() < 2) return [];
  var out = [];
  sh.getRange(2, 1, sh.getLastRow() - 1, 9).getValues().forEach(function (r) {
    if (r[0] instanceof Date && r[8] > 0) out.push({ t: r[0].getTime(), email: String(r[1]).toLowerCase(), nk: null, first: r[2], last: r[3],
      book: String(r[4]), topic: String(r[5]), act: String(r[6]), p: r[7] / r[8] });
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
    rs.getRange(2, 1, rs.getLastRow() - 1, 4).getValues().forEach(function (r) {
      var y = String(r[1]).trim(), cls = String(r[2]).trim(), name = String(r[3]).trim(), email = String(r[0]).trim().toLowerCase();
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
    var sh = hwSheet_(), now = new Date(), id = 'hw' + Utilities.formatDate(now, TZ, 'yyMMddHHmmss') + Math.floor(Math.random() * 90 + 10);
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

// All results (Results + Archive) and the Roster with activity counts, for the private Results page. Teacher only.
// rows:   [time ms, last name, first name, class, book id, unit title, activity, level 1-3, score, total, school year]
// roster: [school year, class, name, attempts that year, last time ms (0 = never)]
function statsReply_(d) {
  var who = verify_(d.token);
  if (!who || !isTeacher_(who.email)) return out_({ ok: false, error: 'token' });
  var ss = SpreadsheetApp.getActive(), rows = [], byEmail = {}, byName = {};
  [SHEET, ARCHIVE].forEach(function (n) {
    var sh = ss.getSheetByName(n);
    if (!sh || sh.getLastRow() < 2) return;
    sh.getRange(2, 1, sh.getLastRow() - 1, 18).getValues().forEach(function (r) {
      if (!(r[0] instanceof Date) || !r[1]) return;
      var t = r[0].getTime(), y = String(r[10]);
      rows.push([t, r[3], r[2], r[11], r[4], r[15], r[6], r[14], r[7], r[8], y]);
      [[byEmail, y + '|' + String(r[1]).toLowerCase()], [byName, y + '|' + nameKey_(r[2] + ' ' + r[3])]].forEach(function (p) {
        var o = p[0][p[1]] = p[0][p[1]] || { n: 0, t: 0 };
        o.n++; if (t > o.t) o.t = t;
      });
    });
  });
  var roster = [], rs = ss.getSheetByName(ROSTER);
  if (rs && rs.getLastRow() > 1) {
    rs.getRange(2, 1, rs.getLastRow() - 1, 4).getValues().forEach(function (r) {
      var email = String(r[0]).trim().toLowerCase(), y = String(r[1]).trim(), cls = String(r[2]).trim(), name = String(r[3]).trim();
      if (!/^\d{4}-\d{2}$/.test(y) || !cls || !(email || name)) return;
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
  return sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues().map(function (r) {
    return { email: String(r[0]).trim().toLowerCase(), year: String(r[1]).trim(), cls: String(r[2]).trim(),
             name: nameKey_(r[3]) };
  }).filter(function (r) { return (r.email || r.name) && r.cls; });
}

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
  var r = UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(token),
                            { muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) return null;
  var t = JSON.parse(r.getContentText());
  if (t.aud !== CLIENT_ID) return null;
  if (t.iss !== 'https://accounts.google.com' && t.iss !== 'accounts.google.com') return null;
  if (Number(t.exp) * 1000 < Date.now()) return null;
  if (String(t.email_verified) !== 'true') return null;
  if (ALLOWED_DOMAIN && t.hd !== ALLOWED_DOMAIN) return null;
  return { email: t.email, first: t.given_name || '', last: t.family_name || '' };
}

// Trim, cap the length, and stop spreadsheet formulas ("=...", "+...") from running.
function text_(v) {
  var s = String(v == null ? '' : v).slice(0, 80);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// ---------------------------------------------------------------- menu

function onOpen() {
  SpreadsheetApp.getUi().createMenu('English hub')
    .addItem('Set up analysis tabs', 'setupAnalysis')
    .addItem('Refresh classes from Roster', 'refreshClasses')
    .addItem('Start new school year (copy Roster)', 'startNewSchoolYear')
    .addSeparator()
    .addItem('Move earlier school years to Archive...', 'archiveOldYears')
    .addItem('Remove duplicate results (save bug)...', 'removeDuplicateResults')
    .addItem('Delete old results...', 'deleteOldResults')
    .addItem('Delete results of pupils who left...', 'deleteLeavers')
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
  [SHEET, ARCHIVE, 'Duplicates'].forEach(function (n) {
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
    if (!plan.rows && !plan.hwNames) { say('Nobody left the school more than ' + years + ' year(s) ago (before ' + Utilities.formatDate(plan.cutoff, TZ, 'dd.MM.yyyy') + '), so there is nothing to delete.'); return; }
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
