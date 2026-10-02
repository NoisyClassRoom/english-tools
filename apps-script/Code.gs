/**
 * English Classroom Hub - results collector + analysis tabs.
 * Paste into the Apps Script project attached to the PRIVATE Google Sheet
 * (Extensions > Apps Script). Full steps: SETUP.md.
 *
 * doPost:  receives {token, cls, topic, activity, score, total}, checks the Google ID token
 *          and appends one row to "Results". E-mail and name come from the verified token,
 *          never from what the browser claims. School year and the pupil's real class
 *          (from the "Roster" tab) are added on the server.
 * Menu:    "English hub" > set up analysis tabs / refresh classes from roster / delete old results.
 */

var CLIENT_ID = '723989491910-q0hi1qdpm23kag6fs11rir3o8gqkb0q5.apps.googleusercontent.com';
var ALLOWED_DOMAIN = 'os-verzej.si';   // only this Google Workspace domain may save; '' = anyone
var TZ = 'Europe/Ljubljana';

var SHEET = 'Results';
var ROSTER = 'Roster';
var HEADER = ['Time', 'Email', 'First name', 'Last name', 'Class', 'Topic', 'Activity', 'Score', 'Total', 'Percent',
              'School year', 'Class (roster)'];
//             A       B        C            D            E        F        G           H        I        J
//             K              L
// "Class" (E) is the coursebook id of the exercise link (6b, 7a...), "Class (roster)" (L) the pupil's real class.
var BASE_COLS = 10;
var BOOK_IDS = ['All', '6b', '7a', '7bc', '8a', '8b', '9a', '9b', 'extra'];

// ---------------------------------------------------------------- saving results

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.action === 'roster') return rosterReply_(d);       // teacher-only, used by the Classroom Tools page
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
      var now = new Date(), year = schoolYear_(now);
      sh.appendRow([now, who.email, text_(who.first), text_(who.last), text_(d.cls), text_(d.topic),
                    text_(d.activity), score, total, Math.round(100 * score / total) / 100,
                    year, classFor_(rosterRows_(), who.email, who.first, who.last, year)]);
    } finally { lock.release(); }
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
  var allowed = String(PropertiesService.getScriptProperties().getProperty('TEACHER_EMAILS') || '')
    .toLowerCase().split(/[\s,;]+/).filter(String);
  if (!who || allowed.indexOf(String(who.email).toLowerCase()) < 0) return out_({ ok: false, error: 'token' });

  var sh = SpreadsheetApp.getActive().getSheetByName(ROSTER);
  if (!sh || sh.getLastRow() < 2) return out_({ ok: true, year: '', classes: {} });
  var rows = sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues(), year = '';
  rows.forEach(function (r) { var y = String(r[1]).trim(); if (/^\d{4}-\d{2}$/.test(y) && y > year) year = y; });
  var byClass = {};
  rows.forEach(function (r) {
    var y = String(r[1]).trim(), cls = String(r[2]).trim(), name = String(r[3]).trim();
    if (y !== year || !cls || !name) return;
    (byClass[cls] = byClass[cls] || []).push(name);
  });
  var classes = {};
  Object.keys(byClass).sort().forEach(function (c) { classes[c] = byClass[c].sort(function (a, b) { return a.localeCompare(b, 'sl'); }); });
  return out_({ ok: true, year: year, classes: classes });
}

// The "Results" tab. An older layout is kept under another name; the two newer columns are added in place.
function resultsSheet_() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(SHEET);
  if (sh && sh.getLastRow() > 0 &&
      sh.getRange(1, 1, 1, BASE_COLS).getValues()[0].join('|') !== HEADER.slice(0, BASE_COLS).join('|')) {
    sh.setName('Results (old ' + Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH-mm') + ')');
    sh = null;
  }
  if (!sh) sh = ss.insertSheet(SHEET, 0);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADER); sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADER.length).setFontWeight('bold');
    sh.getRange('A:A').setNumberFormat('dd.mm.yyyy hh:mm');
    sh.getRange('J:J').setNumberFormat('0%');
    sh.getRange('K:L').setNumberFormat('@');           // plain text, so "2026-27" is never turned into a date
  } else if (sh.getRange(1, 11, 1, 2).getValues()[0].join('|') !== HEADER.slice(10).join('|')) {
    sh.getRange(1, 11, 1, 2).setValues([HEADER.slice(10)]).setFontWeight('bold');
    sh.getRange('K:L').setNumberFormat('@');
    fillDerived_(sh);                                  // older rows get their school year / class
  }
  return sh;
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

