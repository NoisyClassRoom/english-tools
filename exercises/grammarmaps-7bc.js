// ============================================================
//  GRAMMAR MIND MAPS + TARSIA PAIRS - Project 2 (classes 7.b / 7.c)          (written 22 Oct 2026; same format and rules as grammarmaps-8b.js)
//  maps: the most basic rule first. Easy = first 3 rules x 3 sentences, Medium = first 4 x 4, Hard = all. No comma inside a sentence of a map.
// ============================================================
window.GMAPS = window.GMAPS || {};
Object.assign(window.GMAPS, {

p2u1: { maps: [
  ['Positive (he / she / it + s)', 'He plays football. | She likes music. | It sleeps all day. | I walk to school. | They watch TV.'],
  ['Negative (don\'t / doesn\'t)', 'I don\'t like fish. | He doesn\'t play chess. | She doesn\'t get up early. | We don\'t eat meat. | It doesn\'t bark.'],
  ['Questions (Do / Does)', 'Do you play tennis? | Does she live here? | What time do you get up? | Does he like pizza? | Do they walk to school?'],
  ['Spelling of the he / she form', 'watch - watches | study - studies | go - goes | play - plays | wash - washes'],
  ['How often', 'I always do my homework. | She usually walks. | He never eats fish. | We often play chess. | They sometimes go swimming.']
], pairs: [
  ['He plays football.', 'Igra nogomet.'], ['She likes music.', 'Rada ima glasbo.'], ['I walk to school.', 'V šolo hodim peš.'], ['I don\'t like fish.', 'Ne maram rib.'],
  ['He doesn\'t play chess.', 'Ne igra šaha.'], ['Do you play tennis?', 'Igraš tenis?'], ['Does she live here?', 'Ali ona živi tukaj?'], ['What time do you get up?', 'Ob kateri uri vstaneš?'],
  ['I always do my homework.', 'Vedno naredim domačo nalogo.'], ['He never eats fish.', 'Nikoli ne je rib.'], ['We often play chess.', 'Pogosto igramo šah.'], ['She usually walks.', 'Običajno hodi peš.']
] },

p2u2: { maps: [
  ['Present continuous (now)', 'I am reading a book. | She is cooking dinner. | They are playing outside. | He is watching TV. | It is raining.'],
  ['Negative and questions', 'I am not sleeping. | He isn\'t working. | Are you listening? | What is she doing? | Are they playing?'],
  ['Present simple (always)', 'I read every day. | She cooks on Sundays. | They play football on Fridays. | He watches TV in the evening. | It rains a lot in spring.'],
  ['Time words for now', 'now | at the moment | today | right now | this week'],
  ['Verbs not used in the continuous', 'I like pizza. | She knows the answer. | I understand you. | He wants a drink. | We love music.']
], pairs: [
  ['I am reading a book.', 'Berem knjigo.'], ['She is cooking dinner.', 'Kuha večerjo.'], ['They are playing outside.', 'Igrajo se zunaj.'], ['It is raining.', 'Dežuje.'],
  ['I am not sleeping.', 'Ne spim.'], ['Are you listening?', 'Poslušaš?'], ['What is she doing?', 'Kaj dela?'], ['I read every day.', 'Berem vsak dan.'],
  ['She cooks on Sundays.', 'Ob nedeljah kuha.'], ['I like pizza.', 'Rad imam pico.'], ['She knows the answer.', 'Pozna odgovor.'], ['He wants a drink.', 'Hoče pijačo.']
] },

p2u3: { maps: [
  ['was / were', 'I was at home. | He was ill. | We were in Italy. | They were happy. | It was cold.'],
  ['Negative and questions with was / were', 'I wasn\'t tired. | They weren\'t at school. | Was he ill? | Were you at home? | Where were you?'],
  ['Regular past simple (-ed)', 'We visited Rome. | She watched a film. | I played tennis. | They walked to the beach. | He cooked dinner.'],
  ['Negative and questions with did', 'I didn\'t visit Paris. | She didn\'t like the food. | Did you enjoy it? | Did they swim? | What did you do?'],
  ['Time words for the past', 'yesterday | last week | two days ago | last summer | in 2020']
], pairs: [
  ['I was at home.', 'Bil sem doma.'], ['He was ill.', 'Bil je bolan.'], ['We were in Italy.', 'Bili smo v Italiji.'], ['It was cold.', 'Bilo je mrzlo.'],
  ['They weren\'t at school.', 'Niso bili v šoli.'], ['Were you at home?', 'Si bil doma?'], ['We visited Rome.', 'Obiskali smo Rim.'], ['She watched a film.', 'Gledala je film.'],
  ['I didn\'t visit Paris.', 'Nisem obiskal Pariza.'], ['Did you enjoy it?', 'Ti je bilo všeč?'], ['What did you do?', 'Kaj si naredil?'], ['two days ago', 'pred dvema dnevoma']
] },

p2u4: { maps: [
  ['Countable nouns', 'an apple | two carrots | three eggs | a banana | five sausages'],
  ['Uncountable nouns', 'some milk | some sugar | some rice | some water | some butter'],
  ['How many (countable)', 'How many apples? | How many eggs? | How many pupils? | How many sausages? | How many carrots?'],
  ['How much (uncountable)', 'How much milk? | How much sugar? | How much rice? | How much water? | How much butter?'],
  ['some / any / a lot of', 'I have some bread. | I haven\'t got any cheese. | Is there any juice? | We eat a lot of fruit. | There aren\'t any eggs.']
], pairs: [
  ['an apple', 'jabolko'], ['two carrots', 'dve korenčka'], ['some milk', 'nekaj mleka'], ['some sugar', 'nekaj sladkorja'],
  ['How many apples?', 'Koliko jabolk?'], ['How many eggs?', 'Koliko jajc?'], ['How much milk?', 'Koliko mleka?'], ['How much sugar?', 'Koliko sladkorja?'],
  ['I have some bread.', 'Imam nekaj kruha.'], ['Is there any juice?', 'Je kaj soka?'], ['We eat a lot of fruit.', 'Jemo veliko sadja.'], ['There aren\'t any eggs.', 'Jajc ni.']
] },

p2u5: { maps: [
  ['Short adjectives + er', 'Tom is taller than Ben. | A cat is smaller than a dog. | Today is colder than yesterday. | My bag is lighter than yours. | This road is longer than that one.'],
  ['Long adjectives + more', 'Maths is more difficult than art. | A car is more expensive than a bike. | This book is more interesting. | She is more careful than me. | English is more useful.'],
  ['Short adjectives + est', 'Everest is the highest mountain. | He is the tallest in class. | It is the longest river. | This is the oldest castle. | Today is the coldest day.'],
  ['Long adjectives + most', 'She is the most famous singer. | It is the most beautiful city. | That is the most expensive car. | This is the most difficult test. | He is the most careful driver.'],
  ['Irregular forms', 'good - better - the best | bad - worse - the worst | far - further - the furthest | many - more - the most | little - less - the least']
], pairs: [
  ['Tom is taller than Ben.', 'Tom je višji od Bena.'], ['A cat is smaller than a dog.', 'Mačka je manjša od psa.'], ['Today is colder than yesterday.', 'Danes je hladneje kot včeraj.'], ['A car is more expensive than a bike.', 'Avto je dražji od kolesa.'],
  ['Everest is the highest mountain.', 'Everest je najvišja gora.'], ['He is the tallest in class.', 'Je najvišji v razredu.'], ['It is the longest river.', 'To je najdaljša reka.'], ['It is the most beautiful city.', 'To je najlepše mesto.'],
  ['This is the most difficult test.', 'To je najtežji test.'], ['good - better - the best', 'dober - boljši - najboljši'], ['bad - worse - the worst', 'slab - slabši - najslabši'], ['Maths is more difficult than art.', 'Matematika je težja od likovne.']
] },

p2u6: { maps: [
  ['going to (plans)', 'I am going to watch a film. | She is going to buy tickets. | We are going to see a play. | They are going to meet at six. | He is going to be an actor.'],
  ['going to (negative and questions)', 'I am not going to stay. | He isn\'t going to come. | Are you going to watch it? | What are you going to see? | Is she going to sing?'],
  ['Future time words', 'tomorrow | next week | tonight | this weekend | next year'],
  ['Likes', 'I love comedies. | She likes cartoons. | He enjoys horror films. | We are fond of musicals. | They like documentaries.'],
  ['Dislikes', 'I hate horror films. | She doesn\'t like thrillers. | He can\'t stand loud music. | We don\'t enjoy soap operas. | They aren\'t keen on westerns.']
], pairs: [
  ['I am going to watch a film.', 'Šel bom gledat film.'], ['She is going to buy tickets.', 'Kupila bo vstopnice.'], ['We are going to see a play.', 'Šli bomo gledat igro.'], ['He is going to be an actor.', 'Postal bo igralec.'],
  ['He isn\'t going to come.', 'Ne bo prišel.'], ['Are you going to watch it?', 'Boš to gledal?'], ['What are you going to see?', 'Kaj boš šel gledat?'], ['tomorrow', 'jutri'],
  ['next week', 'naslednji teden'], ['I love comedies.', 'Obožujem komedije.'], ['I hate horror films.', 'Sovražim grozljivke.'], ['She likes cartoons.', 'Rada ima risanke.']
] }

});
