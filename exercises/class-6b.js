// ============================================================
//  CLASS 6.b  -  PROJECT 1 (4th edition)
// ============================================================
//  Same format as sets.js, plus:
//    unit   small text under the title, e.g. "Unit 1"
//    tests  (optional) multiple-choice questions for the "Unit test":
//           { q: "She ___ two brothers.", options: ["have","has","haves"], answer: "has" }
//           - answer must be exactly one of the options
// ============================================================

window.CLASS_SETS = [
  {
    id: "p1u1", unit: "Unit 1", title: "Introduction", icon: "👋",
    words: [
      { en: "hello",    sl: "živjo",         pic: "👋" },
      { en: "goodbye",  sl: "nasvidenje" },
      { en: "desk",     sl: "šolska klop" },
      { en: "chair",    sl: "stol",          pic: "🪑" },
      { en: "board",    sl: "tabla" },
      { en: "door",     sl: "vrata",         pic: "🚪" },
      { en: "window",   sl: "okno",          pic: "🪟" },
      { en: "bag",      sl: "torba",         pic: "👜" },
      { en: "letter",   sl: "črka",          pic: "🔤" },
      { en: "number",   sl: "število",       pic: "🔢" },
      { en: "twenty",   sl: "dvajset" },
      { en: "hundred",  sl: "sto",           pic: "💯" }
    ],
    sentences: [
      { text: "What's your ___? My name's Ana.",          answer: "name" },
      { text: "How ___ you? I'm fine, thanks.",           answer: "are" },
      { text: "It's ___ orange.",                         answer: "an" },
      { text: "There ___ two windows in the classroom.",  answer: "are" },
      { text: "There ___ a board in the classroom.",      answer: "is" },
      { text: "One book, two ___.",                       answer: "books" },
      { text: "One box, two ___.",                        answer: "boxes" },
      { text: "One child, two ___.",                      answer: "children" }
    ],
    tests: [
      { q: "What's ___ name?", options: ["your", "you", "yours"], answer: "your" },
      { q: "It's ___ orange.", options: ["a", "an", "the"], answer: "an" },
      { q: "How do you ___ your name?", options: ["spell", "spelling", "spells"], answer: "spell" },
      { q: "There ___ four desks in the classroom.", options: ["is", "are", "am"], answer: "are" },
      { q: "One man, two ___.", options: ["mans", "men", "manes"], answer: "men" },
      { q: "One bus, two ___.", options: ["buses", "buss", "bus's"], answer: "buses" },
      { q: "___ your book, please.", options: ["Open", "Opens", "Opening"], answer: "Open" },
      { q: "Fifteen + five = ___", options: ["twenty", "fifty", "fourteen"], answer: "twenty" },
      { q: "How ___ you? I'm fine, thanks.", options: ["is", "are", "do"], answer: "are" },
      { q: "There ___ a bag under the desk.", options: ["is", "are", "be"], answer: "is" }
    ]
  },
  {
    id: "p1u2", unit: "Unit 2", title: "Friends and Family", icon: "👨‍👩‍👧",
    words: [
      { en: "parents",      sl: "starši" },
      { en: "grandparents", sl: "stari starši" },
      { en: "aunt",         sl: "teta" },
      { en: "uncle",        sl: "stric" },
      { en: "cousin",       sl: "bratranec / sestrična" },
      { en: "Slovenia",     sl: "Slovenija" },
      { en: "England",      sl: "Anglija" },
      { en: "Germany",      sl: "Nemčija" },
      { en: "Italy",        sl: "Italija" },
      { en: "Spain",        sl: "Španija" },
      { en: "Monday",       sl: "ponedeljek" },
      { en: "Sunday",       sl: "nedelja" }
    ],
    sentences: [
      { text: "I ___ from Slovenia.",                          answer: "am" },
      { text: "She ___ from Italy.",                           answer: "is" },
      { text: "They ___ from Spain.",                          answer: "are" },
      { text: "My mother's brother is my ___.",                answer: "uncle" },
      { text: "Ana is my sister. ___ name is Ana.",            answer: "Her" },
      { text: "___ Tom your brother? Yes, he is.",             answer: "Is" },
      { text: "Today is Monday. Tomorrow is ___.",             answer: "Tuesday" },
      { text: "Where ___ you from?",                           answer: "are" }
    ],
    tests: [
      { q: "I ___ from Slovenia.", options: ["am", "is", "are"], answer: "am" },
      { q: "She ___ my sister.", options: ["am", "is", "are"], answer: "is" },
      { q: "They ___ not from Italy.", options: ["is", "am", "are"], answer: "are" },
      { q: "That is Ana's book. ___ book is red.", options: ["Her", "She", "Hers"], answer: "Her" },
      { q: "This is my ___ car.", options: ["father's", "fathers", "fathers'"], answer: "father's" },
      { q: "___ he your cousin? Yes, he is.", options: ["Is", "Are", "Am"], answer: "Is" },
      { q: "Where ___ you from?", options: ["are", "is", "do"], answer: "are" },
      { q: "What ___ is it today? It's Friday.", options: ["day", "time", "date"], answer: "day" },
      { q: "My mother's sister is my ___.", options: ["aunt", "uncle", "cousin"], answer: "aunt" },
      { q: "Tom and Ben are brothers. ___ are from London.", options: ["They", "Their", "We"], answer: "They" }
    ]
  },
  {
    id: "p1u3", unit: "Unit 3", title: "My world", icon: "🌍",
    words: [
      { en: "bike",         sl: "kolo",             pic: "🚲" },
      { en: "mobile phone", sl: "mobilni telefon",  pic: "📱" },
      { en: "hamster",      sl: "hrček",            pic: "🐹" },
      { en: "parrot",       sl: "papiga",           pic: "🦜" },
      { en: "timetable",    sl: "urnik",            pic: "🗓️" },
      { en: "Maths",        sl: "matematika",       pic: "➗" },
      { en: "Science",      sl: "naravoslovje",     pic: "🔬" },
      { en: "History",      sl: "zgodovina",        pic: "🏛️" },
      { en: "Geography",    sl: "geografija",       pic: "🌍" },
      { en: "Art",          sl: "likovna umetnost", pic: "🎨" },
      { en: "Music",        sl: "glasbena umetnost", pic: "🎵" },
      { en: "PE",           sl: "šport",            pic: "🏃" }
    ],
    sentences: [
      { text: "I ___ got a bike.",                              answer: "have" },
      { text: "She ___ got a hamster.",                         answer: "has" },
      { text: "___ you got a pet? Yes, I have.",                answer: "Have" },
      { text: "They ___ got a computer. (negative)",            answer: "haven't" },
      { text: "What's your favourite ___? Maths.",              answer: "subject" },
      { text: "My ___ shows my lessons: Maths, English, Art.",  answer: "timetable" },
      { text: "What class ___ you in?",                         answer: "are" },
      { text: "He ___ got a mobile phone. (negative)",          answer: "hasn't" }
    ],
    tests: [
      { q: "I ___ got a new bike.", options: ["have", "has", "am"], answer: "have" },
      { q: "He ___ got a hamster.", options: ["have", "has", "is"], answer: "has" },
      { q: "___ you got a pet? Yes, I have.", options: ["Have", "Has", "Do"], answer: "Have" },
      { q: "She ___ got a mobile phone. (negative)", options: ["haven't", "hasn't", "isn't"], answer: "hasn't" },
      { q: "It's a ___.", options: ["red car", "car red", "cars red"], answer: "red car" },
      { q: "What's your favourite ___? Maths.", options: ["subject", "teacher", "school"], answer: "subject" },
      { q: "What ___ are you in? 6.b.", options: ["class", "subject", "day"], answer: "class" },
      { q: "Has your sister got a cat? No, she ___.", options: ["hasn't", "haven't", "isn't"], answer: "hasn't" },
      { q: "We have Art ___ Tuesday.", options: ["on", "at", "in"], answer: "on" },
      { q: "They ___ got a computer at home.", options: ["has", "have", "are"], answer: "have" }
    ]
  },
  {
    id: "p1u4", unit: "Unit 4", title: "Time", icon: "🕒",
    words: [
      { en: "get up",     sl: "vstati" },
      { en: "breakfast",  sl: "zajtrk",       pic: "🥣" },
      { en: "lunch",      sl: "kosilo",       pic: "🍽️" },
      { en: "dinner",     sl: "večerja",      pic: "🍲" },
      { en: "homework",   sl: "domača naloga", pic: "📝" },
      { en: "go to bed",  sl: "iti spat",     pic: "🛏️" },
      { en: "guitar",     sl: "kitara",       pic: "🎸" },
      { en: "piano",      sl: "klavir",       pic: "🎹" },
      { en: "violin",     sl: "violina",      pic: "🎻" },
      { en: "drums",      sl: "bobni",        pic: "🥁" },
      { en: "trumpet",    sl: "trobenta",     pic: "🎺" },
      { en: "football",   sl: "nogomet",      pic: "⚽" }
    ],
    sentences: [
      { text: "I ___ up at seven o'clock.",                 answer: "get" },
      { text: "She ___ breakfast at half past seven.",      answer: "has" },
      { text: "He ___ football on Saturdays.",              answer: "plays" },
      { text: "They ___ like homework. (negative)",         answer: "don't" },
      { text: "She doesn't ___ TV in the morning.",         answer: "watch" },
      { text: "___ you play the guitar? Yes, I do.",        answer: "Do" },
      { text: "What time ___ school start?",                answer: "does" },
      { text: "The lesson starts ___ eight o'clock.",       answer: "at" }
    ],
    tests: [
      { q: "3:15 is a quarter ___ three.", options: ["past", "to", "at"], answer: "past" },
      { q: "2:45 is a quarter ___ three.", options: ["to", "past", "at"], answer: "to" },
      { q: "I get up ___ seven o'clock.", options: ["at", "on", "in"], answer: "at" },
      { q: "She ___ football on Saturdays.", options: ["play", "plays", "playing"], answer: "plays" },
      { q: "He ___ like fish.", options: ["don't", "doesn't", "isn't"], answer: "doesn't" },
      { q: "___ you go to school by bus? Yes, I do.", options: ["Do", "Does", "Are"], answer: "Do" },
      { q: "What time ___ she get up?", options: ["does", "do", "is"], answer: "does" },
      { q: "We ___ breakfast at 7.30.", options: ["has", "have", "haves"], answer: "have" },
      { q: "I don't ___ homework on Sunday.", options: ["do", "does", "doing"], answer: "do" },
      { q: "The lesson starts ___ Monday.", options: ["on", "at", "in"], answer: "on" }
    ]
  },
  {
    id: "p1u5", unit: "Unit 5", title: "Places", icon: "🏠",
    words: [
      { en: "wardrobe",      sl: "omara" },
      { en: "shelf",         sl: "polica" },
      { en: "bedroom",       sl: "spalnica" },
      { en: "kitchen",       sl: "kuhinja",      pic: "🍳" },
      { en: "bathroom",      sl: "kopalnica",    pic: "🛁" },
      { en: "living room",   sl: "dnevna soba",  pic: "🛋️" },
      { en: "garden",        sl: "vrt",          pic: "🌳" },
      { en: "shop",          sl: "trgovina",     pic: "🏪" },
      { en: "library",       sl: "knjižnica",    pic: "📚" },
      { en: "cinema",        sl: "kino",         pic: "🎬" },
      { en: "park",          sl: "park",         pic: "🏞️" },
      { en: "swimming pool", sl: "bazen",        pic: "🏊" }
    ],
    sentences: [
      { text: "The book is ___ the shelf. (on top)",               answer: "on" },
      { text: "The ball is ___ the table. (below)",                answer: "under" },
      { text: "The library is ___ the cinema and the shop.",       answer: "between" },
      { text: "There ___ a big garden.",                           answer: "is" },
      { text: "There ___ three bedrooms.",                         answer: "are" },
      { text: "There ___ any parks here. (negative)",              answer: "aren't" },
      { text: "___ there a cinema in your town? Yes, there is.",   answer: "Is" },
      { text: "I ___ swim very well.",                             answer: "can" }
    ],
    tests: [
      { q: "Your shoes are ___ the bed. (below)", options: ["under", "on", "at"], answer: "under" },
      { q: "The library is ___ the cinema and the shop.", options: ["between", "behind", "in"], answer: "between" },
      { q: "There ___ a big garden.", options: ["is", "are", "be"], answer: "is" },
      { q: "There ___ three bedrooms.", options: ["is", "are", "has"], answer: "are" },
      { q: "There ___ any shops in this street.", options: ["isn't", "aren't", "hasn't"], answer: "aren't" },
      { q: "___ there a park in your town?", options: ["Is", "Are", "Do"], answer: "Is" },
      { q: "Are there two bathrooms? Yes, ___.", options: ["there are", "they are", "there is"], answer: "there are" },
      { q: "I ___ swim very well.", options: ["can", "cans", "am"], answer: "can" },
      { q: "She ___ play the piano.", options: ["can't", "don't", "isn't"], answer: "can't" },
      { q: "___ you ride a bike?", options: ["Can", "Do", "Are"], answer: "Can" }
    ]
  },
  {
    id: "p1u6", unit: "Unit 6", title: "People", icon: "🧑",
    words: [
      { en: "tall",      sl: "visok" },
      { en: "short",     sl: "nizek" },
      { en: "fair",      sl: "svetel (lasje)" },
      { en: "dark",      sl: "temen (lasje)" },
      { en: "curly",     sl: "kodrast" },
      { en: "straight",  sl: "raven (lasje)" },
      { en: "young",     sl: "mlad",       pic: "🧒" },
      { en: "old",       sl: "star",       pic: "🧓" },
      { en: "jeans",     sl: "kavbojke",   pic: "👖" },
      { en: "T-shirt",   sl: "majica s kratkimi rokavi", pic: "👕" },
      { en: "jumper",    sl: "pulover",    pic: "🧶" },
      { en: "trainers",  sl: "superge",    pic: "👟" }
    ],
    sentences: [
      { text: "She ___ tall and slim.",                         answer: "is" },
      { text: "He has got short ___ hair. (not fair)",          answer: "dark" },
      { text: "She is ___ a red T-shirt.",                      answer: "wearing" },
      { text: "They are ___ football now.",                     answer: "playing" },
      { text: "I ___ wearing jeans today.",                     answer: "am" },
      { text: "He ___ reading a book at the moment.",           answer: "is" },
      { text: "___ they going to the shops? No, they aren't.",  answer: "Are" },
      { text: "We ___ not watching TV.",                        answer: "are" }
    ],
    tests: [
      { q: "She ___ wearing a red jumper.", options: ["is", "are", "am"], answer: "is" },
      { q: "They ___ playing football now.", options: ["is", "are", "do"], answer: "are" },
      { q: "I ___ wearing jeans today.", options: ["am", "is", "are"], answer: "am" },
      { q: "Look! It ___ raining.", options: ["is", "does", "has"], answer: "is" },
      { q: "He ___ his homework now.", options: ["is doing", "does", "do"], answer: "is doing" },
      { q: "___ she going to the shop? No, she isn't.", options: ["Is", "Does", "Are"], answer: "Is" },
      { q: "He is ___ in the park.", options: ["running", "runing", "runeing"], answer: "running" },
      { q: "He ___ up at 7 every day.", options: ["gets", "is getting", "get"], answer: "gets" },
      { q: "How ___ is this T-shirt? Ten euros.", options: ["much", "many", "long"], answer: "much" },
      { q: "She has got long, ___ hair.", options: ["dark", "darks", "darkly"], answer: "dark" }
    ]
  }
];
