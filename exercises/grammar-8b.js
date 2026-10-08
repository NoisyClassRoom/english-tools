// Grammar explanations - Project 3 (8.b). Format: see grammar-6b.js
window.GRAMMAR = window.GRAMMAR || {};
Object.assign(window.GRAMMAR, {

p3u1: { s: [
  { h: "Past simple: regular and irregular verbs", l: ["Regular verbs add **-ed** (play → played). Irregular verbs have their own form and must be learnt: go → went, have → had, buy → bought, lose → lost, see → saw.","Use the past simple for finished actions at a definite time in the past: yesterday, last year, in 2019, two days ago."],
    t: [["infinitive","past simple"],["go","went"],["have","had"],["buy","bought"],["lose","lost"],["write","wrote"]],
    x: [["I lost my keys yesterday.","Včeraj sem izgubil ključe."],["We had a great time at the party.","Na zabavi smo se imeli super."]] },
  { h: "Negative and questions", l: ["Negative: **didn't + base verb**: He didn't write the letter.","Question: **Did + subject + base verb**: Did they win the match? Yes, they did. / No, they didn't."],
    sl: "Po »did / didn't« je glagol vedno v osnovni obliki: Did you go? (NE Did you went?)" }
 ], c: [
  ["I ___ my keys yesterday. (lose)","lost","losed","loose"],
  ["She ___ to school by bike last year. (go)","went","goed","gone"],
  ["___ they win the match?","Did","Do","Were"],
  ["He didn't ___ the letter.","write","wrote","written"],
  ["We ___ a great time at the party. (have)","had","haved","has"]
]},

p3u2: { s: [
  { h: "will", l: ["We use **will + base verb** for predictions, spontaneous decisions and promises.","Short form: 'll. Negative: **won't** (will not). Question: Will he win? Yes, he will. / No, he won't."],
    x: [["I think it will rain tomorrow.","Mislim, da bo jutri deževalo."],["The phone is ringing. I'll answer it!","Telefon zvoni. Bom jaz odgovoril!"],["Will he win? No, he won't.","Ali bo zmagal? Ne."]],
    sl: "»Will« = odločitev takrat, ko govorimo (spontano), napoved (mislim, da ...), obljuba." },
  { h: "going to", l: ["We use **going to** for plans we made before, and for predictions based on evidence (we can see it).","Look at those black clouds! It's going to rain. We're going to visit Spain next summer."],
    sl: "Načrt ali znaki pred očmi → going to. Odločitev zdaj / mnenje → will." }
 ], c: [
  ["I think it ___ rain tomorrow.","will","is","does"],
  ["Will he win? No, he ___.","won't","doesn't","isn't"],
  ["The phone is ringing. I ___ answer it! (decision now)","'ll","'m going to","am"],
  ["Look at those black clouds! It ___ rain. (evidence)","is going to","will","does"],
  ["We ___ visit Spain next summer. (our plan)","are going to","is going to","going to"]
]},

p3u3: { s: [
  { h: "Past continuous", l: ["Form: **was / were + verb-ing**.","We use it for an action **in progress** at a moment in the past: At 8 o'clock I was watching TV.","Negative: wasn't / weren't watching. Question: Were you watching?"],
    x: [["They were playing football at 5 o'clock.","Ob petih so igrali nogomet."],["What were you doing at 8 o'clock yesterday?","Kaj si počel včeraj ob osmih?"]] },
  { h: "Past continuous + past simple (when / while)", l: ["A longer action (past continuous) is interrupted by a shorter action (past simple).","**while** + past continuous; **when** + past simple.","I was watching TV **when** the phone rang. **While** I was sleeping, my brother arrived."],
    x: [["She was walking when she found a wallet.","Hodila je, ko je našla denarnico."]],
    sl: "Dolgo dejanje v teku (was/were + -ing) in kratko, ki ga prekine (past simple)." }
 ], c: [
  ["I ___ TV when the phone rang.","was watching","watched","am watching"],
  ["They ___ football at 5 o'clock.","were playing","played","was playing"],
  ["What ___ you doing at 8 o'clock yesterday?","were","was","did"],
  ["While I ___, my brother arrived. (sleep)","was sleeping","slept","sleeping"],
  ["She was walking when she ___ a wallet. (find)","found","was finding","finds"]
]},

p3u4: { s: [
  { h: "Articles: a / an / the", l: ["**a / an** for something new or one of many: I saw a dog.","**the** for something known or unique: the Thames, the sun, the doctor's.","No article with names of most cities and countries: London, Slovenia (but: the UK, the USA)."],
    x: [["The Thames is the longest river in England.","Temza je najdaljša reka v Londonu."],["He is at the doctor's.","Pri zdravniku je."]] },
  { h: "Giving directions", l: ["**Go straight on** / **Turn left** / **Turn right** at the corner.","**How do I get to** the museum? – Go along this street and take the second turning on the left.","The bank is **between** the library and the post office."],
    x: [["Excuse me, how do I get to the museum?","Oprostite, kako pridem do muzeja?"],["Go straight and turn left at the corner.","Pojdite naravnost in na vogalu zavijte levo."]] }
 ], c: [
  ["The Thames is ___ river in London.","the longest","longest","a longest"],
  ["He is at ___ doctor's.","the","a","an"],
  ["Excuse me, how do I ___ to the museum?","get","go","arrive"],
  ["Go ___ and turn left at the corner.","straight on","straight to","right on"],
  ["The bank is ___ the library and the post office.","between","behind","among"]
]},

p3u5: { s: [
  { h: "Present perfect", l: ["Form: **have / has + past participle** (regular: -ed, irregular: been, seen, eaten, written ...).","We use it for experiences (no exact time) and for recent actions with a result now.","Time words: **ever** (in questions), **never**, **just**, **already**, **yet** (in negatives and questions)."],
    t: [["infinitive","past participle"],["be","been"],["go","gone / been"],["eat","eaten"],["see","seen"],["do","done"]],
    x: [["I have been to Rome.","Bil sem v Rimu."],["Have you ever eaten pizza?","Si že kdaj jedel pico?"],["They haven't finished yet.","Še niso končali."],["He has just closed the door.","Pravkar je zaprl vrata."]],
    sl: "Present perfect: »že«, »še nikoli«, »pravkar« – rezultat ali izkušnja, čas ni pomemben. Če povemo točen čas (yesterday), uporabimo past simple!" }
 ], c: [
  ["I have ___ to Rome.","been","be","was"],
  ["She has ___ her homework.","done","did","do"],
  ["They ___ finished yet.","haven't","didn't","aren't"],
  ["___ you ever eaten pizza?","Have","Did","Are"],
  ["He has just ___ the door. (close)","closed","close","closing"]
]},

p3u6: { s: [
  { h: "should / shouldn't", l: ["**should** = advice (it is a good idea): You should stay at home.","**shouldn't** = it is not a good idea: You shouldn't watch TV all day.","Question: Should I take a tablet?"],
    sl: "Should = bi moral/moral bi (nasvet)." },
  { h: "must / mustn't / have to / don't have to", l: ["**must** = strong obligation: You must be quiet in the library.","**mustn't** = forbidden: Students mustn't use phones in the exam.","**have to** = obligation: I have to wear a uniform.","**don't have to** = not necessary (it is OK, but you can choose): You don't have to bring a pen. I have some."],
    sl: "Pozor: mustn't = ne smeš (prepovedano); don't have to = ni ti treba (ni nujno)." }
 ], c: [
  ["You've got a cold. You ___ stay at home.","should","mustn't","don't have to"],
  ["You ___ watch TV all day. It's bad for you.","shouldn't","should","have to"],
  ["Students ___ use phones in the exam. It's forbidden.","mustn't","don't have to","should"],
  ["You ___ bring a pen. I have some. (not necessary)","don't have to","mustn't","must"],
  ["We ___ wear a uniform at this school. It's a rule.","have to","don't have to","shouldn't"]
]}

});
