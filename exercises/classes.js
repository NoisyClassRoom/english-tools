// ============================================================
//  CLASSES  -  one entry per grade + coursebook
// ============================================================
//  id     used in the link:  exercises/?class=6b   (and in the file class-6b.js)
//         (an internal name only; students never see it)
//  title  the grade, shown to students
//  book   coursebook name
//  ready  true = the class has exercises (file class-<id>.js exists)
//
//  To add exercises for another coursebook: create class-<id>.js (copy
//  class-6b.js), then add a line here with ready: true.
// ============================================================

window.CLASSES = [
  { id: "6b",  title: "6", book: "Project 1",          ready: true },
  { id: "7a",  title: "7", book: "Dream Team Starter", ready: true },
  { id: "7bc", title: "7", book: "Project 2",          ready: true },
  { id: "8a",  title: "8", book: "Dream Team 1",       ready: true },
  { id: "8b",  title: "8", book: "Project 3",          ready: true },
  { id: "9a",  title: "9", book: "Dream Team 2",       ready: true },
  { id: "9b",  title: "9", book: "Project 4",          ready: true }
];
