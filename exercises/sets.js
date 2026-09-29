// ============================================================
//  EXERCISE SETS  -  edit this file to add or change exercises
// ============================================================
//  Each set has:
//    id        short name without spaces (used internally)
//    title     shown to students
//    icon      one emoji
//    words     list of { en: "English word", sl: "Slovenian", pic: "emoji (optional)" }
//    sentences (optional) gap-fill list of { text: "The sky is ___.", answer: "blue" }
//              - use ___ (three underscores) where the missing word goes
//              - alt: ["other","accepted answers"] is optional
//
//  To add a new set: copy one whole block { ... }, paste it after the last
//  one (keep the comma between blocks) and change the content.
// ============================================================

window.SETS = [
  {
    id: "colours",
    title: "Colours",
    icon: "🎨",
    words: [
      { en: "red",    sl: "rdeča",    pic: "🔴" },
      { en: "blue",   sl: "modra",    pic: "🔵" },
      { en: "green",  sl: "zelena",   pic: "🟢" },
      { en: "yellow", sl: "rumena",   pic: "🟡" },
      { en: "orange", sl: "oranžna",  pic: "🟠" },
      { en: "purple", sl: "vijolična", pic: "🟣" },
      { en: "brown",  sl: "rjava",    pic: "🟤" },
      { en: "black",  sl: "črna",     pic: "⚫" },
      { en: "white",  sl: "bela",     pic: "⚪" },
      { en: "pink",   sl: "roza",     pic: "🌸" }
    ],
    sentences: [
      { text: "The sky is ___ on a sunny day.",  answer: "blue" },
      { text: "Grass is ___.",                   answer: "green" },
      { text: "A banana is ___.",                answer: "yellow" },
      { text: "Snow is ___.",                    answer: "white" },
      { text: "A tomato is ___.",                answer: "red" },
      { text: "Chocolate is ___.",               answer: "brown" }
    ]
  },
  {
    id: "school",
    title: "School objects",
    icon: "🎒",
    words: [
      { en: "book",      sl: "knjiga",   pic: "📕" },
      { en: "pencil",    sl: "svinčnik", pic: "✏️" },
      { en: "pen",       sl: "kemični svinčnik", pic: "🖊️" },
      { en: "ruler",     sl: "ravnilo",  pic: "📏" },
      { en: "scissors",  sl: "škarje",   pic: "✂️" },
      { en: "backpack",  sl: "šolska torba", pic: "🎒" },
      { en: "computer",  sl: "računalnik", pic: "💻" },
      { en: "clock",     sl: "ura",      pic: "🕒" },
      { en: "notebook",  sl: "zvezek",   pic: "📓" },
      { en: "calculator", sl: "računalo", pic: "🧮" }
    ],
    sentences: [
      { text: "I write with a ___.",              answer: "pen", alt: ["pencil"] },
      { text: "I read a ___.",                    answer: "book" },
      { text: "I carry my books in a ___.",       answer: "backpack" },
      { text: "I cut paper with ___.",            answer: "scissors" },
      { text: "I draw a straight line with a ___.", answer: "ruler" },
      { text: "The ___ shows the time.",          answer: "clock" }
    ]
  }
];
