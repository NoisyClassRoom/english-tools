// ============================================================
//  CLASS 7.b/c  -  PROJECT 2 (4th edition)
// ============================================================

window.CLASS_SETS = [
  {
    id: "p2u1", unit: "Unit 1", title: "My life", icon: "📅",
    words: [
      { en: "birthday",        sl: "rojstni dan",        pic: "🎂" },
      { en: "January",         sl: "januar" },
      { en: "December",        sl: "december" },
      { en: "third",           sl: "tretji" },
      { en: "twelfth",         sl: "dvanajsti" },
      { en: "always",          sl: "vedno" },
      { en: "usually",         sl: "običajno" },
      { en: "often",           sl: "pogosto" },
      { en: "sometimes",       sl: "včasih" },
      { en: "never",           sl: "nikoli" },
      { en: "housework",       sl: "gospodinjska opravila", pic: "🧹" },
      { en: "wash the dishes", sl: "pomiti posodo",      pic: "🧽" }
    ],
    sentences: [
      { text: "January is the ___ month of the year.",           answer: "first" },
      { text: "December is the ___ month of the year.",          answer: "twelfth" },
      { text: "I ___ eat meat. I'm a vegetarian.",               answer: "never" },
      { text: "She ___ goes to bed late, but not every day.",    answer: "sometimes" },
      { text: "Ana ___ her homework every day.",                 answer: "does" },
      { text: "My dad doesn't ___ in a bank.",                   answer: "work" },
      { text: "___ she like pizza? Yes, she does.",              answer: "Does" },
      { text: "I ___ my bed every morning.",                     answer: "make" }
    ],
    tests: [
      { q: "She ___ to school by bus.", options: ["go", "goes", "going"], answer: "goes" },
      { q: "He ___ like coffee.", options: ["don't", "doesn't", "isn't"], answer: "doesn't" },
      { q: "___ your mother work in a shop?", options: ["Do", "Does", "Is"], answer: "Does" },
      { q: "My birthday is on the ___ of March.", options: ["third", "three", "threeth"], answer: "third" },
      { q: "I ___ watch TV in the morning. (0%)", options: ["never", "always", "usually"], answer: "never" },
      { q: "We ___ have lunch at school. (every day)", options: ["always", "never", "sometimes"], answer: "always" },
      { q: "There are twelve ___ in a year.", options: ["months", "days", "weeks"], answer: "months" },
      { q: "What ___ do you get up? At seven.", options: ["time", "hour", "clock"], answer: "time" },
      { q: "How ___ do you go to the cinema? Twice a month.", options: ["often", "many", "much"], answer: "often" },
      { q: "My sister ___ the dishes after dinner.", options: ["washes", "wash", "washing"], answer: "washes" }
    ]
  },
  {
    id: "p2u2", unit: "Unit 2", title: "Animals", icon: "🦁",
    words: [
      { en: "lion",      sl: "lev",      pic: "🦁" },
      { en: "elephant",  sl: "slon",     pic: "🐘" },
      { en: "monkey",    sl: "opica",    pic: "🐒" },
      { en: "giraffe",   sl: "žirafa",   pic: "🦒" },
      { en: "zebra",     sl: "zebra",    pic: "🦓" },
      { en: "crocodile", sl: "krokodil", pic: "🐊" },
      { en: "snake",     sl: "kača",     pic: "🐍" },
      { en: "bear",      sl: "medved",   pic: "🐻" },
      { en: "dolphin",   sl: "delfin",   pic: "🐬" },
      { en: "frog",      sl: "žaba",     pic: "🐸" },
      { en: "mammal",    sl: "sesalec" },
      { en: "reptile",   sl: "plazilec", pic: "🦎" }
    ],
    sentences: [
      { text: "The monkey ___ climbing a tree now.",            answer: "is" },
      { text: "Look! The lions ___ sleeping.",                  answer: "are" },
      { text: "___ the elephant eating? Yes, it is.",           answer: "Is" },
      { text: "A cow ___ grass every day.",                     answer: "eats" },
      { text: "The dolphins are ___ in the sea at the moment.", answer: "swimming" },
      { text: "Tom is my friend. Do you know ___?",             answer: "him" },
      { text: "Give the banana to Ana and ___.",                answer: "me" },
      { text: "You ___ feed the animals. It's forbidden.",      answer: "mustn't", alt: ["must not"] }
    ],
    tests: [
      { q: "Look! The elephant ___ water.", options: ["is drinking", "drinks", "drink"], answer: "is drinking" },
      { q: "The lion ___ meat every day.", options: ["eats", "is eating", "eating"], answer: "eats" },
      { q: "___ the monkeys playing? Yes, they are.", options: ["Are", "Do", "Is"], answer: "Are" },
      { q: "The zebra isn't ___ now.", options: ["running", "runs", "run"], answer: "running" },
      { q: "Tell ___ about your pet.", options: ["me", "I", "my"], answer: "me" },
      { q: "Ana is my friend. I like ___.", options: ["her", "she", "hers"], answer: "her" },
      { q: "You ___ do your homework. It is necessary.", options: ["must", "mustn't", "can't"], answer: "must" },
      { q: "What ___ the dolphin doing?", options: ["is", "are", "does"], answer: "is" },
      { q: "A snake is a ___.", options: ["reptile", "mammal", "bird"], answer: "reptile" },
      { q: "A dolphin is a ___.", options: ["mammal", "reptile", "insect"], answer: "mammal" }
    ]
  },
  {
    id: "p2u3", unit: "Unit 3", title: "Holidays", icon: "🏖️",
    words: [
      { en: "holiday",  sl: "počitnice",      pic: "🌴" },
      { en: "beach",    sl: "plaža",          pic: "🏖️" },
      { en: "suitcase", sl: "kovček",         pic: "🧳" },
      { en: "passport", sl: "potni list",     pic: "🛂" },
      { en: "tent",     sl: "šotor",          pic: "⛺" },
      { en: "postcard", sl: "razglednica",    pic: "💌" },
      { en: "plane",    sl: "letalo",         pic: "✈️" },
      { en: "train",    sl: "vlak",           pic: "🚆" },
      { en: "ship",     sl: "ladja",          pic: "🚢" },
      { en: "bus",      sl: "avtobus",        pic: "🚌" },
      { en: "ticket",   sl: "vozovnica",      pic: "🎫" },
      { en: "hotel",    sl: "hotel",          pic: "🏨" }
    ],
    sentences: [
      { text: "Yesterday I ___ at home.",                       answer: "was" },
      { text: "They ___ in London last week.",                  answer: "were" },
      { text: "___ you at school yesterday? No, I wasn't.",     answer: "Were" },
      { text: "We ___ to Italy last summer. (go)",              answer: "went" },
      { text: "She ___ a postcard to her friend. (write)",      answer: "wrote" },
      { text: "I ___ visit the museum. (negative)",             answer: "didn't", alt: ["did not"] },
      { text: "Ana ___ pizza for dinner. (have)",               answer: "had" },
      { text: "___ you enjoy the holiday? Yes, I did.",         answer: "Did" }
    ],
    tests: [
      { q: "I ___ at the beach yesterday.", options: ["was", "were", "am"], answer: "was" },
      { q: "They ___ on holiday last week.", options: ["was", "were", "are"], answer: "were" },
      { q: "We ___ football yesterday.", options: ["played", "play", "plays"], answer: "played" },
      { q: "She ___ to Spain last year.", options: ["goed", "went", "gone"], answer: "went" },
      { q: "He ___ like the hotel.", options: ["didn't", "doesn't", "wasn't"], answer: "didn't" },
      { q: "___ you visit London? Yes, I did.", options: ["Did", "Do", "Were"], answer: "Did" },
      { q: "Last summer I ___ a lot of photos. (take)", options: ["took", "taked", "take"], answer: "took" },
      { q: "I ___ my ticket at the station. (buy)", options: ["bought", "buyed", "buy"], answer: "bought" },
      { q: "You need a ___ to fly to another country.", options: ["passport", "tent", "postcard"], answer: "passport" },
      { q: "We slept in a ___ at the campsite.", options: ["tent", "plane", "ticket"], answer: "tent" }
    ]
  },
  {
    id: "p2u4", unit: "Unit 4", title: "Food", icon: "🍲",
    words: [
      { en: "vegetables", sl: "zelenjava", pic: "🥦" },
      { en: "fruit",      sl: "sadje",     pic: "🍓" },
      { en: "meat",       sl: "meso",      pic: "🥩" },
      { en: "butter",     sl: "maslo",     pic: "🧈" },
      { en: "sugar",      sl: "sladkor" },
      { en: "flour",      sl: "moka" },
      { en: "sausage",    sl: "klobasa",   pic: "🌭" },
      { en: "soup",       sl: "juha",      pic: "🍲" },
      { en: "ice cream",  sl: "sladoled",  pic: "🍦" },
      { en: "spoon",      sl: "žlica",     pic: "🥄" },
      { en: "knife",      sl: "nož",       pic: "🔪" },
      { en: "plate",      sl: "krožnik",   pic: "🍽️" }
    ],
    sentences: [
      { text: "I'd like ___ apple, please.",                answer: "an" },
      { text: "There isn't ___ milk in the fridge.",        answer: "any" },
      { text: "There is ___ bread on the table.",           answer: "some" },
      { text: "How ___ sugar do you need?",                 answer: "much" },
      { text: "How ___ eggs are there?",                    answer: "many" },
      { text: "Water is an ___ noun.",                      answer: "uncountable" },
      { text: "Pass me ___ salt, please. (the one on the table)", answer: "the" },
      { text: "I have a dog. ___ dog is black.",            answer: "The" }
    ],
    tests: [
      { q: "How ___ apples are there?", options: ["many", "much", "some"], answer: "many" },
      { q: "How ___ milk do you drink?", options: ["much", "many", "any"], answer: "much" },
      { q: "There aren't ___ eggs.", options: ["any", "some", "a"], answer: "any" },
      { q: "There is ___ cheese on the table.", options: ["some", "an", "a"], answer: "some" },
      { q: "I eat ___ apple every day.", options: ["an", "a", "some"], answer: "an" },
      { q: "Which word is countable?", options: ["banana", "water", "butter"], answer: "banana" },
      { q: "Which word is uncountable?", options: ["flour", "egg", "sausage"], answer: "flour" },
      { q: "Give me ___ spoon, please. (one)", options: ["a", "an", "any"], answer: "a" },
      { q: "Is there ___ soup? Yes, there is some.", options: ["any", "some", "an"], answer: "any" },
      { q: "I have a cat. ___ cat is white.", options: ["The", "A", "Some"], answer: "The" }
    ]
  },
  {
    id: "p2u5", unit: "Unit 5", title: "The world", icon: "🌍",
    words: [
      { en: "mountain",  sl: "gora",    pic: "⛰️" },
      { en: "river",     sl: "reka",    pic: "🏞️" },
      { en: "lake",      sl: "jezero" },
      { en: "sea",       sl: "morje",   pic: "🌊" },
      { en: "island",    sl: "otok",    pic: "🏝️" },
      { en: "desert",    sl: "puščava", pic: "🏜️" },
      { en: "forest",    sl: "gozd",    pic: "🌲" },
      { en: "north",     sl: "sever" },
      { en: "south",     sl: "jug" },
      { en: "east",      sl: "vzhod" },
      { en: "west",      sl: "zahod" },
      { en: "continent", sl: "celina" }
    ],
    sentences: [
      { text: "An elephant is ___ than a mouse. (big)",              answer: "bigger" },
      { text: "Maths is ___ than Art for me. (difficult)",           answer: "more difficult" },
      { text: "Mount Everest is the ___ mountain in the world. (high)", answer: "highest" },
      { text: "Winter is ___ than summer. (cold)",                   answer: "colder" },
      { text: "This is the ___ film I know. (good)",                 answer: "best" },
      { text: "My phone is ___ than yours. (good)",                  answer: "better" },
      { text: "How ___ is the river? 300 km.",                       answer: "long" },
      { text: "The Sahara is the biggest ___ in the world.",         answer: "desert" }
    ],
    tests: [
      { q: "A giraffe is ___ than a horse.", options: ["taller", "more tall", "tallest"], answer: "taller" },
      { q: "This book is ___ than that one. (interesting)", options: ["more interesting", "interestinger", "most interesting"], answer: "more interesting" },
      { q: "Russia is the ___ country in the world.", options: ["biggest", "bigger", "most big"], answer: "biggest" },
      { q: "Summer is ___ than winter. (warm)", options: ["warmer", "warmest", "more warm"], answer: "warmer" },
      { q: "This is the ___ day of my life. (good)", options: ["best", "better", "goodest"], answer: "best" },
      { q: "The weather today is ___ than yesterday. (bad)", options: ["worse", "worst", "badder"], answer: "worse" },
      { q: "How ___ is Mount Triglav? 2,864 m.", options: ["high", "long", "wide"], answer: "high" },
      { q: "The sun rises in the ___.", options: ["east", "west", "south"], answer: "east" },
      { q: "Land with water all around it is an ___.", options: ["island", "lake", "desert"], answer: "island" },
      { q: "A very dry place with sand is a ___.", options: ["desert", "forest", "river"], answer: "desert" }
    ]
  },
  {
    id: "p2u6", unit: "Unit 6", title: "Entertainment", icon: "🎬",
    words: [
      { en: "TV programme", sl: "televizijska oddaja", pic: "📺" },
      { en: "news",         sl: "novice" },
      { en: "cartoon",      sl: "risanka" },
      { en: "comedy",       sl: "komedija",   pic: "😂" },
      { en: "horror film",  sl: "grozljivka", pic: "👻" },
      { en: "actor",        sl: "igralec" },
      { en: "actress",      sl: "igralka" },
      { en: "director",     sl: "režiser" },
      { en: "audience",     sl: "občinstvo",  pic: "👏" },
      { en: "theatre",      sl: "gledališče", pic: "🎭" },
      { en: "screen",       sl: "platno / zaslon" },
      { en: "famous",       sl: "slaven" }
    ],
    sentences: [
      { text: "I'm ___ to watch a film tonight.",               answer: "going" },
      { text: "She is ___ to visit her grandma.",               answer: "going" },
      { text: "He is a good singer. He sings ___.",             answer: "well" },
      { text: "She is a quick runner. She runs ___.",           answer: "quickly" },
      { text: "You ___ to wear a helmet. It is a rule.",        answer: "have" },
      { text: "We don't ___ to wear a uniform.",                answer: "have" },
      { text: "___ we go to the cinema? (suggestion)",          answer: "Shall" },
      { text: "Why don't we ___ a film? (watch)",               answer: "watch" }
    ],
    tests: [
      { q: "I ___ going to watch TV tonight.", options: ["am", "is", "are"], answer: "am" },
      { q: "They are going ___ a film.", options: ["to watch", "watch", "watching"], answer: "to watch" },
      { q: "Is she going to sing? Yes, she ___.", options: ["is", "does", "will"], answer: "is" },
      { q: "He is a slow walker. He walks ___.", options: ["slowly", "slow", "slowy"], answer: "slowly" },
      { q: "She sings ___. (good)", options: ["well", "good", "goodly"], answer: "well" },
      { q: "I ___ to do my homework. It is necessary.", options: ["have", "has", "am"], answer: "have" },
      { q: "He ___ to wear a uniform.", options: ["has", "have", "is"], answer: "has" },
      { q: "___ we play a game? (suggestion)", options: ["Shall", "Must", "Are"], answer: "Shall" },
      { q: "A person who acts in a film is an ___.", options: ["actor", "director", "audience"], answer: "actor" },
      { q: "A funny film is a ___.", options: ["comedy", "horror film", "news"], answer: "comedy" }
    ]
  }
];
