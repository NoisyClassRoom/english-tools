// Grammar explanations - Project 2 (7.b, 7.c). Format: see grammar-6b.js
window.GRAMMAR = window.GRAMMAR || {};
Object.assign(window.GRAMMAR, {

p2u1: { s: [
  { h: "Present simple", l: ["We use it for **habits, routines and facts**.","he / she / it: add **-s** (or -es): she goes, he watches, it studies.","Negative: **don't / doesn't** + base verb. Questions: **Do / Does** + subject + base verb."],
    x: [["She goes to school by bus.","V šolo hodi z avtobusom."],["He doesn't like coffee.","On ne mara kave."],["Does your mother work in a shop?","Ali tvoja mama dela v trgovini?"]],
    sl: "Uporabimo ga za navade in ponavljajoča se dejanja (vsak dan, pogosto). Pomagajo besede: always, usually, often, sometimes, never." },
  { h: "Spelling of the he / she / it form", l: ["Most verbs: **+s** (play → plays).","Verbs ending in -s, -sh, -ch, -x, -o: **+es** (watch → watches, go → goes).","Consonant + y: **-ies** (study → studies)."] }
 ], c: [
  ["She ___ to school by bus.","goes","go","going"],
  ["He ___ like coffee.","doesn't","don't","isn't"],
  ["___ your mother work in a shop?","Does","Do","Is"],
  ["My brother ___ football every Saturday. (play)","plays","play","playing"],
  ["She ___ TV in the evening. (watch)","watches","watchs","watch"]
]},

p2u2: { s: [
  { h: "Present continuous", l: ["We use it for things happening **now** (at the moment of speaking).","Form: **am / is / are + verb-ing**."],
    x: [["Look! The elephant is drinking water.","Poglej! Slon pije vodo."],["Are the monkeys playing? Yes, they are.","Ali se opice igrajo? Da."]] },
  { h: "Present simple or present continuous?", l: ["**Present simple** = always / every day: The lion eats meat every day.","**Present continuous** = now: The lion is eating now.","Words for present simple: always, usually, every day. For continuous: now, at the moment, look!, listen!"],
    sl: "Navade → present simple. Dogaja se zdaj → present continuous." },
  { h: "Some verbs are not used in the continuous", l: ["Verbs of feeling and thinking (**like, love, want, know**) usually stay in present simple: I want an ice cream (NOT I am wanting)."] }
 ], c: [
  ["Look! The elephant ___ water.","is drinking","drinks","drink"],
  ["The lion ___ meat every day.","eats","is eating","eating"],
  ["___ the monkeys playing? Yes, they are.","Are","Do","Is"],
  ["Listen! The birds ___ .","are singing","sing","sings"],
  ["I ___ an ice cream. (want)","want","am wanting","wants"]
]},

p2u3: { s: [
  { h: "Past simple of 'to be'", l: ["**was** (I, he, she, it) and **were** (you, we, they).","Negative: wasn't / weren't. Questions: Was he ...? Were you ...?"],
    x: [["I was at the beach yesterday.","Včeraj sem bil na plaži."],["They were on holiday last week.","Prejšnji teden so bili na počitnicah."],["Were you tired? No, I wasn't.","Ali si bil utrujen? Ne."]],
    sl: "Za preteklost od »biti« uporabimo was/were. Pomagajo besede: yesterday, last week, in 2020, ago." },
  { h: "Regular past simple", l: ["Add **-ed** to the verb: play → played, watch → watched.","Ends in -e: add -d (live → lived). Consonant + y: -ied (study → studied).","Negative: **didn't** + base verb. Question: **Did** + subject + base verb."],
    x: [["We played football yesterday.","Včeraj smo igrali nogomet."],["She didn't watch TV.","Ni gledala televizije."],["Did you visit your grandma?","Ali si obiskal babico?"]] }
 ], c: [
  ["I ___ at the beach yesterday.","was","were","am"],
  ["They ___ on holiday last week.","were","was","are"],
  ["We ___ football yesterday. (play)","played","play","playd"],
  ["She ___ watch TV last night.","didn't","doesn't","wasn't"],
  ["___ you visit your grandma?","Did","Do","Were"]
]},

p2u4: { s: [
  { h: "Countable and uncountable nouns", l: ["**Countable**: we can count them (an apple, two apples).","**Uncountable**: we cannot count them (milk, water, bread, rice, cheese)."],
    sl: "Nekaterih stvari ne štejemo: »two waters« ne rečemo, ampak »two glasses of water«." },
  { h: "How many / How much", l: ["**How many** + countable plural: How many apples are there?","**How much** + uncountable: How much milk do you drink?"],
    x: [["How many eggs have we got?","Koliko jajc imamo?"],["How much water do you drink?","Koliko vode piješ?"]] },
  { h: "some / any / a lot of", l: ["**some** (positive), **any** (negative and questions): There aren't any eggs.","**a lot of** = veliko (all nouns, positive): She eats a lot of fruit."] }
 ], c: [
  ["How ___ apples are there?","many","much","some"],
  ["How ___ milk do you drink?","much","many","any"],
  ["There aren't ___ eggs.","any","some","a"],
  ["I would like ___ water, please.","some","a","many"],
  ["She eats ___ fruit. (very much)","a lot of","many","a"]
]},

p2u5: { s: [
  { h: "Comparative adjectives (than)", l: ["Short adjectives: **-er + than**: tall → taller, big → bigger (double the consonant).","Long adjectives (2+ syllables): **more + adjective + than**: more interesting, more expensive.","Consonant + y: -ier (easy → easier)."],
    x: [["A giraffe is taller than a horse.","Žirafa je višja od konja."],["This book is more interesting than that one.","Ta knjiga je bolj zanimiva od one."]],
    sl: "»Than« pomeni »kot / od«. Nikoli ne rečemo »more taller«." },
  { h: "Superlative adjectives", l: ["Short adjectives: **the + -est**: the tallest, the biggest.","Long adjectives: **the most + adjective**: the most interesting.","Irregular: good → better → the best, bad → worse → the worst."],
    x: [["Russia is the biggest country in the world.","Rusija je največja država na svetu."],["This is the best film.","To je najboljši film."]] }
 ], c: [
  ["A giraffe is ___ than a horse.","taller","tallest","more tall"],
  ["This book is ___ than that one. (interesting)","more interesting","interestinger","most interesting"],
  ["Russia is the ___ country in the world. (big)","biggest","bigger","most big"],
  ["My bag is ___ than yours. (heavy)","heavier","heavyer","more heavy"],
  ["This is the ___ film I know. (good)","best","better","goodest"]
]},

p2u6: { s: [
  { h: "going to (plans)", l: ["We use **am / is / are going to + base verb** for plans and intentions.","Negative: I'm not going to ... Question: Are you going to ...?"],
    x: [["I am going to watch TV tonight.","Nocoj bom gledal televizijo."],["They are going to see a film.","Šli bodo na film."],["Is she going to sing? Yes, she is.","Ali bo pela? Da."]],
    sl: "»Going to« povemo, kaj nameravamo narediti (načrt)." },
  { h: "Future time words", l: ["tonight, tomorrow, next week, next year, in two days, this weekend"] },
  { h: "Entertainment: likes and dislikes", l: ["**love / like / enjoy / don't mind / hate + verb-ing**: I love watching films. She hates dancing."],
    x: [["He enjoys playing computer games.","Rad igra računalniške igre."]] }
 ], c: [
  ["I ___ going to watch TV tonight.","am","is","are"],
  ["They are going ___ a film.","to watch","watch","watching"],
  ["Is she going to sing? Yes, she ___.","is","does","will"],
  ["We ___ going to visit our cousins next week.","are","is","am"],
  ["I love ___ films.","watching","watch","to watching"]
]}

});
