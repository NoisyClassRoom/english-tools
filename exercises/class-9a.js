// ============================================================
//  CLASS 9.a  -  DREAM TEAM 2
// ============================================================

window.CLASS_SETS = [
  {
    id: "dt2u1", unit: "Unit 1", title: "Jeff's a DJ now!", icon: "🎧",
    words: [
      { en: "motorbike",  sl: "motor",              pic: "🏍️" },
      { en: "helicopter", sl: "helikopter",         pic: "🚁" },
      { en: "underground", sl: "podzemna železnica", pic: "🚇" },
      { en: "tram",       sl: "tramvaj",            pic: "🚋" },
      { en: "taxi",       sl: "taksi",              pic: "🚕" },
      { en: "lorry",      sl: "tovornjak",          pic: "🚚" },
      { en: "ferry",      sl: "trajekt",            pic: "⛴️" },
      { en: "scooter",    sl: "skiro / skuter",     pic: "🛴" },
      { en: "request",    sl: "prošnja" },
      { en: "suggestion", sl: "predlog" },
      { en: "DJ",         sl: "DJ / voditelj glasbe", pic: "🎧" },
      { en: "ago",        sl: "pred (časovno)" }
    ],
    sentences: [
      { text: "Yesterday I ___ to school by bus. (go)",              answer: "went" },
      { text: "She ___ a new phone last week. (buy)",                answer: "bought" },
      { text: "We ___ a good film two days ago. (see)",              answer: "saw" },
      { text: "They ___ come to the party. (negative)",              answer: "didn't", alt: ["did not"] },
      { text: "___ you eat breakfast? Yes, I did.",                  answer: "Did" },
      { text: "___ you open the window, please? (polite request)",   answer: "Could" },
      { text: "___ we go by tram? (suggestion)",                     answer: "Shall" },
      { text: "I saw him three days ___.",                           answer: "ago" }
    ],
    tests: [
      { q: "I ___ my keys yesterday. (lose)", options: ["lost", "losed", "lose"], answer: "lost" },
      { q: "He ___ to London last year. (go)", options: ["went", "goed", "gone"], answer: "went" },
      { q: "We ___ a great film. (see)", options: ["saw", "seen", "seed"], answer: "saw" },
      { q: "She ___ the answer. (know, negative)", options: ["didn't know", "doesn't know", "didn't knew"], answer: "didn't know" },
      { q: "___ you help me, please? (polite request)", options: ["Could", "Shall", "Let's"], answer: "Could" },
      { q: "___ we take a taxi? (suggestion)", options: ["Shall", "Could", "Do"], answer: "Shall" },
      { q: "I met her two years ___.", options: ["ago", "before", "last"], answer: "ago" },
      { q: "He drove a ___ full of boxes.", options: ["lorry", "ferry", "scooter"], answer: "lorry" },
      { q: "A train that runs under the ground is the ___.", options: ["underground", "tram", "ferry"], answer: "underground" },
      { q: "You cross the sea by ___.", options: ["ferry", "tram", "taxi"], answer: "ferry" }
    ]
  },
  {
    id: "dt2u2", unit: "Unit 2", title: "Ricky's question", icon: "🧭",
    words: [
      { en: "bank",           sl: "banka",           pic: "🏦" },
      { en: "post office",    sl: "pošta",           pic: "📮" },
      { en: "hospital",       sl: "bolnišnica",      pic: "🏥" },
      { en: "church",         sl: "cerkev",          pic: "⛪" },
      { en: "market",         sl: "tržnica" },
      { en: "roundabout",     sl: "krožišče" },
      { en: "crossroads",     sl: "križišče" },
      { en: "traffic lights", sl: "semafor",         pic: "🚦" },
      { en: "town centre",    sl: "središče mesta" },
      { en: "opposite",       sl: "nasproti" },
      { en: "behind",         sl: "za (prostorsko)" },
      { en: "in front of",    sl: "pred (prostorsko)" }
    ],
    sentences: [
      { text: "How do we ___ to the bank?",                            answer: "get" },
      { text: "Go ___ the roundabout and turn left.",                  answer: "past" },
      { text: "The post office is ___ the bank. (across the street)",  answer: "opposite" },
      { text: "The car is ___ the house. (at the back)",               answer: "behind" },
      { text: "The church is ___ the school and the shop.",            answer: "between" },
      { text: "I ___ walking when it started to rain.",                answer: "was" },
      { text: "They ___ having lunch when I called.",                  answer: "were" },
      { text: "What ___ you doing at ten yesterday?",                  answer: "were" }
    ],
    tests: [
      { q: "I ___ TV when you phoned.", options: ["was watching", "watched", "watch"], answer: "was watching" },
      { q: "What ___ they doing at 8 o'clock?", options: ["were", "was", "did"], answer: "were" },
      { q: "While she ___ home, it started to rain.", options: ["was walking", "walked", "walk"], answer: "was walking" },
      { q: "He fell asleep while he ___ TV.", options: ["was watching", "watched", "watches"], answer: "was watching" },
      { q: "The bank is ___ the post office. (across the street)", options: ["opposite", "between", "behind"], answer: "opposite" },
      { q: "Turn left ___ the traffic lights.", options: ["at", "in", "to"], answer: "at" },
      { q: "The post office is ___ the bank and the church.", options: ["between", "under", "at"], answer: "between" },
      { q: "Where can I buy fruit and vegetables? At the ___.", options: ["market", "hospital", "church"], answer: "market" },
      { q: "When you are ill you can go to the ___.", options: ["hospital", "bank", "roundabout"], answer: "hospital" },
      { q: "A place where two roads meet is a ___.", options: ["crossroads", "church", "market"], answer: "crossroads" }
    ]
  },
  {
    id: "dt2u3", unit: "Unit 3", title: "Tina tells Karen the truth", icon: "🍽️",
    words: [
      { en: "menu",        sl: "jedilnik",         pic: "📜" },
      { en: "waiter",      sl: "natakar",          pic: "🤵" },
      { en: "bill",        sl: "račun",            pic: "🧾" },
      { en: "tip",         sl: "napitnina" },
      { en: "starter",     sl: "predjed" },
      { en: "main course", sl: "glavna jed" },
      { en: "dessert",     sl: "sladica",          pic: "🍰" },
      { en: "order",       sl: "naročiti" },
      { en: "vegetarian",  sl: "vegetarijanec",    pic: "🥕" },
      { en: "spicy",       sl: "pekoč / začinjen", pic: "🌶️" },
      { en: "delicious",   sl: "okusen" },
      { en: "opinion",     sl: "mnenje" }
    ],
    sentences: [
      { text: "I think this pizza is ___ than that one. (good)",       answer: "better" },
      { text: "My sister is ___ than me. (tall)",                      answer: "taller" },
      { text: "This book is ___ interesting than that one.",           answer: "more" },
      { text: "He isn't as tall ___ his brother.",                     answer: "as" },
      { text: "You look ill. You ___ see a doctor.",                   answer: "should" },
      { text: "You ___ eat so much sugar. (negative advice)",          answer: "shouldn't" },
      { text: "I love ___ football. (play)",                           answer: "playing" },
      { text: "Could I see the ___, please? (in a restaurant)",        answer: "menu" }
    ],
    tests: [
      { q: "A horse is ___ than a dog. (big)", options: ["bigger", "more big", "biggest"], answer: "bigger" },
      { q: "This test is ___ than the last one. (easy)", options: ["easier", "more easy", "easyer"], answer: "easier" },
      { q: "This film is ___ than that one. (interesting)", options: ["more interesting", "interestinger", "most interesting"], answer: "more interesting" },
      { q: "My phone isn't as good ___ yours.", options: ["as", "than", "like"], answer: "as" },
      { q: "You look ill. You ___ go to the doctor.", options: ["should", "shouldn't", "can't"], answer: "should" },
      { q: "You ___ drink so much cola. It's bad for you.", options: ["shouldn't", "should", "must"], answer: "shouldn't" },
      { q: "I enjoy ___ to music.", options: ["listening", "listen", "to listen"], answer: "listening" },
      { q: "The waiter brings the ___ at the end of the meal.", options: ["bill", "menu", "starter"], answer: "bill" },
      { q: "The sweet dish at the end of a meal is the ___.", options: ["dessert", "starter", "tip"], answer: "dessert" },
      { q: "A person who doesn't eat meat is a ___.", options: ["vegetarian", "waiter", "customer"], answer: "vegetarian" }
    ]
  },
  {
    id: "dt2u4", unit: "Unit 4", title: "The worst day of my life", icon: "😖",
    words: [
      { en: "generous",  sl: "radodaren" },
      { en: "shy",       sl: "sramežljiv" },
      { en: "funny",     sl: "smešen",     pic: "😄" },
      { en: "lazy",      sl: "len",        pic: "🥱" },
      { en: "clever",    sl: "pameten",    pic: "🧠" },
      { en: "polite",    sl: "vljuden" },
      { en: "kind",      sl: "prijazen" },
      { en: "bald",      sl: "plešast" },
      { en: "beard",     sl: "brada",      pic: "🧔" },
      { en: "freckles",  sl: "pege" },
      { en: "moustache", sl: "brki" },
      { en: "price",     sl: "cena",       pic: "🏷️" }
    ],
    sentences: [
      { text: "Ana is the ___ girl in our class. (tall)",           answer: "tallest" },
      { text: "This is the ___ day of my life! (bad)",              answer: "worst" },
      { text: "He is the ___ intelligent boy in the school.",       answer: "most" },
      { text: "How ___ is this T-shirt? Ten euros.",                answer: "much" },
      { text: "How ___ students are there in your class?",          answer: "many" },
      { text: "I have a ___ friends. (not many)",                   answer: "few" },
      { text: "There is a little ___ in the glass.",                answer: "water" },
      { text: "He has a lot ___ books.",                            answer: "of" }
    ],
    tests: [
      { q: "She is the ___ girl in the class. (tall)", options: ["tallest", "taller", "most tall"], answer: "tallest" },
      { q: "This is the ___ film I know. (good)", options: ["best", "better", "goodest"], answer: "best" },
      { q: "It was the ___ day of my life. (bad)", options: ["worst", "worse", "baddest"], answer: "worst" },
      { q: "He is the ___ student in our class. (intelligent)", options: ["most intelligent", "intelligentest", "more intelligent"], answer: "most intelligent" },
      { q: "How ___ is it? Five euros.", options: ["much", "many", "long"], answer: "much" },
      { q: "How ___ people are there? Twenty.", options: ["many", "much", "few"], answer: "many" },
      { q: "There are a ___ apples in the bowl. (not many)", options: ["few", "little", "much"], answer: "few" },
      { q: "There is a ___ milk in the fridge. (not much)", options: ["little", "few", "many"], answer: "little" },
      { q: "A person who doesn't like talking to new people is ___.", options: ["shy", "lazy", "polite"], answer: "shy" },
      { q: "A man with hair on his chin has a ___.", options: ["beard", "freckles", "price"], answer: "beard" }
    ]
  },
  {
    id: "dt2u5", unit: "Unit 5", title: "We'll need a name!", icon: "🎵",
    words: [
      { en: "lyrics",       sl: "besedilo pesmi" },
      { en: "melody",       sl: "melodija" },
      { en: "rhythm",       sl: "ritem" },
      { en: "composer",     sl: "skladatelj" },
      { en: "pop music",    sl: "pop glasba" },
      { en: "rap",          sl: "rap" },
      { en: "classical music", sl: "klasična glasba", pic: "🎻" },
      { en: "volume",       sl: "glasnost",   pic: "🔊" },
      { en: "headphones",   sl: "slušalke",   pic: "🎧" },
      { en: "playlist",     sl: "seznam predvajanja" },
      { en: "choir",        sl: "zbor" },
      { en: "orchestra",    sl: "orkester" }
    ],
    sentences: [
      { text: "Don't worry, I ___ help you.",                       answer: "will", alt: ["'ll"] },
      { text: "I think it ___ rain tomorrow.",                      answer: "will" },
      { text: "We ___ going to visit Rome in summer. (our plan)",   answer: "are" },
      { text: "Look at the sky! It ___ going to rain.",             answer: "is" },
      { text: "___ I carry your bag? (offer)",                      answer: "Shall" },
      { text: "I'll help you ___ your homework.",                   answer: "with" },
      { text: "My parents don't ___ me stay out late.",             answer: "let" },
      { text: "I think people ___ live on Mars one day.",           answer: "will" }
    ],
    tests: [
      { q: "The phone is ringing. I ___ answer it.", options: ["'ll", "am going to", "do"], answer: "'ll" },
      { q: "I think it ___ be sunny tomorrow.", options: ["will", "is going", "does"], answer: "will" },
      { q: "Look at those clouds! It ___ rain.", options: ["is going to", "will", "does"], answer: "is going to" },
      { q: "We ___ visit Rome next summer. It's our plan.", options: ["are going to", "will", "do"], answer: "are going to" },
      { q: "My mum doesn't ___ me stay out late.", options: ["let", "lets", "letting"], answer: "let" },
      { q: "You look tired. I ___ carry your bag. (offer)", options: ["'ll", "am", "do"], answer: "'ll" },
      { q: "The words of a song are the ___.", options: ["lyrics", "melody", "volume"], answer: "lyrics" },
      { q: "You listen to music through ___.", options: ["headphones", "a choir", "rhythm"], answer: "headphones" },
      { q: "A large group of musicians playing classical music is an ___.", options: ["orchestra", "playlist", "rap"], answer: "orchestra" },
      { q: "A person who writes music is a ___.", options: ["composer", "choir", "fan"], answer: "composer" }
    ]
  },
  {
    id: "dt2u6", unit: "Unit 6", title: "The London Eye", icon: "🎡",
    words: [
      { en: "laptop",     sl: "prenosnik",        pic: "💻" },
      { en: "tablet",     sl: "tablični računalnik" },
      { en: "app",        sl: "aplikacija",       pic: "📱" },
      { en: "internet",   sl: "internet",         pic: "🌐" },
      { en: "password",   sl: "geslo",            pic: "🔑" },
      { en: "email",      sl: "e-pošta",          pic: "📧" },
      { en: "satellite",  sl: "satelit",          pic: "🛰️" },
      { en: "invention",  sl: "izum",             pic: "💡" },
      { en: "scientist",  sl: "znanstvenik",      pic: "🧑‍🔬" },
      { en: "wish",       sl: "želja / želeti si", pic: "🌠" },
      { en: "agree",      sl: "strinjati se" },
      { en: "disagree",   sl: "ne se strinjati" }
    ],
    sentences: [
      { text: "I have ___ my homework. (finish)",                   answer: "finished" },
      { text: "She has ___ to London three times. (be)",            answer: "been" },
      { text: "They have already ___ lunch. (eat)",                 answer: "eaten" },
      { text: "He has ___ written the email. (a moment ago)",       answer: "just" },
      { text: "I ___ never seen a whale.",                          answer: "have" },
      { text: "___ you ever used this app?",                        answer: "Have" },
      { text: "I ___ I could fly.",                                 answer: "wish" },
      { text: "I like pizza. — So ___ I.",                          answer: "do" }
    ],
    tests: [
      { q: "I have ___ my keys.", options: ["lost", "lose", "losing"], answer: "lost" },
      { q: "She has ___ this film before.", options: ["seen", "saw", "see"], answer: "seen" },
      { q: "They have ___ finished. (a moment ago)", options: ["just", "ever", "never"], answer: "just" },
      { q: "___ you ever been to London?", options: ["Have", "Did", "Are"], answer: "Have" },
      { q: "He has ___ eaten sushi. (0 times)", options: ["never", "ever", "yet"], answer: "never" },
      { q: "Past participle of 'write': I have ___ a letter.", options: ["written", "wrote", "writed"], answer: "written" },
      { q: "I have ___ to Paris. (I'm back now)", options: ["been", "went", "gone"], answer: "been" },
      { q: "You need a ___ to log in.", options: ["password", "invention", "satellite"], answer: "password" },
      { q: "A person who works in science is a ___.", options: ["scientist", "composer", "waiter"], answer: "scientist" },
      { q: "I like this song. — So ___ I.", options: ["do", "am", "have"], answer: "do" }
    ]
  }
];