// (Re)computes columns K and L for every result row.
function fillDerived_(sh) {
  var n = sh.getLastRow() - 1;
  if (n < 1) return;
  var times = sh.getRange(2, 1, n, 1).getValues(), who = sh.getRange(2, 2, n, 3).getValues();  // B e-mail, C first, D last
  var roster = rosterRows_(), out = [];
  for (var i = 0; i < n; i++) {
    var y = schoolYear_(times[i][0]);
    out.push([y, classFor_(roster, who[i][0], who[i][1], who[i][2], y)]);
  }
  sh.getRange(2, 11, n, 2).setNumberFormat('@').setValues(out);
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
    .addItem('Delete old results...', 'deleteOldResults')
    .addToUi();
}

// After you edit the Roster: put the right class on every result row.
function refreshClasses() {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { fillDerived_(resultsSheet_()); } finally { lock.release(); }
  SpreadsheetApp.getActive().toast('Classes updated from the Roster.', 'English hub', 5);
}

// Removes results older than N years (whole school years are the sensible choice: 1, 2, 3...).
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
  try {
    var sh = resultsSheet_(), n = sh.getLastRow() - 1;
    if (n < 1) { ui.alert('There are no results yet.'); return; }
    var range = sh.getRange(2, 1, n, HEADER.length), values = range.getValues();
    var keep = values.filter(function (r) { return !(r[0] instanceof Date) || r[0] >= cutoff; });
    var gone = n - keep.length;
    if (!gone) { ui.alert('Nothing is older than ' + years + ' year(s).'); return; }
    var ok = ui.alert('Delete ' + gone + ' of ' + n + ' results older than ' +
      Utilities.formatDate(cutoff, TZ, 'dd.MM.yyyy') + '?', 'This cannot be undone here (only via File > Version history).',
      ui.ButtonSet.YES_NO);
    if (ok !== ui.Button.YES) return;
    range.clearContent();
    if (keep.length) sh.getRange(2, 1, keep.length, HEADER.length).setValues(keep);
  } finally { lock.release(); }
  ui.alert('Done. Deleted ' + gone + ' results.');
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
 * Builds the Roster tab (only if missing) and four live overview tabs from "Results".
 * Safe to run again: the overview tabs are rebuilt, the Roster is never touched.
 * Each overview tab has three selectors in row 1: school year, class (from the Roster), coursebook.
 */
