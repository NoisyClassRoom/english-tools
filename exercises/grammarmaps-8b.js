// ============================================================
//  GRAMMAR MIND MAPS + TARSIA PAIRS - Project 3 (class 8.b)          (written 21 Oct 2026)
//  window.GMAPS[unit] = { maps: [[rule, 'sentence | sentence | ...'], ...], pairs: [[English, Slovenian], ...] }
//  maps: the most basic rule first. Easy = first 3 rules x 3 sentences, Medium = first 4 x 4, Hard = all.
//        A sentence appears once in the unit and never equals a rule name (the pupils' sorting game relies on it).
//  pairs: sentence + translation for the grammar tarsia (English up to 46, Slovenian up to 52 characters); they are added to the examples of grammar-8b.js.
// ============================================================
window.GMAPS = window.GMAPS || {};
Object.assign(window.GMAPS, {

p3u1: { maps: [
  ['Regular verbs (-ed)', 'We played football yesterday. | She watched a film last night. | I cleaned my room on Sunday. | They visited London in 2019. | He walked to school this morning.'],
  ['Irregular verbs', 'I lost my keys yesterday. | She bought a new bike. | We went to the beach last summer. | He wrote a long letter. | They had pizza for lunch.'],
  ['Negative (didn\'t)', 'I didn\'t see the film. | She didn\'t go to school. | We didn\'t win the match. | He didn\'t write the letter. | They didn\'t have time.'],
  ['Questions (Did ...?)', 'Did you go to the party? | Did she buy the tickets? | Did they win the match? | Did he call you last night? | What did you do yesterday?'],
  ['Time words', 'I met her two days ago. | We moved here in 2015. | He was ill last week. | They left yesterday morning. | She called me an hour ago.']
], pairs: [
  ['We played football yesterday.', 'Včeraj smo igrali nogomet.'], ['She watched a film last night.', 'Sinoči je gledala film.'], ['I cleaned my room on Sunday.', 'V nedeljo sem pospravil sobo.'],
  ['They visited London in 2019.', 'Leta 2019 so obiskali London.'], ['She bought a new bike.', 'Kupila je novo kolo.'], ['We went to the beach last summer.', 'Lani poleti smo šli na plažo.'],
  ['He wrote a long letter.', 'Napisal je dolgo pismo.'], ['I didn\'t see the film.', 'Filma nisem videl.'], ['She didn\'t go to school.', 'Ni šla v šolo.'],
  ['Did you go to the party?', 'Si šel na zabavo?'], ['What did you do yesterday?', 'Kaj si počel včeraj?'], ['I met her two days ago.', 'Srečal sem jo pred dvema dnevoma.']
] },

p3u2: { maps: [
  ['will: predictions', 'I think it will rain tomorrow. | She will be a famous singer. | People will live on Mars. | Our team will probably win. | It will be sunny at the weekend.'],
  ['will: decisions and promises', 'I\'ll answer the phone. | I\'ll help you with your bags. | I promise I\'ll call you. | I\'ll have the pizza. | We\'ll be there at eight.'],
  ['going to: plans', 'We\'re going to visit Spain. | I\'m going to study medicine. | She\'s going to buy a laptop. | They\'re going to move house. | What are you going to do?'],
  ['going to: we can see it', 'Look at those clouds! It\'s going to rain. | Watch out! You\'re going to fall. | He\'s running fast. He\'s going to win. | The baby is going to cry. | The bus is full. We\'re going to be late.'],
  ['won\'t and questions', 'He won\'t pass the test. | I won\'t tell anyone. | Will you come to my party? | Will it rain tomorrow? | They won\'t be late.']
], pairs: [
  ['She will be a famous singer.', 'Postala bo slavna pevka.'], ['People will live on Mars.', 'Ljudje bodo živeli na Marsu.'], ['I\'ll help you with your bags.', 'Pomagal ti bom s torbami.'],
  ['I promise I\'ll call you.', 'Obljubim, da te bom poklical.'], ['He won\'t pass the test.', 'Testa ne bo opravil.'], ['I won\'t tell anyone.', 'Nikomur ne bom povedal.'],
  ['Will you come to my party?', 'Boš prišel na mojo zabavo?'], ['We\'re going to visit Spain.', 'Obiskali bomo Španijo.'], ['I\'m going to study medicine.', 'Študiral bom medicino.'],
  ['They\'re going to move house.', 'Selili se bodo.'], ['What are you going to do?', 'Kaj boš naredil?'], ['Watch out! You\'re going to fall.', 'Pazi! Padel boš.'],
  ['He\'s running fast. He\'s going to win.', 'Hitro teče. Zmagal bo.']
] },

p3u3: { maps: [
  ['Past continuous', 'I was watching TV at eight. | They were playing football. | She was reading a book. | We were walking in the park. | It was raining all day.'],
  ['Negatives and questions', 'I wasn\'t sleeping. | They weren\'t listening. | Was he working? | Were you waiting for me? | What were you doing at nine?'],
  ['A short action interrupts (when)', 'I was cooking when the phone rang. | She was sleeping when I arrived. | He was running when he fell. | They were playing when it got dark. | We were eating when the lights went out.'],
  ['Two things at the same time (while)', 'He was reading while I was cooking. | It started to rain while we were walking. | She called while I was having a shower. | We were studying while they were playing. | I broke my arm while I was skiing.'],
  ['Past simple: the short action', 'The phone rang. | It started to rain. | I fell off my bike. | The lights went out. | She opened the door.']
], pairs: [
  ['I was watching TV at eight.', 'Ob osmih sem gledal televizijo.'], ['They were playing football.', 'Igrali so nogomet.'], ['It was raining all day.', 'Ves dan je deževalo.'],
  ['I wasn\'t sleeping.', 'Nisem spal.'], ['Were you waiting for me?', 'Si me čakal?'], ['What were you doing at nine?', 'Kaj si počel ob devetih?'],
  ['I was cooking when the phone rang.', 'Kuhal sem, ko je zazvonil telefon.'], ['She was sleeping when I arrived.', 'Spala je, ko sem prišel.'], ['We were walking when it started to rain.', 'Hodili smo, ko je začelo deževati.'],
  ['I broke my arm while I was skiing.', 'Roko sem si zlomil med smučanjem.'], ['The lights went out.', 'Luči so ugasnile.'], ['I fell off my bike.', 'Padel sem s kolesa.'],
  ['While they were playing, we were studying.', 'Medtem ko so igrali, smo se mi učili.']
] },

p3u4: { maps: [
  ['a / an', 'I have a dog. | She is an engineer. | He ate an apple. | It\'s an old castle. | We saw a big bridge.'],
  ['the', 'The sun is hot. | Please close the door. | The tower is very high. | I like the red bus. | London is the capital of England.'],
  ['No article', 'I like football. | We go to school by bus. | She plays tennis. | They have lunch at one. | He lives in England.'],
  ['Asking for directions', 'Where is the bank? | How do I get to the station? | Is there a post office near here? | Can you tell me the way to the museum? | Where is the nearest supermarket?'],
  ['Giving directions', 'Go straight on. | Turn left at the lights. | Take the second road on the right. | It\'s opposite the library. | Cross the bridge and turn right.']
], pairs: [
  ['I have a dog.', 'Imam psa.'], ['She is an engineer.', 'Ona je inženirka.'], ['He ate an apple.', 'Pojedel je jabolko.'],
  ['London is the capital of England.', 'London je glavno mesto Anglije.'], ['Close the door, please.', 'Zapri vrata, prosim.'], ['I like football.', 'Rad imam nogomet.'],
  ['She plays tennis.', 'Igra tenis.'], ['How do I get to the station?', 'Kako pridem do postaje?'], ['Is there a post office near here?', 'Je tu blizu pošta?'],
  ['Go straight on.', 'Pojdi naravnost.'], ['Turn left at the lights.', 'Pri semaforju zavij levo.'], ['Cross the bridge and turn right.', 'Prečkaj most in zavij desno.'],
  ['It\'s opposite the library.', 'Je nasproti knjižnice.']
] },

p3u5: { maps: [
  ['Have / has + past participle', 'I have visited Rome. | She has finished her homework. | We have seen that film. | He has broken his arm. | They have eaten lunch.'],
  ['Negative (haven\'t / hasn\'t)', 'I haven\'t been to Paris. | She hasn\'t called me. | He hasn\'t seen the film. | They haven\'t missed a lesson. | We haven\'t met.'],
  ['Questions (Have you ...?)', 'Have you been to London? | Has she won a prize? | Have they seen the museum? | Has he done his homework? | Have you tried sushi?'],
  ['ever and never', 'She has never been abroad. | I have never eaten snails. | He has never played tennis. | It\'s the best film I have ever seen. | This is the worst day I have ever had.'],
  ['just, already, yet', 'I have just finished. | She has already left. | They have just arrived. | I haven\'t eaten yet. | She hasn\'t phoned yet.'],
  ['Past participles', 'see - seen | write - written | eat - eaten | take - taken | break - broken']
], pairs: [
  ['I have visited Rome.', 'Obiskal sem Rim.'], ['She has finished her homework.', 'Končala je domačo nalogo.'], ['We have seen that film.', 'Ta film smo videli.'],
  ['He has broken his arm.', 'Zlomil si je roko.'], ['I haven\'t been to Paris.', 'Nisem bil v Parizu.'], ['She hasn\'t called me.', 'Ni me poklicala.'],
  ['Have they seen the museum?', 'So si ogledali muzej?'], ['I have never eaten snails.', 'Nikoli nisem jedel polžev.'], ['She has never been abroad.', 'Nikoli ni bila v tujini.'],
  ['I have just finished.', 'Pravkar sem končal.'], ['She has already left.', 'Že je odšla.'], ['Have you been to London?', 'Si bil v Londonu?']
] },

p3u6: { maps: [
  ['should (advice)', 'You should drink more water. | He should see a doctor. | She should go to bed early. | We should wear helmets. | You should rest.'],
  ['shouldn\'t (advice)', 'You shouldn\'t eat so much sugar. | He shouldn\'t stay up late. | They shouldn\'t skip breakfast. | We shouldn\'t be late. | You shouldn\'t worry.'],
  ['must (a strong rule)', 'You must wear a seatbelt. | We must stop at a red light. | Pupils must wear shoes in the gym. | I must do my homework. | You must be quiet in the library.'],
  ['mustn\'t (it is forbidden)', 'You mustn\'t smoke here. | We mustn\'t run in the corridor. | You mustn\'t use your phone in class. | He mustn\'t touch the wire. | You mustn\'t cross the road on red.'],
  ['have to (it is necessary)', 'I have to get up at six. | She has to wear a uniform. | We have to take an exam. | He has to help at home. | Do you have to work on Saturday?'],
  ['don\'t have to (no need)', 'You don\'t have to come. | She doesn\'t have to pay. | We don\'t have to wear uniforms. | He doesn\'t have to get up early. | I don\'t have to cook today.']
], pairs: [
  ['You should drink more water.', 'Moral bi piti več vode.'], ['He should see a doctor.', 'Moral bi k zdravniku.'], ['You shouldn\'t eat so much sugar.', 'Ne bi smel jesti toliko sladkorja.'],
  ['We shouldn\'t be late.', 'Ne bi smeli zamuditi.'], ['You must wear a seatbelt.', 'Moraš si pripeti pas.'], ['You mustn\'t smoke here.', 'Tukaj ne smeš kaditi.'],
  ['We mustn\'t run in the corridor.', 'Po hodniku ne smemo teči.'], ['I have to get up at six.', 'Vstati moram ob šestih.'], ['She has to wear a uniform.', 'Nositi mora uniformo.'],
  ['You don\'t have to come.', 'Ni ti treba priti.'], ['She doesn\'t have to pay.', 'Ji ni treba plačati.'], ['Do you have to work on Saturday?', 'Moraš delati v soboto?']
] }

});
