// ============================================================
//  GRAMMAR EXPLANATIONS - Project 1 (6.b)
//  One block per unit id (the id of the unit in class-6b.js).
//    s  sections: h = heading, l = lines of explanation (**word** = bold),
//       t = optional table (first row = header), x = examples [English, Slovenian (optional)],
//       sl = a hint in Slovenian
//    c  quick check: [question with ___, right answer, wrong 1, wrong 2]
//  The unit menu shows a "Grammar" tile for every unit that has a block here.
// ============================================================
window.GRAMMAR = window.GRAMMAR || {};
Object.assign(window.GRAMMAR, {

p1u1: { s: [
  { h: "a / an", l: ["We use **a** before a consonant sound and **an** before a vowel sound (a, e, i, o, u)."],
    x: [["a book","knjiga"],["a pen","pisalo"],["an orange","pomaranča"],["an apple","jabolko"]],
    sl: "Člen »a/an« pomeni »en, neki«. »An« uporabimo pred samoglasnikom, da je izgovorjava lažja." },
  { h: "my, your, his, her", l: ["These words tell us who something belongs to. They stand before a noun."],
    t: [["I","you","he","she"],["my","your","his","her"]],
    x: [["My name is Ana.","Ime mi je Ana."],["What's your name?","Kako ti je ime?"],["His name is Tim.","Njemu je ime Tim."],["Her name is Eva.","Njej je ime Eva."]],
    sl: "my = moj/moja, your = tvoj/tvoja, his = njegov, her = njen." }
 ], c: [
  ["It's ___ orange.","an","a","the"],
  ["It's ___ book.","a","an","one"],
  ["Hello! ___ name is Ana.","My","Me","I"],
  ["This is my brother. ___ name is Jan.","His","Her","My"],
  ["How do you ___ your name?","spell","speak","spelling"]
]},

p1u2: { s: [
  { h: "to be: am / is / are", l: ["The verb **to be** changes with the person.","Short forms: I'm, you're, he's, she's, it's, we're, they're."],
    t: [["I","you / we / they","he / she / it"],["am","are","is"]],
    x: [["I am from Slovenia.","Jaz sem iz Slovenije."],["She is my sister.","Ona je moja sestra."],["They are friends.","Oni so prijatelji."]],
    sl: "Glagol »biti« ima v angleščini tri oblike: am, is, are." },
  { h: "Negative and questions", l: ["Negative: put **not** after the verb: I am not, he is not (isn't), they are not (aren't).","Question: put the verb first: **Are** you from Italy? Yes, I am. / No, I'm not."],
    x: [["They aren't from Italy.","Niso iz Italije."],["Is she your sister? Yes, she is.","Je ona tvoja sestra? Da."]],
    sl: "Vprašanje naredimo tako, da glagol »to be« postavimo na začetek stavka." }
 ], c: [
  ["I ___ from Slovenia.","am","is","are"],
  ["She ___ my sister.","is","am","are"],
  ["They ___ not from Italy.","are","is","am"],
  ["___ you a pupil? Yes, I am.","Are","Is","Am"],
  ["My brother ___ nine years old.","is","are","am"]
]},

p1u3: { s: [
  { h: "have got / has got", l: ["We use **have got** (I, you, we, they) and **has got** (he, she, it) to say what we own or what someone looks like.","Short forms: I've got, he's got."],
    x: [["I have got a new bike.","Imam novo kolo."],["He has got a hamster.","On ima hrčka."],["She has got long hair.","Ona ima dolge lase."]],
    sl: "»Have got« pomeni »imeti«. Pri he/she/it uporabimo »has got«." },
  { h: "Negative and questions", l: ["Negative: **haven't got / hasn't got**.","Question: **Have** you got a pet? **Has** he got a bike? Yes, I have. / No, he hasn't."],
    x: [["I haven't got a dog.","Nimam psa."],["Has she got a cat? No, she hasn't.","Ali ima ona mačko? Ne."]],
    sl: "Pri vprašanju »have/has« skočita pred osebek: Have you got ...?" },
  { h: "a / some", l: ["We use **a** for one thing and **some** for more than one (or for things we cannot count)."],
    x: [["I've got a ruler and some pens.","Imam ravnilo in nekaj pisal."]] }
 ], c: [
  ["I ___ got a new bike.","have","has","am"],
  ["He ___ got a hamster.","has","have","is"],
  ["___ you got a pet? Yes, I have.","Have","Has","Are"],
  ["She ___ got a brother. (negative)","hasn't","haven't","isn't"],
  ["Has he got a bike? No, he ___.","hasn't","haven't","isn't"]
]},

p1u4: { s: [
  { h: "Telling the time", l: ["For 1–30 minutes after the hour we use **past**, for 31–59 we use **to** (minutes before the next hour).","**half past** = 30 minutes; **a quarter past** = 15; **a quarter to** = 45."],
    t: [["time","we say"],["3:15","a quarter past three"],["3:30","half past three"],["2:45","a quarter to three"],["7:00","seven o'clock"]],
    sl: "Po slovensko rečemo »četrt čez tri«, »pol štirih«, »tri četrt na tri«. V angleščini je pol = »half past three« (3:30)!" },
  { h: "at / on / in with time", l: ["**at** + clock time: at seven o'clock","**on** + day: on Monday","**in** + part of the day / month: in the morning, in May (but: **at** night)"],
    x: [["I get up at seven o'clock.","Vstanem ob sedmih."],["We have English on Monday.","Angleščino imamo v ponedeljek."],["I play football in the afternoon.","Popoldne igram nogomet."]] }
 ], c: [
  ["3:15 is a quarter ___ three.","past","to","half"],
  ["2:45 is a quarter ___ three.","to","past","of"],
  ["I get up ___ seven o'clock.","at","on","in"],
  ["We have English ___ Monday.","on","at","in"],
  ["I do my homework ___ the afternoon.","in","on","at"]
]},

p1u5: { s: [
  { h: "Prepositions of place", l: ["They tell us where something is."],
    t: [["in","on","under","next to","between","in front of","behind"],["v","na","pod","poleg","med","pred","za"]],
    x: [["The cat is under the table.","Mačka je pod mizo."],["The library is between the cinema and the shop.","Knjižnica je med kinom in trgovino."]] },
  { h: "There is / There are", l: ["**There is** + one thing (singular): There is a big garden.","**There are** + more things (plural): There are two chairs.","Negative: There isn't / There aren't. Question: Is there ...? Are there ...?"],
    x: [["Is there a cinema in your town? Yes, there is.","Ali je v vašem mestu kino? Da."],["There aren't any shops here.","Tukaj ni nobene trgovine."]],
    sl: "»There is/are« uporabimo, ko povemo, da nekaj OBSTAJA ali JE nekje (je, so)." }
 ], c: [
  ["Your shoes are ___ the bed. (below)","under","on","between"],
  ["The library is ___ the cinema and the shop.","between","in","on"],
  ["There ___ a big garden.","is","are","has"],
  ["There ___ two chairs in the room.","are","is","have"],
  ["___ there a park in your town? Yes, there is.","Is","Are","Has"]
]},

p1u6: { s: [
  { h: "Present continuous", l: ["We use it for things that are happening **now**.","Form: **am / is / are + verb-ing**.","Negative: I'm not wearing, he isn't wearing. Question: Are you wearing ...?"],
    t: [["I","am","wearing"],["he / she / it","is","playing"],["we / you / they","are","reading"]],
    x: [["She is wearing a red jumper.","Ona nosi rdeč pulover."],["They are playing football now.","Zdaj igrajo nogomet."],["Are you reading? No, I'm not.","Ali bereš? Ne."]],
    sl: "Z njim povemo, kaj se dogaja ZDAJ, v tem trenutku (npr. »Zdaj berem.«). Pomagajo besede: now, at the moment, look!, listen!" },
  { h: "Spelling of -ing", l: ["Most verbs: just add -ing (play → playing).","Verbs ending in -e: drop the e (make → making).","Short verbs with one vowel + one consonant: double the consonant (run → running, swim → swimming)."] }
 ], c: [
  ["She ___ wearing a red jumper.","is","am","are"],
  ["They ___ playing football now.","are","is","am"],
  ["I ___ wearing jeans today.","am","is","are"],
  ["Look! The dog is ___ . (run)","running","runing","runs"],
  ["What ___ you doing now?","are","is","do"]
]}

});
