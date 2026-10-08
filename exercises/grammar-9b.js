// Grammar explanations - Project 4 (9.b). Format: see grammar-6b.js
window.GRAMMAR = window.GRAMMAR || {};
Object.assign(window.GRAMMAR, {

p4u1: { s: [
  { h: "Past continuous and past simple", l: ["**was / were + verb-ing** for an action in progress; **past simple** for the short action that interrupts it.","I was watching TV **when** you called."],
    x: [["She was cooking when the phone rang.","Kuhala je, ko je zazvonil telefon."]] },
  { h: "used to", l: ["**used to + base verb** = something we did regularly in the past but not any more, or a past state.","Negative and questions: **didn't use to** / **Did you use to ...?** (no 'd' after did).","He used to live in London, but now he lives in Paris."],
    x: [["I used to play with dolls.","Včasih sem se igral z lutkami."],["She didn't use to like fish.","Včasih ni marala rib."]],
    sl: "»Used to« = nekoč sem (zdaj ne več)." },
  { h: "too and enough", l: ["**too + adjective** = more than necessary (a problem): This box is too heavy for me to lift.","**adjective + enough** = as much as necessary: He isn't old enough to drive."],
    x: [["The tea is too hot to drink.","Čaj je prevroč za pitje."],["She is tall enough to reach the shelf.","Dovolj je visoka, da doseže polico."]],
    sl: "Too = preveč (negativno), enough = dovolj (stoji ZA pridevnikom)." }
 ], c: [
  ["I ___ TV when you called.","was watching","watched","am watching"],
  ["He ___ to live in London, but now he lives in Paris.","used","use","was used"],
  ["She didn't ___ to like fish.","use","used","using"],
  ["This box is ___ heavy for me to lift.","too","enough","very much"],
  ["He isn't old ___ to drive.","enough","too","very"]
]},

p4u2: { s: [
  { h: "Present perfect or past simple?", l: ["**Present perfect** = experience or result, no exact time: I have seen this film three times.","**Past simple** = finished time in the past (we say when): She lived in London in 2010."],
    x: [["I have seen this film three times.","Ta film sem videl trikrat."],["She lived in London in 2010.","Leta 2010 je živela v Londonu."]],
    sl: "Točen čas v preteklosti (in 2010, yesterday, last week) → past simple." },
  { h: "for and since", l: ["**for** + a period of time: for five years, for two weeks.","**since** + a starting point: since Monday, since 2015, since I was ten."],
    x: [["I have known him for five years.","Poznam ga pet let."],["I have known him since Monday.","Poznam ga od ponedeljka."]] },
  { h: "been or gone?", l: ["**has been to** = went and came back: She has been to Paris. (she is back)","**has gone to** = went and is still there: Where's Ana? She has gone to the shop. (she is not back)"] }
 ], c: [
  ["I ___ this film three times.","have seen","saw","see"],
  ["She ___ in London in 2010.","lived","has lived","lives"],
  ["I have known him ___ five years.","for","since","from"],
  ["I have known him ___ Monday.","since","for","from"],
  ["Where's Ana? She has ___ to the shop. (she is not back)","gone","been","went"]
]},

p4u3: { s: [
  { h: "Relative clauses: who, which, that", l: ["We use them to tell **which** person or thing we mean.","**who** for people: The man who lives next door is a doctor.","**which** for things: The car which is red is mine.","**that** for people and things (in everyday English)."],
    x: [["The woman who works here is my aunt.","Ženska, ki dela tu, je moja teta."],["The book that I read was great.","Knjiga, ki sem jo prebral, je bila odlična."]],
    sl: "Who = ki (za ljudi), which = ki (za stvari), that = ki (za oboje)." },
  { h: "should and might", l: ["**should** = advice: You look pale. You should see a doctor.","**might** = it is possible: Take an umbrella. It might rain."] },
  { h: "so do I / neither do I", l: ["Agreeing with a positive: I like tennis. – **So do I.**","Agreeing with a negative: I don't like fish. – **Neither do I.**","The auxiliary changes with the tense: I'm tired. – So am I."],
    sl: "»So do I« = tudi jaz. »Neither do I« = tudi jaz ne." }
 ], c: [
  ["The man ___ lives next door is a doctor.","who","which","whose"],
  ["The car ___ is red is mine.","which","who","what"],
  ["You look pale. You ___ see a doctor.","should","might","can"],
  ["Take an umbrella. It ___ rain. (possible)","might","should","will to"],
  ["I like tennis. — ___ do I.","So","Neither","Too"]
]},

p4u4: { s: [
  { h: "Verb + -ing or to + infinitive", l: ["Some verbs are followed by **-ing**: enjoy, finish, stop, mind, keep, suggest. – I enjoy listening to music. Stop making so much noise!","Some verbs are followed by **to + infinitive**: want, decide, hope, plan, need, learn. – She wants to be a doctor. He decided to go home."],
    x: [["I enjoy listening to music.","Rad poslušam glasbo."],["She wants to be a doctor.","Želi postati zdravnica."],["He decided to go home.","Odločil se je iti domov."]],
    sl: "Ta pravila se moraš naučiti skupaj s posameznim glagolom (enjoy + -ing, want + to)." },
  { h: "Adjectives ending in -ed and -ing", l: ["**-ing** describes the thing or person that causes the feeling: The story was **exciting**.","**-ed** describes how we feel: I was **excited**."],
    x: [["The film was boring. I was bored.","Film je bil dolgočasen. Meni je bilo dolgčas."]] }
 ], c: [
  ["I enjoy ___ to music.","listening","to listen","listen"],
  ["She wants ___ a doctor.","to be","being","be"],
  ["He decided ___ home.","to go","going","go"],
  ["Stop ___ so much noise!","making","to make","make"],
  ["The story was ___. I couldn't stop reading.","exciting","excited","excite"]
]},

p4u5: { s: [
  { h: "The passive", l: ["We use the passive when the **action** is more important than who does it, or we don't know who did it.","**Present passive**: am / is / are + past participle: Paper is made from trees. These cars are made in Germany.","**Past passive**: was / were + past participle: The letter was sent yesterday. The Mona Lisa was painted by Leonardo.","Use **by** to say who did it."],
    t: [["active","passive"],["They built the bridge in 1900.","The bridge was built in 1900."],["Leonardo painted the Mona Lisa.","The Mona Lisa was painted by Leonardo."]],
    sl: "Trpnik: »Most je bil zgrajen leta 1900.« Predmet iz tvornega stavka postane osebek." },
  { h: "How to make the passive", l: ["1) Object of the active sentence becomes the subject. 2) Use **to be** in the same tense. 3) Past participle of the verb. 4) (optional) by + doer."] }
 ], c: [
  ["Paper ___ made from trees.","is","are","was"],
  ["These cars ___ made in Germany.","are","is","were made"],
  ["The letter ___ sent yesterday.","was","is","were"],
  ["The Mona Lisa ___ painted by Leonardo.","was","is","were"],
  ["They built the bridge in 1900. → The bridge ___ built in 1900.","was","were","is"]
]},

p4u6: { s: [
  { h: "First conditional", l: ["We use it for **real, possible situations** in the future.","Form: **If + present simple, will + base verb** (or: will ... if ...).","If it rains, we will stay at home. I'll call you if I have time."],
    x: [["If you study hard, you'll pass.","Če se boš pridno učil, boš opravil."],["If he is late, we'll go without him.","Če bo zamudil, bomo šli brez njega."]],
    sl: "Pozor: v delu z »if« je sedanjik (If it rains), ne prihodnjik (NE If it will rain)." },
  { h: "Relationships: useful phrases", l: ["get on well with = razumeti se z; fall out with = skregati se z; make friends with = spoprijateljiti se z; break up with = razdreti zvezo."],
    x: [["I get on well with my cousin.","Dobro se razumem s sestrično."]] }
 ], c: [
  ["If it rains, we ___ at home.","will stay","stay","would stay"],
  ["If you ___ hard, you'll pass.","study","will study","studied"],
  ["I'll call you if I ___ time.","have","will have","had"],
  ["If he ___ late, we'll go without him.","is","will be","was"],
  ["They will be angry if you ___ the rules.","break","will break","broke"]
]}

});
