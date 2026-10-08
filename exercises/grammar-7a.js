// Grammar explanations - Dream Team Starter (7.a). Format: see grammar-6b.js
window.GRAMMAR = window.GRAMMAR || {};
Object.assign(window.GRAMMAR, {

dts0: { s: [
  { h: "Asking and answering about yourself", l: ["**What's** your name? – My name is ... / I'm ...","**Where** are you from? – I'm from Slovenia.","**How old** are you? – I'm twelve."],
    x: [["What's your name?","Kako ti je ime?"],["Where are you from?","Od kod si?"],["I'm from Slovenia.","Sem iz Slovenije."]],
    sl: "What's = What is. I'm = I am." },
  { h: "to be: am / is / are", l: ["I **am**, you **are**, he / she / it **is**, we / you / they **are**."] }
 ], c: [
  ["___ your name?","What's","Who's","Where's"],
  ["I ___ from Slovenia.","am","is","are"],
  ["Where ___ you from?","are","is","am"],
  ["___ old are you?","How","What","Who"],
  ["My name ___ Luka.","is","are","am"]
]},

dts1: { s: [
  { h: "to be: positive, negative, questions", l: ["Positive: I **am**, you / we / they **are**, he / she / it **is**.","Negative: I'm **not**, you **aren't**, he **isn't**.","Questions: **Am** I ...? **Are** you ...? **Is** she ...?"],
    t: [["","positive","negative","question"],["I","I am","I am not","Am I?"],["you","you are","you aren't","Are you?"],["she","she is","she isn't","Is she?"]],
    x: [["We are friends.","Prijatelji smo."],["I am not a teacher.","Nisem učitelj."],["Is he twelve? No, he isn't.","Ali je star dvanajst? Ne."]] },
  { h: "Short answers", l: ["Yes, I am. / No, I'm not.","Yes, he is. / No, he isn't.","Yes, they are. / No, they aren't."],
    sl: "V kratkem odgovoru glagol ponovimo (Yes, I am), ne rečemo samo »Yes, I«." }
 ], c: [
  ["She ___ twelve years old.","is","am","are"],
  ["We ___ friends.","are","is","am"],
  ["I ___ not a teacher.","am","is","are"],
  ["Are you a pupil? Yes, I ___.","am","are","is"],
  ["Is he your brother? No, he ___.","isn't","aren't","amn't"]
]},

dts2: { s: [
  { h: "this / that / these / those", l: ["**this** (one, near) and **these** (more, near)","**that** (one, far) and **those** (more, far)"],
    t: [["","near","far"],["one","this","that"],["more than one","these","those"]],
    x: [["This is my pen.","To je moje pisalo."],["These are my friends.","To so moji prijatelji."],["Look at those birds over there!","Poglej tiste ptice tam!"]],
    sl: "this/these = tukaj, blizu; that/those = tam, daleč." },
  { h: "Plural nouns", l: ["Most nouns: add **-s** (book → books).","After -s, -sh, -ch, -x: add **-es** (box → boxes).","Consonant + y → **-ies** (baby → babies).","Irregular: man → men, child → children, foot → feet."] }
 ], c: [
  ["___ is my pen. (near)","This","These","Those"],
  ["___ are my friends. (near, plural)","These","This","That"],
  ["Look at ___ birds over there!","those","this","that"],
  ["One box, two ___.","boxes","boxs","boxies"],
  ["One child, two ___.","children","childs","childrens"]
]},

dts3: { s: [
  { h: "Telling the time", l: ["**What time is it?** – It's five o'clock.","**half past** six = 6:30, **a quarter past** six = 6:15, **a quarter to** eight = 7:45.","Minutes: ten **past** six (6:10), twenty **to** seven (6:40)."],
    t: [["6:00","six o'clock"],["6:15","a quarter past six"],["6:30","half past six"],["7:45","a quarter to eight"]],
    sl: "Do pol ure rečemo »past« (čez), po pol ure »to« (do naslednje ure)." },
  { h: "Prepositions of place", l: ["**in** the bag, **on** the table, **under** the chair, **next to** the door, **in front of** the school."],
    x: [["The cinema is next to the bank.","Kino je poleg banke."],["The cat is under the table.","Mačka je pod mizo."]] }
 ], c: [
  ["What ___ is it? It's five o'clock.","time","hour","clock"],
  ["6:30 is ___ past six.","half","quarter","twenty"],
  ["7:45 is a quarter ___ eight.","to","past","at"],
  ["The cat is ___ the table. (below)","under","on","next"],
  ["The bank is ___ the post office. (side by side)","next to","in","on"]
]},

dts4: { s: [
  { h: "Present simple: negative", l: ["We use **don't** (I, you, we, they) and **doesn't** (he, she, it) + the base verb.","After doesn't the verb has no -s: He doesn't like cheese (NOT likes)."],
    x: [["I don't like spiders.","Ne maram pajkov."],["He doesn't like cheese.","On ne mara sira."],["They don't play computer games.","Ne igrajo računalniških iger."]],
    sl: "Pri »doesn't« je -s že v pomožnem glagolu, zato glagol ostane brez -s." },
  { h: "Present simple: questions", l: ["Use **Do** (I, you, we, they) or **Does** (he, she, it) + subject + base verb.","Short answers: Yes, I do. / No, she doesn't."],
    x: [["Do you play computer games? Yes, I do.","Ali igraš računalniške igre? Da."],["Does he like pizza? No, he doesn't.","Ali on mara pico? Ne."]] }
 ], c: [
  ["I ___ like spiders.","don't","doesn't","am not"],
  ["He ___ like cheese.","doesn't","don't","isn't"],
  ["___ you play computer games?","Do","Does","Are"],
  ["___ she live in Ljubljana?","Does","Do","Is"],
  ["Does he like pizza? No, he ___.","doesn't","don't","isn't"]
]},

dts5: { s: [
  { h: "have got / has got", l: ["I / you / we / they **have got**; he / she / it **has got**.","Negative: haven't got / hasn't got. Question: **Have** you got ...? **Has** he got ...?"],
    x: [["I have got a dog.","Imam psa."],["She has got long hair.","Ona ima dolge lase."],["Has he got a bike? Yes, he has.","Ali ima kolo? Da."]] },
  { h: "Imperatives and object pronouns", l: ["Imperative (order / request): base verb – **Give** the ball to me! **Don't** run!","Object pronouns come after the verb or after to / for / with: me, you, him, her, it, us, them."],
    t: [["I","you","he","she","it","we","they"],["me","you","him","her","it","us","them"]],
    x: [["Give the ball to me!","Podaj mi žogo!"],["Look at him!","Poglej ga!"],["Help us, please.","Pomagaj nam, prosim."]],
    sl: "Za predlogi (to, for, with, at) uporabimo »me, him, her, us, them«, ne »I, he, she, we, they«." }
 ], c: [
  ["I ___ got a dog.","have","has","am"],
  ["She ___ got long hair.","has","have","is"],
  ["___ he got a bike? Yes, he has.","Has","Have","Is"],
  ["Give the ball to ___. (I)","me","my","I"],
  ["Look at ___! (the boy)","him","he","his"]
]},

dts6: { s: [
  { h: "some / any", l: ["**some** in positive sentences: There are some tomatoes.","**any** in negatives and questions: There isn't any juice. Is there any milk?","Both words work with plural and uncountable nouns (milk, juice, bread)."],
    x: [["Is there any milk?","Ali je kaj mleka?"],["There are some apples on the table.","Na mizi je nekaj jabolk."],["There isn't any juice.","Ni soka."]],
    sl: "Some = nekaj (trdilni), any = kaj / nič (nikalni in vprašalni)." },
  { h: "Let's ...", l: ["**Let's** + verb suggests doing something together: Let's have a party!"],
    x: [["Let's play football!","Igrajmo nogomet!"]] }
 ], c: [
  ["Is there ___ milk?","any","some","a"],
  ["There are ___ tomatoes on the table.","some","any","a"],
  ["There isn't ___ juice.","any","some","an"],
  ["___ go to the cinema!","Let's","Let","We"],
  ["Have we got ___ bread? No, we haven't.","any","some","an"]
]}

});
