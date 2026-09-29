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
  },
  {
    id: "animals",
    title: "Animals",
    icon: "🐶",
    words: [
      { en: "dog",    sl: "pes",     pic: "🐶" },
      { en: "cat",    sl: "mačka",   pic: "🐱" },
      { en: "horse",  sl: "konj",    pic: "🐴" },
      { en: "cow",    sl: "krava",   pic: "🐮" },
      { en: "pig",    sl: "prašič",  pic: "🐷" },
      { en: "sheep",  sl: "ovca",    pic: "🐑" },
      { en: "rabbit", sl: "zajec",   pic: "🐰" },
      { en: "bird",   sl: "ptica",   pic: "🐦" },
      { en: "fish",   sl: "riba",    pic: "🐟" },
      { en: "mouse",  sl: "miš",     pic: "🐭" }
    ],
    sentences: [
      { text: "A ___ says woof.",              answer: "dog" },
      { text: "A ___ says meow.",              answer: "cat" },
      { text: "A ___ gives us milk.",          answer: "cow" },
      { text: "A ___ can fly.",                answer: "bird" },
      { text: "A ___ lives in water.",         answer: "fish" },
      { text: "A ___ likes to eat cheese.",    answer: "mouse" }
    ]
  },
  {
    id: "family",
    title: "Family",
    icon: "👨‍👩‍👧",
    words: [
      { en: "mother",      sl: "mama",     pic: "👩" },
      { en: "father",      sl: "oče",      pic: "👨" },
      { en: "sister",      sl: "sestra",   pic: "👧" },
      { en: "brother",     sl: "brat",     pic: "👦" },
      { en: "grandmother", sl: "babica",   pic: "👵" },
      { en: "grandfather", sl: "dedek",    pic: "👴" },
      { en: "baby",        sl: "dojenček", pic: "👶" },
      { en: "aunt",        sl: "teta" },
      { en: "uncle",       sl: "stric" },
      { en: "cousin",      sl: "bratranec / sestrična" }
    ],
    sentences: [
      { text: "My mother's mother is my ___.",  answer: "grandmother" },
      { text: "My father's father is my ___.",  answer: "grandfather" },
      { text: "My mother's sister is my ___.",  answer: "aunt" },
      { text: "My father's brother is my ___.", answer: "uncle" },
      { text: "My mother's son is my ___.",     answer: "brother" },
      { text: "My uncle's daughter is my ___.", answer: "cousin" }
    ]
  },
  {
    id: "food",
    title: "Food and drink",
    icon: "🍎",
    words: [
      { en: "apple",   sl: "jabolko", pic: "🍎" },
      { en: "bread",   sl: "kruh",    pic: "🍞" },
      { en: "cheese",  sl: "sir",     pic: "🧀" },
      { en: "milk",    sl: "mleko",   pic: "🥛" },
      { en: "egg",     sl: "jajce",   pic: "🥚" },
      { en: "chicken", sl: "piščanec", pic: "🍗" },
      { en: "rice",    sl: "riž",     pic: "🍚" },
      { en: "banana",  sl: "banana",  pic: "🍌" },
      { en: "water",   sl: "voda",    pic: "💧" },
      { en: "pizza",   sl: "pica",    pic: "🍕" }
    ],
    sentences: [
      { text: "I drink ___ with my cereal.",          answer: "milk" },
      { text: "I make a sandwich with ___.",          answer: "bread" },
      { text: "Mice love ___.",                       answer: "cheese" },
      { text: "I am thirsty. I need some ___.",       answer: "water" },
      { text: "A monkey likes to eat a ___.",         answer: "banana" },
      { text: "An omelette is made from ___.",        answer: "eggs", alt: ["egg"] }
    ]
  },
  {
    id: "clothes",
    title: "Clothes",
    icon: "👕",
    words: [
      { en: "shirt",    sl: "majica",   pic: "👕" },
      { en: "trousers", sl: "hlače",    pic: "👖" },
      { en: "dress",    sl: "obleka",   pic: "👗" },
      { en: "shoes",    sl: "čevlji",   pic: "👟" },
      { en: "socks",    sl: "nogavice", pic: "🧦" },
      { en: "hat",      sl: "klobuk",   pic: "👒" },
      { en: "jacket",   sl: "jakna",    pic: "🧥" },
      { en: "scarf",    sl: "šal",      pic: "🧣" },
      { en: "gloves",   sl: "rokavice", pic: "🧤" },
      { en: "skirt",    sl: "krilo" }
    ],
    sentences: [
      { text: "I wear ___ on my feet.",              answer: "shoes", alt: ["socks"] },
      { text: "I wear ___ on my hands in winter.",   answer: "gloves" },
      { text: "I wear a ___ on my head.",            answer: "hat" },
      { text: "I wear ___ on my legs.",              answer: "trousers" },
      { text: "In winter I wear a warm ___.",        answer: "jacket", alt: ["scarf", "hat"] },
      { text: "A ___ keeps my neck warm.",           answer: "scarf" }
    ]
  },
  {
    id: "weather",
    title: "Weather",
    icon: "⛅",
    words: [
      { en: "sunny",   sl: "sončno",   pic: "☀️" },
      { en: "rainy",   sl: "deževno",  pic: "🌧️" },
      { en: "cloudy",  sl: "oblačno",  pic: "☁️" },
      { en: "windy",   sl: "vetrovno", pic: "💨" },
      { en: "snowy",   sl: "snežno",   pic: "❄️" },
      { en: "stormy",  sl: "nevihtno", pic: "⛈️" },
      { en: "foggy",   sl: "megleno",  pic: "🌫️" },
      { en: "hot",     sl: "vroče",    pic: "🥵" },
      { en: "cold",    sl: "mrzlo",    pic: "🥶" },
      { en: "rainbow", sl: "mavrica",  pic: "🌈" }
    ],
    sentences: [
      { text: "It is ___ today, so I take an umbrella.",         answer: "rainy" },
      { text: "Put on your sunglasses. It is ___.",              answer: "sunny" },
      { text: "We can build a snowman when it is ___.",          answer: "snowy", alt: ["cold"] },
      { text: "There is thunder and lightning. It is ___.",      answer: "stormy" },
      { text: "The sky is grey and full of clouds. It is ___.",  answer: "cloudy" },
      { text: "You can't see far when it is ___.",               answer: "foggy" }
    ]
  },
  {
    id: "jobs",
    title: "Jobs",
    icon: "👩‍🏫",
    words: [
      { en: "teacher",        sl: "učitelj / učiteljica", pic: "👩‍🏫" },
      { en: "doctor",         sl: "zdravnik",      pic: "👨‍⚕️" },
      { en: "police officer", sl: "policist",      pic: "👮" },
      { en: "firefighter",    sl: "gasilec",       pic: "🧑‍🚒" },
      { en: "farmer",         sl: "kmet",          pic: "🧑‍🌾" },
      { en: "cook",           sl: "kuhar",         pic: "🧑‍🍳" },
      { en: "pilot",          sl: "pilot",         pic: "🧑‍✈️" },
      { en: "singer",         sl: "pevec / pevka", pic: "🎤" },
      { en: "dentist",        sl: "zobozdravnik",  pic: "🦷" },
      { en: "mechanic",       sl: "mehanik",       pic: "🔧" }
    ],
    sentences: [
      { text: "A ___ flies a plane.",                 answer: "pilot" },
      { text: "A ___ puts out fires.",                answer: "firefighter" },
      { text: "A ___ works on a farm.",               answer: "farmer" },
      { text: "A ___ helps sick people.",             answer: "doctor" },
      { text: "A ___ prepares meals in a restaurant.", answer: "cook", alt: ["chef"] },
      { text: "A ___ teaches children at school.",    answer: "teacher" }
    ]
  },
  {
    id: "hobbies",
    title: "Hobbies",
    icon: "⚽",
    words: [
      { en: "reading",     sl: "branje",       pic: "📖" },
      { en: "swimming",    sl: "plavanje",     pic: "🏊" },
      { en: "cycling",     sl: "kolesarjenje", pic: "🚴" },
      { en: "football",    sl: "nogomet",      pic: "⚽" },
      { en: "dancing",     sl: "ples",         pic: "💃" },
      { en: "singing",     sl: "petje",        pic: "🎤" },
      { en: "painting",    sl: "slikanje",     pic: "🎨" },
      { en: "cooking",     sl: "kuhanje",      pic: "🍳" },
      { en: "gaming",      sl: "videoigre",    pic: "🎮" },
      { en: "hiking",      sl: "pohodništvo",  pic: "🥾" }
    ],
    sentences: [
      { text: "I like ___ in the pool.",                 answer: "swimming" },
      { text: "They go ___ on their bikes on Sundays.",  answer: "cycling" },
      { text: "He plays ___ with his friends on the pitch.", answer: "football" },
      { text: "I enjoy ___ with a brush and paint.",     answer: "painting" },
      { text: "We go ___ in the mountains.",             answer: "hiking" },
      { text: "She loves ___ a good book before bed.",   answer: "reading" }
    ]
  }
];
