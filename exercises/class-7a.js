// ============================================================
//  CLASS 7.a  -  DREAM TEAM STARTER (elective)
// ============================================================

window.CLASS_SETS = [
  {
    id: "dts0", unit: "Starter", title: "New start!", icon: "👋",
    words: [
      { en: "name",         sl: "ime" },
      { en: "surname",      sl: "priimek" },
      { en: "alphabet",     sl: "abeceda",     pic: "🔤" },
      { en: "spell",        sl: "črkovati" },
      { en: "friend",       sl: "prijatelj / prijateljica", pic: "🧑‍🤝‍🧑" },
      { en: "country",      sl: "država" },
      { en: "please",       sl: "prosim" },
      { en: "thank you",    sl: "hvala",       pic: "🙏" },
      { en: "sorry",        sl: "oprosti" },
      { en: "good morning", sl: "dobro jutro", pic: "🌅" },
      { en: "good night",   sl: "lahko noč",   pic: "🌙" },
      { en: "welcome",      sl: "dobrodošli" }
    ],
    sentences: [
      { text: "My ___ is Ana.",              answer: "name" },
      { text: "___ your name?",              answer: "What's", alt: ["What is"] },
      { text: "I'm ___ Slovenia.",           answer: "from" },
      { text: "Where ___ you from?",         answer: "are" },
      { text: "This is ___ apple.",          answer: "an" },
      { text: "It is ___ blue pen.",         answer: "a" },
      { text: "How do you ___ 'cat'? C-A-T.", answer: "spell" },
      { text: "Nice to ___ you.",            answer: "meet" }
    ],
    tests: [
      { q: "___ your name?", options: ["What's", "Where's", "How's"], answer: "What's" },
      { q: "I ___ from Slovenia.", options: ["am", "is", "are"], answer: "am" },
      { q: "Where ___ you from?", options: ["are", "is", "am"], answer: "are" },
      { q: "It's ___ orange.", options: ["an", "a", "the"], answer: "an" },
      { q: "It's ___ book.", options: ["a", "an", "the"], answer: "a" },
      { q: "How do you ___ your name?", options: ["spell", "spelling", "spells"], answer: "spell" },
      { q: "Good ___! (before sleep)", options: ["night", "morning", "afternoon"], answer: "night" },
      { q: "Thank you! — You're ___.", options: ["welcome", "please", "sorry"], answer: "welcome" },
      { q: "I'm ___. I didn't do my homework.", options: ["sorry", "welcome", "please"], answer: "sorry" },
      { q: "The colour of the sky is ___.", options: ["blue", "red", "black"], answer: "blue" }
    ]
  },
  {
    id: "dts1", unit: "Unit 1", title: "You are a good player!", icon: "⚽",
    words: [
      { en: "ten",       sl: "deset" },
      { en: "fifteen",   sl: "petnajst" },
      { en: "twenty",    sl: "dvajset" },
      { en: "Tuesday",   sl: "torek" },
      { en: "Wednesday", sl: "sreda" },
      { en: "Thursday",  sl: "četrtek" },
      { en: "Friday",    sl: "petek" },
      { en: "Saturday",  sl: "sobota" },
      { en: "February",  sl: "februar" },
      { en: "June",      sl: "junij" },
      { en: "October",   sl: "oktober" },
      { en: "weekend",   sl: "vikend" }
    ],
    sentences: [
      { text: "I ___ 12 years old.",                    answer: "am" },
      { text: "She ___ 13.",                            answer: "is" },
      { text: "How old ___ you?",                       answer: "are" },
      { text: "They ___ my friends.",                   answer: "are" },
      { text: "Today is Monday. Tomorrow is ___.",      answer: "Tuesday" },
      { text: "My birthday is ___ May.",                answer: "in" },
      { text: "The lesson is ___ Monday.",              answer: "on" },
      { text: "He ___ a good player.",                  answer: "is" }
    ],
    tests: [
      { q: "She ___ twelve years old.", options: ["is", "are", "am"], answer: "is" },
      { q: "We ___ friends.", options: ["are", "is", "am"], answer: "are" },
      { q: "I ___ not a teacher.", options: ["am", "is", "are"], answer: "am" },
      { q: "My birthday is ___ June.", options: ["in", "on", "at"], answer: "in" },
      { q: "The lesson is ___ Friday.", options: ["on", "in", "at"], answer: "on" },
      { q: "The day after Monday is ___.", options: ["Tuesday", "Sunday", "Friday"], answer: "Tuesday" },
      { q: "The month after May is ___.", options: ["June", "April", "July"], answer: "June" },
      { q: "Saturday and Sunday are the ___.", options: ["weekend", "week", "month"], answer: "weekend" },
      { q: "___ you a student? Yes, I am.", options: ["Are", "Is", "Am"], answer: "Are" },
      { q: "How ___ are you? I'm thirteen.", options: ["old", "many", "much"], answer: "old" }
    ]
  },
  {
    id: "dts2", unit: "Unit 2", title: "Who's this?", icon: "👨‍👩‍👧",
    words: [
      { en: "mum",     sl: "mami" },
      { en: "dad",     sl: "ati" },
      { en: "sister",  sl: "sestra",  pic: "👧" },
      { en: "brother", sl: "brat",    pic: "👦" },
      { en: "grandma", sl: "babica",  pic: "👵" },
      { en: "grandpa", sl: "dedek",   pic: "👴" },
      { en: "aunt",    sl: "teta" },
      { en: "uncle",   sl: "stric" },
      { en: "cousin",  sl: "bratranec / sestrična" },
      { en: "parents", sl: "starši" },
      { en: "family",  sl: "družina" },
      { en: "fifty",   sl: "petdeset" }
    ],
    sentences: [
      { text: "___ is my brother. (near me)",            answer: "This" },
      { text: "That ___ my house over there.",           answer: "is" },
      { text: "These ___ my books.",                     answer: "are" },
      { text: "Those ___ his shoes.",                    answer: "are" },
      { text: "This is Ana. ___ mother is a teacher.",   answer: "Her" },
      { text: "This is Tom. ___ sister is ten.",         answer: "His" },
      { text: "It is Peter's book. It is ___ book.",     answer: "Peter's" },
      { text: "One box, two ___.",                       answer: "boxes" }
    ],
    tests: [
      { q: "___ is my pen. (near)", options: ["This", "That", "These"], answer: "This" },
      { q: "___ are my friends. (near, plural)", options: ["These", "This", "Those"], answer: "These" },
      { q: "Look at ___ birds over there!", options: ["those", "these", "this"], answer: "those" },
      { q: "This is Ana. ___ mum is nice.", options: ["Her", "His", "She"], answer: "Her" },
      { q: "Tom has a sister. ___ name is Eva.", options: ["His", "Her", "He's"], answer: "His" },
      { q: "It's my dad's car. It's ___ car.", options: ["my dad's", "my dads", "my dads'"], answer: "my dad's" },
      { q: "One woman, two ___.", options: ["women", "womans", "womens"], answer: "women" },
      { q: "One bus, two ___.", options: ["buses", "buss", "bus"], answer: "buses" },
      { q: "My mum's mum is my ___.", options: ["grandma", "aunt", "cousin"], answer: "grandma" },
      { q: "My uncle's son is my ___.", options: ["cousin", "brother", "grandpa"], answer: "cousin" }
    ]
  },
  {
    id: "dts3", unit: "Unit 3", title: "This is a great place!", icon: "🕒",
    words: [
      { en: "o'clock",      sl: "ura (točno)" },
      { en: "half past",    sl: "pol ure čez" },
      { en: "quarter past", sl: "četrt čez" },
      { en: "quarter to",   sl: "četrt do" },
      { en: "morning",      sl: "jutro / dopoldne", pic: "🌅" },
      { en: "afternoon",    sl: "popoldne" },
      { en: "evening",      sl: "večer",            pic: "🌆" },
      { en: "tennis",       sl: "tenis",            pic: "🎾" },
      { en: "basketball",   sl: "košarka",          pic: "🏀" },
      { en: "volleyball",   sl: "odbojka",          pic: "🏐" },
      { en: "skiing",       sl: "smučanje",         pic: "⛷️" },
      { en: "gymnastics",   sl: "gimnastika",       pic: "🤸" }
    ],
    sentences: [
      { text: "It's five ___. (5:00)",                     answer: "o'clock" },
      { text: "3:30 is ___ past three.",                   answer: "half" },
      { text: "4:15 is a ___ past four.",                  answer: "quarter" },
      { text: "She ___ tennis on Fridays.",                answer: "plays" },
      { text: "He ___ up at seven.",                       answer: "gets" },
      { text: "My friends ___ basketball at school.",      answer: "play" },
      { text: "One man, two ___.",                         answer: "men" },
      { text: "One foot, two ___.",                        answer: "feet" }
    ],
    tests: [
      { q: "What ___ is it? It's five o'clock.", options: ["time", "hour", "clock"], answer: "time" },
      { q: "6:30 is ___ past six.", options: ["half", "quarter", "o'clock"], answer: "half" },
      { q: "7:45 is a quarter ___ eight.", options: ["to", "past", "at"], answer: "to" },
      { q: "He ___ football every Saturday.", options: ["plays", "play", "playing"], answer: "plays" },
      { q: "I ___ up at 7 o'clock.", options: ["get", "gets", "getting"], answer: "get" },
      { q: "My sister ___ tennis.", options: ["plays", "play", "playes"], answer: "plays" },
      { q: "One child, two ___.", options: ["children", "childs", "childrens"], answer: "children" },
      { q: "One tooth, two ___.", options: ["teeth", "tooths", "toothes"], answer: "teeth" },
      { q: "One mouse, two ___.", options: ["mice", "mouses", "mices"], answer: "mice" },
      { q: "We ___ swimming on Tuesdays.", options: ["go", "goes", "going"], answer: "go" }
    ]
  },
  {
    id: "dts4", unit: "Unit 4", title: "Charlie doesn't like shopping", icon: "🛍️",
    words: [
      { en: "wake up",             sl: "prebuditi se" },
      { en: "brush my teeth",      sl: "umiti si zobe",       pic: "🪥" },
      { en: "have a shower",       sl: "stuširati se",        pic: "🚿" },
      { en: "go shopping",         sl: "iti po nakupih",      pic: "🛍️" },
      { en: "listen to music",     sl: "poslušati glasbo",    pic: "🎧" },
      { en: "watch TV",            sl: "gledati televizijo",  pic: "📺" },
      { en: "play computer games", sl: "igrati računalniške igre", pic: "🎮" },
      { en: "ride a bike",         sl: "voziti kolo",         pic: "🚲" },
      { en: "read comics",         sl: "brati stripe" },
      { en: "cook",                sl: "kuhati",              pic: "🍳" },
      { en: "hobby",               sl: "konjiček" },
      { en: "free time",           sl: "prosti čas" }
    ],
    sentences: [
      { text: "I ___ like shopping.",                        answer: "don't" },
      { text: "She ___ like football.",                      answer: "doesn't" },
      { text: "___ you like music? Yes, I do.",              answer: "Do" },
      { text: "___ he play the guitar? No, he doesn't.",     answer: "Does" },
      { text: "I like ___ to music.",                        answer: "listening" },
      { text: "___ I go to the toilet, please?",             answer: "Can" },
      { text: "You ___ use my phone. (permission: yes)",     answer: "can" },
      { text: "She likes ___ TV.",                           answer: "watching" }
    ],
    tests: [
      { q: "I ___ like spiders.", options: ["don't", "doesn't", "isn't"], answer: "don't" },
      { q: "He ___ like cheese.", options: ["doesn't", "don't", "isn't"], answer: "doesn't" },
      { q: "___ you play computer games?", options: ["Do", "Does", "Are"], answer: "Do" },
      { q: "___ she like pizza?", options: ["Does", "Do", "Is"], answer: "Does" },
      { q: "Ana likes ___ books.", options: ["reading", "read", "reads"], answer: "reading" },
      { q: "___ I open the window, please?", options: ["Can", "Do", "Am"], answer: "Can" },
      { q: "Can I use your pen? — Yes, you ___.", options: ["can", "cans", "are"], answer: "can" },
      { q: "I ___ my teeth every morning.", options: ["brush", "brushes", "brushing"], answer: "brush" },
      { q: "I ___ TV in the evening.", options: ["watch", "watches", "watching"], answer: "watch" },
      { q: "My hobby is ___. I go out on my bike.", options: ["cycling", "cooking", "reading"], answer: "cycling" }
    ]
  },
  {
    id: "dts5", unit: "Unit 5", title: "Give the ball to me!", icon: "🧍",
    words: [
      { en: "head",  sl: "glava" },
      { en: "arm",   sl: "roka (nadlaht)", pic: "💪" },
      { en: "leg",   sl: "noga",           pic: "🦵" },
      { en: "foot",  sl: "stopalo",        pic: "🦶" },
      { en: "eye",   sl: "oko",            pic: "👁️" },
      { en: "ear",   sl: "uho",            pic: "👂" },
      { en: "nose",  sl: "nos",            pic: "👃" },
      { en: "mouth", sl: "usta",           pic: "👄" },
      { en: "hair",  sl: "lasje" },
      { en: "tooth", sl: "zob",            pic: "🦷" },
      { en: "neck",  sl: "vrat" },
      { en: "hand",  sl: "dlan / roka",    pic: "✋" }
    ],
    sentences: [
      { text: "I ___ got two brothers.",               answer: "have" },
      { text: "She ___ got blue eyes.",                answer: "has" },
      { text: "He hasn't ___ a bike.",                 answer: "got" },
      { text: "___ you got a pen? Yes, I have.",       answer: "Have" },
      { text: "Open ___ book. (imperative)",           answer: "your" },
      { text: "___ talk in class! (no!)",              answer: "Don't" },
      { text: "We see with our ___.",                  answer: "eyes" },
      { text: "We hear with our ___.",                 answer: "ears" }
    ],
    tests: [
      { q: "I ___ got a dog.", options: ["have", "has", "am"], answer: "have" },
      { q: "She ___ got long hair.", options: ["has", "have", "is"], answer: "has" },
      { q: "___ he got a bike? Yes, he has.", options: ["Has", "Have", "Does"], answer: "Has" },
      { q: "We haven't ___ a car.", options: ["got", "have", "get"], answer: "got" },
      { q: "___ up, please! (imperative)", options: ["Stand", "Standing", "Stands"], answer: "Stand" },
      { q: "___ run in the corridor! (no)", options: ["Don't", "Doesn't", "Not"], answer: "Don't" },
      { q: "We hear with our ___.", options: ["ears", "eyes", "hands"], answer: "ears" },
      { q: "We smell with our ___.", options: ["nose", "mouth", "legs"], answer: "nose" },
      { q: "1st May is 'the ___ of May'.", options: ["first", "one", "oneth"], answer: "first" },
      { q: "2nd April is 'the ___ of April'.", options: ["second", "two", "twoth"], answer: "second" }
    ]
  },
  {
    id: "dts6", unit: "Unit 6", title: "Let's have a party!", icon: "🎉",
    words: [
      { en: "party",     sl: "zabava",     pic: "🎉" },
      { en: "cake",      sl: "torta",      pic: "🍰" },
      { en: "sandwich",  sl: "sendvič",    pic: "🥪" },
      { en: "crisps",    sl: "čips" },
      { en: "biscuit",   sl: "piškot",     pic: "🍪" },
      { en: "juice",     sl: "sok",        pic: "🧃" },
      { en: "lemonade",  sl: "limonada",   pic: "🍋" },
      { en: "salad",     sl: "solata",     pic: "🥗" },
      { en: "tomato",    sl: "paradižnik", pic: "🍅" },
      { en: "potato",    sl: "krompir",    pic: "🥔" },
      { en: "chocolate", sl: "čokolada",   pic: "🍫" },
      { en: "sweets",    sl: "bonboni",    pic: "🍬" }
    ],
    sentences: [
      { text: "___ have a party!",                         answer: "Let's" },
      { text: "Is there ___ cake? Yes, there is.",         answer: "a" },
      { text: "Are there ___ sandwiches? No, there aren't.", answer: "any" },
      { text: "There is ___ juice in the glass.",          answer: "some" },
      { text: "I'd like ___ apple.",                       answer: "an" },
      { text: "There aren't ___ biscuits.",                answer: "any" },
      { text: "Two ___, please. (sandwich)",               answer: "sandwiches" },
      { text: "___ we dance? (suggestion)",                answer: "Shall" }
    ],
    tests: [
      { q: "Is there ___ milk?", options: ["any", "some", "a"], answer: "any" },
      { q: "There are ___ tomatoes on the table.", options: ["some", "a", "an"], answer: "some" },
      { q: "There isn't ___ juice.", options: ["any", "some", "an"], answer: "any" },
      { q: "I'd like ___ orange.", options: ["an", "a", "some"], answer: "an" },
      { q: "I'd like ___ sandwich.", options: ["a", "an", "some"], answer: "a" },
      { q: "Which is uncountable?", options: ["lemonade", "biscuit", "tomato"], answer: "lemonade" },
      { q: "Which is countable?", options: ["biscuit", "milk", "sugar"], answer: "biscuit" },
      { q: "___ have a party!", options: ["Let's", "Lets", "Let"], answer: "Let's" },
      { q: "Are there ___ crisps? No, there aren't.", options: ["any", "some", "a"], answer: "any" },
      { q: "Two ___, please.", options: ["sandwiches", "sandwich", "sandwichs"], answer: "sandwiches" }
    ]
  }
];
