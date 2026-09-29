// ============================================================
//  CLASS 8.b  -  PROJECT 3 (4th edition)
// ============================================================

window.CLASS_SETS = [
  {
    id: "p3u1", unit: "Unit 1", title: "My life", icon: "🏠",
    words: [
      { en: "fantastic",  sl: "fantastično",   pic: "🤩" },
      { en: "exciting",   sl: "razburljivo" },
      { en: "boring",     sl: "dolgočasno",    pic: "😴" },
      { en: "terrible",   sl: "grozno" },
      { en: "surprised",  sl: "presenečen",    pic: "😲" },
      { en: "nervous",    sl: "nervozen",      pic: "😬" },
      { en: "proud",      sl: "ponosen" },
      { en: "relatives",  sl: "sorodniki" },
      { en: "twin",       sl: "dvojček" },
      { en: "stepmother", sl: "mačeha" },
      { en: "invite",     sl: "povabiti",      pic: "💌" },
      { en: "introduce",  sl: "predstaviti" }
    ],
    sentences: [
      { text: "Yesterday we ___ to the cinema. (go)",              answer: "went" },
      { text: "She ___ me a surprise present. (give)",             answer: "gave" },
      { text: "___ you see the film last night? Yes, I did.",      answer: "Did" },
      { text: "I didn't ___ the answer. (know)",                   answer: "know" },
      { text: "They ___ a new house last year. (buy)",             answer: "bought" },
      { text: "My aunt's children are my ___.",                    answer: "cousins" },
      { text: "I'm really ___ about my exam tomorrow.",            answer: "nervous" },
      { text: "I'd like to ___ you to my party.",                  answer: "invite" }
    ],
    tests: [
      { q: "I ___ my keys yesterday.", options: ["lost", "loosed", "lose"], answer: "lost" },
      { q: "She ___ to school by bike last year.", options: ["rode", "ridden", "rided"], answer: "rode" },
      { q: "___ they win the match?", options: ["Did", "Do", "Were"], answer: "Did" },
      { q: "He didn't ___ the letter.", options: ["read", "reads", "readed"], answer: "read" },
      { q: "We ___ a great time at the party.", options: ["had", "haved", "have"], answer: "had" },
      { q: "I ___ my homework last night.", options: ["didn't do", "don't did", "didn't did"], answer: "didn't do" },
      { q: "This is my ___ bike. It belongs to my brother.", options: ["brother's", "brothers", "brothers'"], answer: "brother's" },
      { q: "I'd like to ___ you to my birthday party.", options: ["invite", "invent", "visit"], answer: "invite" },
      { q: "Your mother's second husband is your ___.", options: ["stepfather", "uncle", "cousin"], answer: "stepfather" },
      { q: "The film was ___! I loved it.", options: ["fantastic", "terrible", "boring"], answer: "fantastic" }
    ]
  },
  {
    id: "p3u2", unit: "Unit 2", title: "The future", icon: "🚀",
    words: [
      { en: "space",        sl: "vesolje",          pic: "🌌" },
      { en: "planet",       sl: "planet",           pic: "🪐" },
      { en: "rocket",       sl: "raketa",           pic: "🚀" },
      { en: "astronaut",    sl: "astronavt",        pic: "👩‍🚀" },
      { en: "star",         sl: "zvezda",           pic: "⭐" },
      { en: "moon",         sl: "luna",             pic: "🌙" },
      { en: "Mars",         sl: "Mars",             pic: "🔴" },
      { en: "solar system", sl: "osončje" },
      { en: "spaceship",    sl: "vesoljska ladja",  pic: "🛸" },
      { en: "engineer",     sl: "inženir",          pic: "🧑‍🔧" },
      { en: "hope",         sl: "upati" },
      { en: "probably",     sl: "verjetno" }
    ],
    sentences: [
      { text: "I think people ___ live on Mars in 2100.",       answer: "will" },
      { text: "Don't worry, I ___ help you.",                   answer: "will", alt: ["'ll"] },
      { text: "It's cold. I ___ close the window.",             answer: "will", alt: ["'ll"] },
      { text: "I ___ think robots will do all the jobs.",       answer: "don't" },
      { text: "I hope it ___ rain tomorrow. (negative)",        answer: "won't" },
      { text: "I'm ___ to study medicine. (my plan)",           answer: "going" },
      { text: "Will you be rich? No, I ___.",                   answer: "won't" },
      { text: "We live on planet ___.",                         answer: "Earth" }
    ],
    tests: [
      { q: "I think it ___ rain tomorrow.", options: ["will", "is", "does"], answer: "will" },
      { q: "Will he win? No, he ___.", options: ["won't", "doesn't", "isn't"], answer: "won't" },
      { q: "The phone is ringing. I ___ answer it! (decision now)", options: ["'ll", "am going to", "am"], answer: "'ll" },
      { q: "Look at those black clouds! It ___ rain. (evidence)", options: ["is going to", "will", "does"], answer: "is going to" },
      { q: "We ___ visit Spain next summer. (our plan)", options: ["are going to", "are", "do"], answer: "are going to" },
      { q: "I think robots ___ teach us in the future.", options: ["will", "are", "do"], answer: "will" },
      { q: "The ___ goes around the Earth.", options: ["moon", "Mars", "rocket"], answer: "moon" },
      { q: "A person who travels in space is an ___.", options: ["astronaut", "engineer", "actor"], answer: "astronaut" },
      { q: "I ___ think it will snow. (negative opinion)", options: ["don't", "won't", "not"], answer: "don't" },
      { q: "Mars is a ___.", options: ["planet", "star", "rocket"], answer: "planet" }
    ]
  },
  {
    id: "p3u3", unit: "Unit 3", title: "Times and places", icon: "🌪️",
    words: [
      { en: "earthquake",  sl: "potres" },
      { en: "flood",       sl: "poplava",        pic: "🌊" },
      { en: "storm",       sl: "nevihta",        pic: "⛈️" },
      { en: "fire",        sl: "požar",          pic: "🔥" },
      { en: "volcano",     sl: "vulkan",         pic: "🌋" },
      { en: "hurricane",   sl: "orkan",          pic: "🌀" },
      { en: "dining room", sl: "jedilnica" },
      { en: "attic",       sl: "podstrešje" },
      { en: "cellar",      sl: "klet" },
      { en: "staircase",   sl: "stopnišče" },
      { en: "time zone",   sl: "časovni pas",    pic: "🕒" },
      { en: "pyjamas",     sl: "pižama" }
    ],
    sentences: [
      { text: "At 8 o'clock last night I ___ watching TV.",          answer: "was" },
      { text: "They ___ playing football when it started to rain.",  answer: "were" },
      { text: "What ___ you doing at 6 o'clock?",                    answer: "were" },
      { text: "I was sleeping when the phone ___.",                  answer: "rang" },
      { text: "While she was cooking, the lights ___ out.",          answer: "went" },
      { text: "He ___ walking home when he saw an accident.",        answer: "was" },
      { text: "The village was under water after the ___.",          answer: "flood" },
      { text: "We keep old things in the ___, under the roof.",      answer: "attic" }
    ],
    tests: [
      { q: "I ___ TV when the phone rang.", options: ["was watching", "watched", "am watching"], answer: "was watching" },
      { q: "They ___ football at 5 o'clock.", options: ["were playing", "played", "was playing"], answer: "were playing" },
      { q: "What ___ you doing at 8 o'clock yesterday?", options: ["were", "was", "did"], answer: "were" },
      { q: "While I ___, my brother arrived.", options: ["was cooking", "cooked", "cook"], answer: "was cooking" },
      { q: "She was walking when she ___ a wallet.", options: ["found", "was finding", "find"], answer: "found" },
      { q: "___ he sleeping when you called? Yes, he was.", options: ["Was", "Were", "Did"], answer: "Was" },
      { q: "A very strong wind is a ___.", options: ["hurricane", "flood", "volcano"], answer: "hurricane" },
      { q: "It rained a lot and there was a ___ in the town.", options: ["flood", "fire", "attic"], answer: "flood" },
      { q: "I wear ___ in bed.", options: ["pyjamas", "a staircase", "a cellar"], answer: "pyjamas" },
      { q: "Ljubljana and London are in different ___ zones.", options: ["time", "weather", "climate"], answer: "time" }
    ]
  },
  {
    id: "p3u4", unit: "Unit 4", title: "London", icon: "🇬🇧",
    words: [
      { en: "palace",         sl: "palača",            pic: "👑" },
      { en: "square",         sl: "trg" },
      { en: "statue",         sl: "kip",               pic: "🗿" },
      { en: "bridge",         sl: "most",              pic: "🌉" },
      { en: "tower",          sl: "stolp",             pic: "🗼" },
      { en: "museum",         sl: "muzej",             pic: "🏛️" },
      { en: "station",        sl: "postaja",           pic: "🚉" },
      { en: "police station", sl: "policijska postaja", pic: "👮" },
      { en: "street",         sl: "ulica" },
      { en: "corner",         sl: "vogal" },
      { en: "turn left",      sl: "zavij levo",        pic: "⬅️" },
      { en: "straight on",    sl: "naravnost",         pic: "⬆️" }
    ],
    sentences: [
      { text: "London is ___ capital of England.",                  answer: "the" },
      { text: "Buckingham Palace is ___ famous building in London.", answer: "a" },
      { text: "I have an appointment at ___ doctor's.",             answer: "the" },
      { text: "How do I ___ to the station?",                       answer: "get" },
      { text: "Turn ___ at the corner. (not right)",                answer: "left" },
      { text: "Go ___ ahead, then turn right.",                     answer: "straight" },
      { text: "There's ___ in the room. It's empty. (no person)",   answer: "nobody" },
      { text: "I'm hungry. I want to eat ___.",                     answer: "something" }
    ],
    tests: [
      { q: "The Thames is ___ river in London.", options: ["the", "a", "an"], answer: "the" },
      { q: "He is at ___ doctor's.", options: ["the", "a", "an"], answer: "the" },
      { q: "Excuse me, how do I ___ to the museum?", options: ["get", "take", "arrive"], answer: "get" },
      { q: "Go ___ and turn left at the corner.", options: ["straight on", "straight to", "straight in"], answer: "straight on" },
      { q: "The bank is ___ the library and the post office.", options: ["between", "on", "at"], answer: "between" },
      { q: "There is ___ at the door. Who is it? (a person)", options: ["somebody", "something", "nowhere"], answer: "somebody" },
      { q: "I can't see ___. It's dark.", options: ["anything", "everybody", "nobody"], answer: "anything" },
      { q: "___ knows the answer. It's too difficult. (no person)", options: ["Nobody", "Anybody", "Somebody"], answer: "Nobody" },
      { q: "A big house where a king or queen lives is a ___.", options: ["palace", "station", "square"], answer: "palace" },
      { q: "You can cross the river by a ___.", options: ["bridge", "tower", "statue"], answer: "bridge" }
    ]
  },
  {
    id: "p3u5", unit: "Unit 5", title: "Experiences", icon: "🏆",
    words: [
      { en: "successful",  sl: "uspešen" },
      { en: "famous",      sl: "slaven",       pic: "🌟" },
      { en: "hero",        sl: "junak",        pic: "🦸" },
      { en: "heroine",     sl: "junakinja",    pic: "🦸‍♀️" },
      { en: "climb",       sl: "plezati",      pic: "🧗" },
      { en: "recycle",     sl: "reciklirati",  pic: "♻️" },
      { en: "pollution",   sl: "onesnaževanje" },
      { en: "environment", sl: "okolje",       pic: "🌱" },
      { en: "endangered",  sl: "ogrožen" },
      { en: "rubbish",     sl: "smeti",        pic: "🗑️" },
      { en: "ever",        sl: "kdaj (že)" },
      { en: "never",       sl: "nikoli" }
    ],
    sentences: [
      { text: "I have ___ been to London. (0 times)",              answer: "never" },
      { text: "Have you ___ climbed a mountain?",                  answer: "ever" },
      { text: "She has just ___ home. (come)",                     answer: "come" },
      { text: "They have ___ their homework. (finish)",            answer: "finished" },
      { text: "We ___ seen that film. (negative)",                 answer: "haven't" },
      { text: "He has ___ three books. (write)",                   answer: "written" },
      { text: "She ___ never eaten sushi.",                        answer: "has" },
      { text: "___ you ever been to Italy?",                       answer: "Have" }
    ],
    tests: [
      { q: "I have ___ to Rome.", options: ["been", "was", "be"], answer: "been" },
      { q: "She has ___ her homework.", options: ["done", "did", "do"], answer: "done" },
      { q: "They ___ finished yet.", options: ["haven't", "hasn't", "didn't"], answer: "haven't" },
      { q: "___ you ever eaten pizza?", options: ["Have", "Has", "Did"], answer: "Have" },
      { q: "He has just ___ the door.", options: ["opened", "open", "opens"], answer: "opened" },
      { q: "We have ___ visited Paris. (0 times)", options: ["never", "ever", "just"], answer: "never" },
      { q: "It has ___ started to rain. (a moment ago)", options: ["just", "ever", "never"], answer: "just" },
      { q: "She ___ never seen snow.", options: ["has", "have", "is"], answer: "has" },
      { q: "A person who does something very brave is a ___.", options: ["hero", "pollution", "rubbish"], answer: "hero" },
      { q: "We should ___ paper and plastic.", options: ["recycle", "climb", "invite"], answer: "recycle" }
    ]
  },
  {
    id: "p3u6", unit: "Unit 6", title: "Problems", icon: "🚑",
    words: [
      { en: "headache",    sl: "glavobol",     pic: "🤕" },
      { en: "toothache",   sl: "zobobol",      pic: "🦷" },
      { en: "cough",       sl: "kašelj" },
      { en: "cold",        sl: "prehlad",      pic: "🤧" },
      { en: "fever",       sl: "vročina",      pic: "🤒" },
      { en: "sore throat", sl: "vneto grlo" },
      { en: "medicine",    sl: "zdravilo",     pic: "💊" },
      { en: "ambulance",   sl: "rešilec",      pic: "🚑" },
      { en: "emergency",   sl: "nujni primer", pic: "🚨" },
      { en: "rule",        sl: "pravilo" },
      { en: "advice",      sl: "nasvet" },
      { en: "eyesight",    sl: "vid",          pic: "👀" }
    ],
    sentences: [
      { text: "You have a headache. You ___ take a tablet.",          answer: "should" },
      { text: "You ___ eat so many sweets. (advice, negative)",       answer: "shouldn't" },
      { text: "You ___ run in the corridor. It is forbidden.",        answer: "mustn't", alt: ["must not"] },
      { text: "You ___ wear a uniform in our school. It's not necessary.", answer: "don't have to" },
      { text: "I ___ finish this today. I have no choice.",           answer: "must" },
      { text: "Please sit ___.",                                      answer: "down" },
      { text: "Put your coat ___ before you go out.",                 answer: "on" },
      { text: "Call an ___ if someone is badly hurt.",                answer: "ambulance" }
    ],
    tests: [
      { q: "You've got a cold. You ___ stay at home.", options: ["should", "shouldn't", "mustn't"], answer: "should" },
      { q: "You ___ watch TV all day. It's bad for you.", options: ["shouldn't", "should", "must"], answer: "shouldn't" },
      { q: "Students ___ use phones in the exam. It's forbidden.", options: ["mustn't", "don't have to", "shouldn't"], answer: "mustn't" },
      { q: "You ___ bring a pen. I have some. (not necessary)", options: ["don't have to", "mustn't", "must"], answer: "don't have to" },
      { q: "I feel sick and I have a high temperature. I have a ___.", options: ["fever", "rule", "ambulance"], answer: "fever" },
      { q: "Please ___ down. The lesson is starting.", options: ["sit", "sat", "sitting"], answer: "sit" },
      { q: "Get ___ the bus at the next stop.", options: ["off", "in", "at"], answer: "off" },
      { q: "My tooth hurts. I have a ___.", options: ["toothache", "headache", "cough"], answer: "toothache" },
      { q: "In an ___ call 112.", options: ["emergency", "advice", "medicine"], answer: "emergency" },
      { q: "Try ___ this jacket. Is it your size?", options: ["on", "up", "at"], answer: "on" }
    ]
  }
];