function setupAnalysis() {
  resultsSheet_();
  rosterSheet_();
  var R = SHEET + '!$A:$L';
  // WHERE part, driven by the selectors in B1 (school year), D1 (class), F1 (coursebook)
  var where = '"where B is not null"' +
    '&IF($B$1="All",""," and K = \'"&$B$1&"\'")' +
    '&IF($D$1="All",""," and L = \'"&$D$1&"\'")' +
    '&IF($F$1="All",""," and E = \'"&$F$1&"\'")&" ';

  // 0) teacher summary: one row per pupil, one column per topic, best result in each cell
  build_('Summary', 'Best result of each pupil in each topic (best of all activities and attempts). Red = below 60 %, green = 90 % or more, empty = not practised yet.',
    '=IFERROR(QUERY(' + R + ',"select D,C,L,max(J) ' + where.slice(1) +
    'group by D,C,L pivot F order by D,C label D \'Last name\', C \'First name\', L \'Class\'",1),"No results yet")',
    {}, 4);
  finishSummary_();

  // 1) one row per student and school year
  build_('Students', 'Every student and school year: how much they practised and how well. Red = average below 60 %.',
    '=IFERROR(QUERY(' + R + ',"select B,C,D,K,L,count(J),avg(J),max(A) ' + where.slice(1) +
    'group by B,C,D,K,L order by D,C,K label B \'Email\', C \'First name\', D \'Last name\', K \'School year\', L \'Class\', count(J) \'Attempts\', avg(J) \'Average\', max(A) \'Last practised\'",1),"No results yet")',
    { 7: '0%', 8: 'dd.mm.yyyy hh:mm' }, 7);

  // 2) best score per student, topic and activity
  build_('Best scores', 'Best result of each student in each topic and activity.',
    '=IFERROR(QUERY(' + R + ',"select B,C,D,K,L,E,F,G,max(J),count(J) ' + where.slice(1) +
    'group by B,C,D,K,L,E,F,G order by D,C,K,F,G label B \'Email\', C \'First name\', D \'Last name\', K \'School year\', L \'Class\', E \'Book\', F \'Topic\', G \'Activity\', max(J) \'Best\', count(J) \'Attempts\'",1),"No results yet")',
    { 9: '0%' }, 9);

  // 3) topics / activities - where the class struggles
  build_('Topics', 'Which topics and activities are hard: a low average = needs more practice.',
    '=IFERROR(QUERY(' + R + ',"select E,F,G,count(J),avg(J) ' + where.slice(1) +
    'group by E,F,G order by E,F,G label E \'Book\', F \'Topic\', G \'Activity\', count(J) \'Attempts\', avg(J) \'Average\'",1),"No results yet")',
    { 5: '0%' }, 5);

  // 4) activity over time (Col1 day, Col2 e-mail, Col5 book, Col6 percent, Col7 school year, Col8 class)
  build_('By day', 'How much practice happened each day.',
    '=IFERROR(QUERY({ARRAYFORMULA(INT(' + SHEET + '!A2:A)),' + SHEET + '!B2:E,' + SHEET + '!J2:L},' +
    '"select Col1,count(Col6),avg(Col6) where Col2 is not null"' +
    '&IF($B$1="All",""," and Col7 = \'"&$B$1&"\'")' +
    '&IF($D$1="All",""," and Col8 = \'"&$D$1&"\'")' +
    '&IF($F$1="All",""," and Col5 = \'"&$F$1&"\'")' +
    '&" group by Col1 order by Col1 desc label Col1 \'Day\', count(Col6) \'Attempts\', avg(Col6) \'Average\'",0),"No results yet")',
    { 1: 'dd.mm.yyyy', 3: '0%' }, 3);

  SpreadsheetApp.getActive().toast('Analysis tabs are ready.', 'English hub', 5);
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
  sh.getRange('E2').setFormula('={"All";IFERROR(SORT(UNIQUE(FILTER(C2:C,C2:C<>""))),"")}');
  sh.getRange('G1').setValue('How to use').setFontWeight('bold');
  sh.getRange('G2').setValue('One row per pupil and school year. Fill the Email and/or the Name (surname and first name as in eAsistent, any order); School year like 2026-27 (blank = every year); Class e.g. 7.B');
  sh.getRange('G3').setValue('Every September: add the new rows (or copy the old ones and change the year and class).');
  sh.getRange('G4').setValue('After editing: menu English hub > Refresh classes from Roster.');
  sh.getRange('G5').setValue('Keep this Sheet private. Do not copy this tab into the public repository.');
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
  var labels = [['A1', 'School year:'], ['C1', 'Class:'], ['E1', 'Book:']];
  labels.forEach(function (l) { sh.getRange(l[0]).setValue(l[1]).setFontWeight('bold').setHorizontalAlignment('right'); });
  var pick = function (cell, rule) {
    sh.getRange(cell).setNumberFormat('@').setValue('All').setDataValidation(rule)
      .setBackground('#e6eefc').setFontWeight('bold');
  };
  pick('B1', SpreadsheetApp.newDataValidation().requireValueInList(yearList_(), true).build());
  pick('D1', SpreadsheetApp.newDataValidation()
    .requireValueInRange(ss.getSheetByName(ROSTER).getRange('E2:E100'), true).setAllowInvalid(false).build());
  pick('F1', SpreadsheetApp.newDataValidation().requireValueInList(BOOK_IDS, true).build());
  sh.getRange('A3').setFormula(formula);
  sh.setFrozenRows(3);
  sh.getRange('A3:Z3').setFontWeight('bold').setBackground('#f1efe8');
  var rows = sh.getMaxRows() - 3;
  Object.keys(formats).forEach(function (c) { sh.getRange(4, Number(c), rows, 1).setNumberFormat(formats[c]); });
  // colour the percentage column: red < 60 %, green >= 90 %
  var col = sh.getRange(4, pctCol, rows, 1);
  sh.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(0.6).setBackground('#fde4e4').setRanges([col]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(0.9).setBackground('#dcf5e6').setRanges([col]).build()
  ]);
  sh.autoResizeColumns(1, 10);
  sh.getRange('A2').setValue(note).setFontColor('#6b7280');   // after resizing, so a long note does not widen column A
}
