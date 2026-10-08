// Grammar explanations - Dream Team 2 (9.a). Format: see grammar-6b.js
window.GRAMMAR = window.GRAMMAR || {};
Object.assign(window.GRAMMAR, {

dt2u0: { s: [
  { h: "Revision: present, future and past", l: ["**Present simple** (habits): My dad goes to work by car every day.","**Present continuous** (now): Listen! Someone is playing the violin.","**going to** (plans): She is going to visit Italy next summer.","**Past simple** (finished actions): They were on holiday last week. We watched TV yesterday evening."],
    sl: "Najprej poišči časovno besedo: every day → present simple, now / listen! → present continuous, next summer → going to, last week / yesterday → past simple." }
 ], c: [
  ["Listen! Someone ___ the violin.","is playing","plays","play"],
  ["My dad ___ to work by car every day.","goes","is going","go"],
  ["She is ___ to visit Italy next summer.","going","go","will going"],
  ["They ___ on holiday last week.","were","are","was"],
  ["We ___ TV yesterday evening. (watch)","watched","watch","watching"]
]},

dt2u1: { s: [
  { h: "Past simple (irregular verbs)", l: ["Many common verbs are irregular: lose → lost, go → went, see → saw, know → knew, buy → bought, take → took.","Negative: **didn't + base verb**: She didn't know the answer. Question: **Did** you see it?"],
    t: [["infinitive","past simple"],["lose","lost"],["go","went"],["see","saw"],["know","knew"],["take","took"]],
    x: [["I lost my keys yesterday.","Včeraj sem izgubil ključe."],["He went to London last year.","Lani je šel v London."],["We saw a great film.","Videli smo odličen film."]] },
  { h: "Polite requests: can / could", l: ["**Can** you help me? (normal) – **Could** you help me, please? (more polite).","Answers: Of course. / Sure. / Sorry, I can't."],
    x: [["Could you open the window, please?","Bi lahko odprli okno, prosim?"]],
    sl: "»Could« je vljudnejše od »can«. Za prošnjo uporabimo: Can/Could you ...?" }
 ], c: [
  ["I ___ my keys yesterday. (lose)","lost","losed","lose"],
  ["He ___ to London last year. (go)","went","goed","gone"],
  ["We ___ a great film. (see)","saw","seen","seed"],
  ["She ___ the answer. (know, negative)","didn't know","doesn't knew","didn't knew"],
  ["___ you help me, please? (polite request)","Could","Did","Should"]
]},

dt2u2: { s: [
  { h: "Past continuous", l: ["Form: **was / were + verb-ing**. We use it for an action in progress in the past.","At 8 o'clock they were watching TV. What were they doing?"],
    x: [["What were they doing at 8 o'clock?","Kaj so počeli ob osmih?"]] },
  { h: "When and while", l: ["**while** + past continuous (longer action): While she was walking home, it started to rain.","**when** + past simple (short action): I was watching TV when you phoned.","The short action interrupts the long one."],
    x: [["He fell asleep while he was watching TV.","Zaspal je, medtem ko je gledal televizijo."]],
    sl: "Dolgo dejanje (was/were + -ing) in kratko (past simple)." },
  { h: "Prepositions of place", l: ["**across from / opposite** = nasproti: The bank is across the street from the post office.","next to, between, in front of, behind, near"] }
 ], c: [
  ["I ___ TV when you phoned.","was watching","watched","watch"],
  ["What ___ they doing at 8 o'clock?","were","was","did"],
  ["While she ___ home, it started to rain.","was walking","walked","walks"],
  ["He fell asleep while he ___ TV.","was watching","watched","watches"],
  ["The bank is ___ the post office. (across the street)","opposite","between","on"]
]},

dt2u3: { s: [
  { h: "Comparative adjectives", l: ["Short adjectives: **-er + than**: big → bigger, easy → easier (y → ier).","Long adjectives: **more + adjective + than**: more interesting, more difficult.","Irregular: good → better, bad → worse.","**as ... as** = equal: My phone isn't as good as yours."],
    x: [["A horse is bigger than a dog.","Konj je večji od psa."],["This test is easier than the last one.","Ta test je lažji od prejšnjega."],["This film is more interesting than that one.","Ta film je bolj zanimiv od onega."]],
    sl: "Nikoli »more bigger«: ali -er ali more." }
 ], c: [
  ["A horse is ___ than a dog. (big)","bigger","more big","biggest"],
  ["This test is ___ than the last one. (easy)","easier","more easy","easyer"],
  ["This film is ___ than that one. (interesting)","more interesting","interestinger","most interesting"],
  ["My phone isn't as good ___ yours.","as","than","like"],
  ["Her English is ___ than mine. (good)","better","gooder","more good"]
]},

dt2u4: { s: [
  { h: "Superlative adjectives", l: ["We use the superlative to say that something is **number one** in a group.","Short adjectives: **the + -est**: tall → the tallest, big → the biggest, easy → the easiest.","Long adjectives: **the most + adjective**: the most intelligent.","Irregular: good → the best, bad → the worst."],
    x: [["She is the tallest girl in the class.","Je najvišja deklica v razredu."],["This is the best film I know.","To je najboljši film, ki ga poznam."],["It was the worst day of my life.","Bil je najhujši dan v mojem življenju."]],
    sl: "Pred presežnikom vedno stoji »the«." }
 ], c: [
  ["She is the ___ girl in the class. (tall)","tallest","taller","most tall"],
  ["This is the ___ film I know. (good)","best","better","goodest"],
  ["It was the ___ day of my life. (bad)","worst","worse","baddest"],
  ["He is the ___ student in our class. (intelligent)","most intelligent","intelligentest","more intelligent"],
  ["Mount Everest is ___ mountain in the world. (high)","the highest","higher","highest the"]
]},

dt2u5: { s: [
  { h: "will and going to", l: ["**will** = decision at the moment of speaking, opinion or prediction (I think ...), promise: The phone is ringing. I'll answer it. I think it will be sunny tomorrow.","**going to** = plan we made before, or a prediction from evidence: We're going to visit Rome. Look at those clouds! It's going to rain."],
    sl: "Mnenje / odločitev zdaj → will. Načrt ali dokaz → going to." },
  { h: "let, make, allow", l: ["**let + person + base verb** = allow: My mum doesn't let me stay out late.","**make + person + base verb** = force: The teacher made us do the test again.","**be allowed to** = to have permission: We aren't allowed to use phones."],
    x: [["My mum doesn't let me stay out late.","Mama mi ne dovoli ostati zunaj pozno."]] }
 ], c: [
  ["The phone is ringing. I ___ answer it.","'ll","'m going to","am"],
  ["I think it ___ be sunny tomorrow.","will","is going","does"],
  ["Look at those clouds! It ___ rain.","is going to","will","does"],
  ["We ___ visit Rome next summer. It's our plan.","are going to","is going to","going to"],
  ["My mum doesn't ___ me stay out late.","let","allow","make to"]
]},

dt2u6: { s: [
  { h: "Present perfect", l: ["Form: **have / has + past participle** (done, seen, been, eaten, lost ...).","We use it for experiences, and for recent actions with a result now. We do not say exactly when."],
    t: [["infinitive","past participle"],["be","been"],["see","seen"],["eat","eaten"],["lose","lost"],["finish","finished"]],
    x: [["I have lost my keys.","Izgubil sem ključe. (zdaj jih nimam)"],["She has seen this film before.","Ta film je že videla."],["Have you ever been to London?","Si že kdaj bil v Londonu?"]] },
  { h: "ever, never, just, already, yet", l: ["**ever** in questions: Have you ever ...?","**never** = 0 times: He has never eaten sushi.","**just** = a moment ago: They have just finished.","**already** (positive) and **yet** (negative and questions)."],
    sl: "Če povemo točen čas (yesterday, in 2019), uporabimo past simple, ne present perfect." }
 ], c: [
  ["I have ___ my keys.","lost","lose","losed"],
  ["She has ___ this film before.","seen","saw","see"],
  ["They have ___ finished. (a moment ago)","just","ever","yet"],
  ["___ you ever been to London?","Have","Did","Are"],
  ["He has ___ eaten sushi. (0 times)","never","ever","just"]
]}

});
