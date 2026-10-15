// ============================================================
//  SHORT EXPLANATIONS OF MISTAKES
//  Shown after a wrong answer in the Unit tests, Grammar quick check, Fill the gap and My mistakes.
//  window.EXPLAIN maps the question text (lower case, exactly as in the exercise file; for a gap sentence the whole sentence
//  with ___) to [English, Slovenian]. For questions that share their text ("Which sentence is correct?") use the key
//  "question||right answer" (both lower case). One line at a time, no other file has to change. A question without an entry
//  just points to the unit's Grammar (if the unit has one).
//  First batch (15 Oct 2026): the questions that pupils missed most often in the Results (Questions tab).
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
  "i'm really ___ about my exam tomorrow.": ["Nervous = nervozen. Use it for a feeling before an exam, a match or a performance.", "Nervous = nervozen. Uporabimo ga za občutek pred izpitom, tekmo ali nastopom."]
});
