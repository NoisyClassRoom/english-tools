// ============================================================
//  SHORT EXPLANATIONS OF MISTAKES
//  Shown after a wrong answer in the Unit tests, Grammar quick check, Fill the gap and My mistakes.
//  window.EXPLAIN maps the question text (lower case, exactly as in the exercise file; for a gap sentence the whole sentence
//  with ___) to [English, Slovenian]. For questions that share their text ("Which sentence is correct?") use the key
//  "question||right answer" (both lower case). One line at a time, no other file has to change. A question without an entry
//  just points to the unit's Grammar (if the unit has one).
//  First batch (15 Oct 2026); second batch (22 Oct 2026): the questions that pupils missed most often in the Results (Questions tab).
// ============================================================
window.EXPLAIN = window.EXPLAIN || {};
Object.assign(window.EXPLAIN, {
  // ---- present simple: base form after do / does / don't / doesn't
  "ben doesn't ___ football at school. (play)": ["After doesn't / don't the verb has no -s: play (not plays).", "Za doesn't / don't ostane glagol v osnovni obliki, brez -s: play (ne plays)."],
  "my dad doesn't ___ in a bank.": ["After doesn't the verb stays in its base form: work.", "Za doesn't ostane glagol v osnovni obliki: work."],
  "nadim doesn't ___ the bus to school. he walks. (take)": ["After doesn't we use the base form: take (not takes).", "Za doesn't uporabimo osnovno obliko: take (ne takes)."],
  "___ she like pizza? yes, she does.": ["Questions with he / she / it start with Does, and the short answer repeats it: Yes, she does.", "Vprašanja s he / she / it se začnejo z Does, kratek odgovor pa ga ponovi: Yes, she does."],
  "___ your parents work in town? yes, they do.": ["Questions with I / you / we / they start with Do, and the short answer repeats it: Yes, they do.", "Vprašanja z I / you / we / they se začnejo z Do, kratek odgovor pa ga ponovi: Yes, they do."],
  "ana ___ her homework every day.": ["We say 'do homework'. With he / she / it the verb gets an ending: does.", "Pravimo 'do homework'. Pri he / she / it dobi glagol končnico: does."],
  "henry ___ his homework before dinner. (do)": ["He / she / it + verb with an ending: does (not do).", "Pri he / she / it dobi glagol končnico: does (ne do)."],
  "we usually ___ our homework in the afternoon.": ["With we the verb has no ending. We say 'do homework' (not 'make').", "Pri we glagol nima končnice. Pravimo 'do homework' (ne 'make')."],
  "i ___ the dishes after dinner. (wash)": ["With I the verb has no ending: wash. (With he / she it would be washes.)", "Pri I glagol nima končnice: wash. (Pri he / she / it bi bilo washes.)"],
  "my brother ___ his room every week. (clean)": ["My brother = he, so the verb gets -s: cleans.", "My brother = he, zato glagol dobi -s: cleans."],
  "i ___ my bed every morning.": ["We say 'make your bed' (not 'do' or 'tidy').", "Pravimo 'make my bed' (postlati posteljo), ne 'do' ali 'tidy'."],
  "jake ___ play the guitar, but he can't play the piano.": ["'But' joins two opposite ideas. The opposite of can't is can: he can play the guitar.", "'But' (ampak) povezuje nasprotni misli. Nasprotje od can't je can: he can play the guitar."],
  // ---- adverbs of frequency
  "i ___ eat meat. i'm a vegetarian.": ["'Never' means 0 % – not once. It goes before the main verb: I never eat meat.", "'Never' pomeni nikoli (0 %). Stoji pred glavnim glagolom: I never eat meat."],
  "i'm ___ late for school. (0%: not once)": ["'Never' = 0 %. After am / is / are it comes after the verb: I'm never late.", "'Never' = nikoli (0 %). Pri am / is / are stoji za glagolom: I'm never late."],
  "i ___ get up early on sundays. (0%)": ["0 % = never. Never goes before the main verb: I never get up early.", "0 % = never (nikoli). Stoji pred glavnim glagolom: I never get up early."],
  "she ___ goes to the cinema on saturdays. (100%)": ["100 % = always (every time). Always goes before the main verb.", "100 % = always (vedno, vsakič). Stoji pred glavnim glagolom."],
  "she ___ goes to bed late, but not every day.": ["'Sometimes' = not every day. The scale: always – usually – often – sometimes – never.", "'Sometimes' = včasih, ne vsak dan. Lestvica: always – usually – often – sometimes – never."],
  // ---- ordinal numbers, months, dates
  "december is the ___ month of the year.": ["Ordinal numbers: first, second, third … twelfth (12th). December is the 12th month.", "Vrstilni števniki: first, second, third … twelfth (12.). December je 12. mesec."],
  "january is the ___ month of the year.": ["January is the 1st month: first (not 'one').", "Januar je 1. mesec: first (ne 'one')."],
  "march is the ___ month of the year. (3rd)": ["3rd is written 'third' (not 'threeth'). March is the third month.", "3. je 'third' (ne 'threeth'). Marec je tretji mesec."],
  "the third of ___: the 3rd of the third month.": ["The third month of the year is March. Month names start with a capital letter.", "Tretji mesec v letu je March (marec). Imena mesecev pišemo z veliko začetnico."],
  "my birthday is ___ the 5th of july.": ["With a date we use 'on' (on the 5th of July). With a month alone we use 'in' (in July).", "Pri datumu uporabimo 'on' (on the 5th of July), pri samem mesecu pa 'in' (in July)."],
  "the month before april is ___.": ["The months in order: January, February, March, April, May … The month before April is March.", "Meseci po vrsti: January, February, March, April, May … Pred aprilom je March."],
  "the month after may is ___.": ["The month after May is June. Order: … April, May, June, July …", "Po maju sledi June (junij). Vrstni red: … April, May, June, July …"],
  "today is monday. tomorrow is ___.": ["Tomorrow is the next day: Tuesday (T-u-e-s-d-a-y). Days start with a capital letter.", "Jutri je naslednji dan: Tuesday (torek). Dneve pišemo z veliko začetnico."],
  // ---- past simple (irregular verbs and didn't)
  "was edward listening to his walkman? yes, he ___.": ["The short answer repeats the verb of the question: Was he …? – Yes, he was. (not 'did')", "Kratek odgovor ponovi glagol iz vprašanja: Was he …? – Yes, he was. (ne 'did')"],
  "___ you take the bus to school? yes, i did.": ["Past simple questions start with Did, and the answer repeats it: Did you …? – Yes, I did.", "Vprašanja v preteklem času se začnejo z Did, odgovor ga ponovi: Did you …? – Yes, I did."],
  "we ___ lunch at a nice restaurant. (eat)": ["Eat is irregular: eat – ate – eaten. The past simple is ate.", "Eat je nepravilni glagol: eat – ate – eaten. Pretekli čas je ate."],
  "last summer we ___ a lot of ice cream. (eat)": ["'Last summer' is in the past, so we use the past simple: ate (eat – ate – eaten).", "'Last summer' je v preteklosti, zato uporabimo pretekli čas: ate (eat – ate – eaten)."],
  "they ___ a new house last year. (buy)": ["Buy is irregular: buy – bought – bought. Past simple: bought (not 'buyed').", "Buy je nepravilni glagol: buy – bought – bought. Pretekli čas: bought (ne 'buyed')."],
  "yesterday we ___ to the cinema. (go)": ["'Yesterday' = past. Go is irregular: go – went – gone. Past simple: went.", "'Yesterday' = preteklost. Go je nepravilni glagol: go – went – gone. Pretekli čas: went."],
  "he ___ his keys on the bus. (lose)": ["Lose – lost – lost. The past simple is lost (loss is a noun).", "Lose – lost – lost. Pretekli čas je lost (loss je samostalnik)."],
  "she ___ me a surprise present. (give)": ["Give is irregular: give – gave – given. Past simple: gave (not 'gived').", "Give je nepravilni glagol: give – gave – given. Pretekli čas: gave (ne 'gived')."],
  "we didn't ___ the news. (hear)": ["After didn't the verb is in its base form: hear (not 'heard'). The past is already in didn't.", "Za didn't je glagol v osnovni obliki: hear (ne 'heard'). Preteklost je že v didn't."],
  "which is the past of 'catch'?": ["Catch – caught – caught. The past simple is caught.", "Catch – caught – caught. Pretekli čas je caught."],
  "which sentence has a mistake?||she taked the bus to school.": ["Take is irregular: take – took – taken. The correct sentence is 'She took the bus to school.'", "Take je nepravilni glagol: take – took – taken. Pravilno: 'She took the bus to school.'"],
  "which past form is correct?||wrote": ["Write is irregular: write – wrote – written. 'Wrote' is the past simple; 'written' needs have / has.", "Write je nepravilni glagol: write – wrote – written. 'Wrote' je pretekli čas, 'written' potrebuje have / has."],
  "which sentence is correct?||she didn't know what to do, so she called her mum.": ["After didn't the verb is in the base form (didn't know), and 'called' is the past. The whole story is in the past.", "Za didn't je glagol v osnovni obliki (didn't know), 'called' je preteklik. Cela zgodba je v preteklosti."],
  "which sentence is correct?||sally and judith weren't reading a soccer magazine.": ["Past continuous: was / were + verb with -ing, so the negative is weren't reading (not 'didn't reading').", "Pretekli continuous: was / were + glagol z -ing, zato je nikalno weren't reading (ne 'didn't reading')."],
  // ---- other grammar
  "we ___ spanish. we're english. (negative)": ["The negative of 'are' is 'aren't' (are not): We aren't Spanish.", "Nikalna oblika od 'are' je 'aren't' (are not): We aren't Spanish."],
  "who ___ your favourite player?": ["With 'who' we use a singular verb: Who is your favourite player?", "Z 'who' uporabimo glagol v ednini: Who is your favourite player?"],
  "which sentence makes a suggestion?||shall we go for a walk?": ["To suggest something we say 'Shall we …?' or 'Let's …'.", "Predlog podamo z 'Shall we …?' ali 'Let's …'."],
  "which sentence is correct?||he's between the cats.": ["'Between' is followed directly by the noun: between the cats (not 'between of').", "Za 'between' stoji kar samostalnik: between the cats (ne 'between of')."],
  "my grandmother's sister is my great-___.": ["Your grandmother's sister is your great-aunt (a great-uncle is a grandparent's brother).", "Babičina sestra je your great-aunt (prateta); great-uncle je dedkov ali babičin brat."],
  // ---- feelings
  "she was very ___ before the exam. (she felt worried.)": ["Nervous = worried before something that will happen, like an exam. After 'was' we use an adjective.", "Nervous = nervozen, zaskrbljen pred nečim, kar se bo zgodilo (izpit). Za 'was' stoji pridevnik."],
  "i'm really ___ about my exam tomorrow.": ["Nervous = nervozen. Use it for a feeling before an exam, a match or a performance.", "Nervous = nervozen. Uporabimo ga za občutek pred izpitom, tekmo ali nastopom."],
  // ---- second batch (22 Oct 2026): the questions of Project 2 / Project 3 / Starter that pupils missed most
  // ---- questions and short answers
  "___ millie read the questions? yes, she does.": ["With he / she / it a question starts with Does, and the short answer repeats it: Yes, she does.", "Vprašanje s he / she / it se začne z Does, kratek odgovor pa ga ponovi: Yes, she does."],
  "___ your mother work in a shop?": ["Your mother = she, so the question starts with Does (not Do).", "Your mother = she, zato se vprašanje začne z Does (ne Do)."],
  "___ they play football?": ["With they the question starts with Do: Do they play football?", "Pri they se vprašanje začne z Do: Do they play football?"],
  "___ you eat breakfast? yes, i did.": ["The answer says 'did', so the question is in the past simple and starts with Did.", "Odgovor vsebuje 'did', zato je vprašanje v preteklem času in se začne z Did."],
  "which short answer? 'did they win?'||no, they didn't.": ["The short answer repeats the helping verb of the question: Did they win? – No, they didn't.", "Kratek odgovor ponovi pomožni glagol iz vprašanja: Did they win? – No, they didn't."],
  "were sally and edward watching tv? no, they ___.": ["The short answer repeats the verb of the question: Were they …? – No, they weren't.", "Kratek odgovor ponovi glagol iz vprašanja: Were they …? – No, they weren't."],
  "have simon and tanja got computers? yes, they ___.": ["The short answer repeats the helping verb: Have they got …? – Yes, they have.", "Kratek odgovor ponovi pomožni glagol: Have they got …? – Yes, they have."],
  "which question is correct?||were sally and judith writing an e-mail?": ["Two people = plural, so we use Were (not Was): Were Sally and Judith writing …?", "Dve osebi = množina, zato Were (ne Was): Were Sally and Judith writing …?"],
  "which question is correct?||when did the film begin?": ["After did the verb is in the base form: begin (not began).", "Za did je glagol v osnovni obliki: begin (ne began)."],
  "which question is correct?||did they go to the party last night?": ["After did the verb is in the base form: go (not went).", "Za did je glagol v osnovni obliki: go (ne went)."],
  "which sentence is correct?||what did she say to you?": ["The question word + did + subject + base verb: What did she say? (not 'said').", "Vprašalnica + did + osebek + osnovni glagol: What did she say? (ne 'said')."],
  "which sentence is correct?||could you tell me where the bank is?": ["In a polite question the word order is like a statement: where the bank is (not 'where is the bank').", "V vljudnem vprašanju je besedni red kot v trdilnem stavku: where the bank is (ne 'where is the bank')."],
  "___ we take a taxi? (suggestion)": ["To suggest something we say 'Shall we …?' (or 'Let's …').", "Predlog podamo s 'Shall we …?' (ali 'Let's …')."],
  "___ we take a taxi or go by tram? (suggestion)": ["To suggest something we say 'Shall we …?' (or 'Let's …').", "Predlog podamo s 'Shall we …?' (ali 'Let's …')."],
  "___ you help me, please? (polite request)": ["For a polite request we say 'Could you …?' – it is more polite than 'Can you …?'.", "Za vljudno prošnjo rečemo 'Could you …?' – bolj vljudno kot 'Can you …?'."],
  // ---- present simple: he / she / it
  "she ___ tv in the evening. (watch)": ["Verbs ending in -ch add -es with he / she / it: watches.", "Glagoli na -ch dobijo pri he / she / it končnico -es: watches."],
  "she ___ to school by bus.": ["With she the verb gets an ending: go – goes.", "Pri she dobi glagol končnico: go – goes."],
  "alison ___ home at ten past eight. (leave)": ["Alison = she, so the verb gets -s: leaves. ('Go' would not fit: she leaves home.)", "Alison = she, zato glagol dobi -s: leaves."],
  // ---- past simple
  "we ___ a lot of fun last weekend. (have)": ["'Have' is irregular: the past simple is had (not 'haved').", "'Have' je nepravilen glagol: pretekli čas je had (ne 'haved')."],
  "past of 'drink':": ["'Drink' is irregular: drink – drank – drunk. The past simple is drank.", "'Drink' je nepravilen glagol: drink – drank – drunk. Pretekli čas je drank."],
  "which is the past of 'teach'?": ["'Teach' is irregular: teach – taught – taught.", "'Teach' je nepravilen glagol: teach – taught – taught."],
  "i ___ my keys yesterday. (lose)": ["'Lose' is irregular: lose – lost. 'Yesterday' tells us it is the past.", "'Lose' je nepravilen glagol: lose – lost. 'Yesterday' kaže na preteklik."],
  "i ___ him a question. (ask)": ["A finished action in the past: regular verbs add -ed: asked.", "Končano dejanje v preteklosti: pravilni glagoli dobijo -ed: asked."],
  "she ___ the answer. (know, negative)": ["Negative past: didn't + base verb: didn't know (not 'didn't knew').", "Nikalni pretekli čas: didn't + osnovni glagol: didn't know (ne 'didn't knew')."],
  "i met her two weeks ___.": ["'Ago' comes after the time and means 'back from now': two weeks ago (it goes with the past simple).", "'Ago' stoji za časom in pomeni 'pred': two weeks ago (uporabljamo ga s preteklim časom)."],
  "which time expression goes with the past simple?||in 2019": ["A finished time in the past (in 2019) → past simple. 'Since' and 'already' belong to the present perfect.", "Končan čas v preteklosti (in 2019) → past simple. 'Since' in 'already' sodita k present perfect."],
  "which sentence is correct?||edward's mum gave him some money.": ["Past simple of 'give' is gave. We do not add 'has' in the past simple.", "Pretekli čas od 'give' je gave. V past simple ne dodamo 'has'."],
  "which sentence is correct?||they met sally outside the shop.": ["'Meet' is irregular: met. In the past simple there is no 'has' and no -ed.", "'Meet' je nepravilen: met. V past simple ni 'has' in ne -ed."],
  "which sentence is correct?||i met my best friend ten years ago.": ["A finished time (ten years ago) → past simple: I met. (Not 'did meet' and not 'have met'.)", "Končan čas (ten years ago) → past simple: I met. (Ne 'did meet' in ne 'have met'.)"],
  "which sentence is correct?||they didn't buy the shoes because they forgot.": ["After didn't the verb is in the base form: didn't buy (not 'didn't bought').", "Za didn't je glagol v osnovni obliki: didn't buy (ne 'didn't bought')."],
  "which sentence is correct?||she told me a secret, but i didn't tell anyone.": ["Positive past: told (irregular). After didn't: base form tell.", "Trdilno: told (nepravilen). Za didn't: osnovna oblika tell."],
  "which sentence is correct?||my cousin, who lives in celje, came to visit us.": ["'Come' is irregular: came. 'Who' is for people.", "'Come' je nepravilen: came. 'Who' uporabimo za osebe."],
  // ---- past continuous
  "they ___ watching tv.": ["They = plural, so was / were: they were watching.", "They = množina, zato were: they were watching."],
  "which sentence is correct?||sally was drinking cola.": ["Past continuous: was / were + verb-ing: was drinking. (Not 'was drink'; and 'is' does not fit the past.)", "Past continuous: was / were + glagol-ing: was drinking. (Ne 'was drink'; 'is' ne pasuje v preteklik.)"],
  "which sentence is correct?||while i was going home, i heard some footsteps.": ["While + past continuous (long action), then the past simple for the short action: I heard (not 'was heard').", "While + past continuous (dolgo dejanje), nato past simple za kratko dejanje: I heard (ne 'was heard')."],
  // ---- be, have got, there is / are
  "where ___ the boxes? they are in front of the café.": ["'The boxes' = plural, so we use are: Where are the boxes?", "'The boxes' = množina, zato are: Where are the boxes?"],
  "there ___ two eggs in the box.": ["Two eggs = plural, so: There are.", "Two eggs = množina, zato: There are."],
  "which is correct?||my parents are teachers.": ["'Parents' is plural, so we use are (not is / am).", "'Parents' je množina, zato are (ne is / am)."],
  "which sentence is not correct?||they is my friends.": ["With they we use are: They are my friends. ('They is' is wrong.)", "Pri they uporabimo are: They are my friends. ('They is' je napačno.)"],
  "are you ___ to me? yes, i am.": ["Present continuous: are + verb-ing: Are you listening to me?", "Present continuous: are + glagol-ing: Are you listening to me?"],
  // ---- prepositions, dates, possessive
  "my birthday is ___ june.": ["Months take 'in': in June. (Days take 'on': on Monday.)", "Pred meseci uporabimo 'in': in June. (Pred dnevi 'on': on Monday.)"],
  "which date is written correctly?||the 3rd of may": ["Ordinal numbers: 1st, 2nd, 3rd, then -th (4th, 5th). We say 'the third of May'.", "Vrstilni števniki: 1st, 2nd, 3rd, nato -th (4th, 5th). Rečemo 'the third of May'."],
  "he's ___ the house. (on the other side of the street)": ["'Opposite' = on the other side (across from). 'Next to' = right beside.", "'Opposite' = nasproti (na drugi strani). 'Next to' = tik ob."],
  "this is my ___ bike. it belongs to my brother.": ["One brother → 's before the s: my brother's bike (more brothers: brothers').", "En brat → 's: my brother's bike (več bratov: brothers')."],
  "my aunt's children are my ___.": ["Your aunt's or uncle's children are your cousins.", "Otroci tvoje tete ali strica so tvoji cousins (bratranci in sestrične)."],
  "i'd like to ___ you to my birthday party.": ["'Invite' = povabiti. Do not mix it up with 'invent' (izumiti).", "'Invite' = povabiti. Ne zamenjaj z 'invent' (izumiti)."],
  // ---- spelling
  "which spelling is correct?||opposite": ["Spelling: o-p-p-o-s-i-t-e – two p, one s, ending -ite.", "Črkovanje: o-p-p-o-s-i-t-e – dva p, en s, končnica -ite."],
  "a monkey likes to eat a ___.": ["Spelling: banana – one n in the middle: ba-na-na.", "Črkovanje: banana – ba-na-na, brez dvojnega n."],
  "i take a shower in the ___.": ["Spelling: bathroom = bath + room.", "Črkovanje: bathroom = bath + room."],
  "we watch tv in the ___ room.": ["The room where we watch TV is the living room (also: sitting room).", "Soba, kjer gledamo TV, je the living room (dnevna soba)."],
  "flowers grow in the ___.": ["The English word is garden (not the German 'Garten').", "Angleška beseda je garden (ne nemško 'Garten')."],
  "two days ___ i bought a new phone.": ["'Ago' comes after the time and means 'back from now': two days ago (past simple).", "'Ago' stoji za časom in pomeni 'pred': two days ago (pretekli čas)."],
  "he's ___ the fridge. (at its side)": ["'Next to' = right beside, at the side. 'Opposite' = on the other side.", "'Next to' = tik ob, ob strani. 'Opposite' = na drugi strani, nasproti."],
  "i didn't ___ the answer. (know)": ["After didn't the verb is in the base form: didn't know.", "Za didn't je glagol v osnovni obliki: didn't know."],
  "past of 'think':": ["'Think' is irregular: think – thought – thought.", "'Think' je nepravilen glagol: think – thought – thought."],
  "i ___ my keys yesterday.": ["'Yesterday' = the past simple. 'Lose' is irregular: lost.", "'Yesterday' = pretekli čas. 'Lose' je nepravilen: lost."],
  "christmas is ___ december.": ["Months take 'in': in December. (Days take 'on': on Monday.)", "Pred meseci uporabimo 'in': in December. (Pred dnevi 'on': on Monday.)"],
  "my birthday is ___ may.": ["Months take 'in': in May. (A date takes 'on': on 5 May.)", "Pred meseci uporabimo 'in': in May. (Pred datumom 'on': on 5 May.)"],
  "february is the ___ month. (2nd)": ["The 2nd is 'second' (not 'twice'): the second month.", "Drugi je 'second': the second month."],
  "is she a student? no, she ___.": ["The short answer repeats the verb: Is she …? – No, she isn't.", "Kratek odgovor ponovi glagol: Is she …? – No, she isn't."],
  "___ you open the window, please? (polite request)": ["For a polite request we say 'Could you …?'.", "Za vljudno prošnjo rečemo 'Could you …?'."],
  "we cook in the ___.": ["The room where we cook is the kitchen.", "Prostor, kjer kuhamo, je the kitchen (kuhinja)."]
});
