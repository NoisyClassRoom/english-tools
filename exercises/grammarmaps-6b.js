// ============================================================
//  GRAMMAR MIND MAPS + TARSIA PAIRS - Project 1 (class 6.b)          (written 21 Oct 2026; same format and rules as grammarmaps-8b.js)
//  maps: the most basic rule first. Easy = first 3 rules x 3 sentences, Medium = first 4 x 4, Hard = all. No comma inside a sentence of a map.
// ============================================================
window.GMAPS = window.GMAPS || {};
Object.assign(window.GMAPS, {

p1u1: { maps: [
  ['a (before a consonant sound)', 'a book | a pen | a ruler | a desk | a bag'],
  ['an (before a vowel sound)', 'an apple | an eraser | an orange | an umbrella | an egg'],
  ['my and your', 'my name | your name | my bag | your pencil | my teacher'],
  ['his and her', 'his name | her name | his bag | her book | her teacher']
], pairs: [
  ['a book', 'knjiga'], ['an apple', 'jabolko'], ['my name', 'moje ime'], ['your name', 'tvoje ime'], ['his bag', 'njegova torba'], ['her book', 'njena knjiga'],
  ['an orange', 'pomaranča'], ['a ruler', 'ravnilo'], ['an umbrella', 'dežnik'], ['my teacher', 'moj učitelj'], ['her teacher', 'njena učiteljica'], ['a desk', 'miza']
] },

p1u2: { maps: [
  ['I am / you are', 'I am Ana. | You are my friend. | I am eleven. | You are a pupil. | I am from Slovenia.'],
  ['he is / she is / it is', 'He is my brother. | She is my sister. | It is a cat. | He is tall. | She is happy.'],
  ['we are / they are', 'We are friends. | They are in the park. | We are in class 6. | They are my cousins. | We are twelve.'],
  ['Negative (not)', 'I am not tired. | He is not here. | She isn\'t my sister. | We aren\'t late. | They aren\'t at home.'],
  ['Questions', 'Are you Ana? | Is he your brother? | Is she a teacher? | Are they your friends? | Where are you from?']
], pairs: [
  ['I am eleven.', 'Imam enajst let.'], ['You are my friend.', 'Ti si moj prijatelj.'], ['He is my brother.', 'On je moj brat.'], ['She is my sister.', 'Ona je moja sestra.'],
  ['It is a cat.', 'To je mačka.'], ['We are friends.', 'Midva sva prijatelja.'], ['They are my cousins.', 'So moji bratranci.'], ['I am not tired.', 'Nisem utrujen.'],
  ['She isn\'t my sister.', 'Ni moja sestra.'], ['We aren\'t late.', 'Nismo zamudili.'], ['Are you Ana?', 'Si ti Ana?'], ['Where are you from?', 'Od kod si?']
] },

p1u3: { maps: [
  ['I / you / we / they have got', 'I have got a dog. | You have got a bike. | We have got a cat. | They have got two rabbits. | I have got a phone.'],
  ['he / she / it has got', 'He has got a hamster. | She has got a computer. | It has got four legs. | She has got a tablet. | He has got a skateboard.'],
  ['Negative (haven\'t / hasn\'t)', 'I haven\'t got a parrot. | She hasn\'t got a bike. | We haven\'t got a car. | He hasn\'t got a phone. | They haven\'t got a dog.'],
  ['Questions (Have you got ...?)', 'Have you got a pet? | Has she got a bike? | Have they got a camera? | Has he got a tablet? | What have you got?'],
  ['a and some', 'a pencil | some pencils | a rabbit | some rabbits | some water']
], pairs: [
  ['I have got a dog.', 'Imam psa.'], ['You have got a bike.', 'Ti imaš kolo.'], ['He has got a hamster.', 'On ima hrčka.'], ['She has got a computer.', 'Ona ima računalnik.'],
  ['It has got four legs.', 'Ima štiri noge.'], ['They have got two rabbits.', 'Imajo dva zajca.'], ['I haven\'t got a parrot.', 'Nimam papige.'], ['She hasn\'t got a bike.', 'Nima kolesa.'],
  ['Have you got a pet?', 'Imaš hišnega ljubljenčka?'], ['Has she got a bike?', 'Ima ona kolo?'], ['What have you got?', 'Kaj imaš?'], ['some rabbits', 'nekaj zajcev']
] },

p1u4: { maps: [
  ['o\'clock and half past', 'It\'s two o\'clock. | It\'s half past three. | It\'s seven o\'clock. | It\'s half past ten. | It\'s one o\'clock.'],
  ['quarter past and quarter to', 'It\'s quarter past four. | It\'s quarter to five. | It\'s quarter past nine. | It\'s quarter to twelve. | It\'s quarter past six.'],
  ['at + time', 'at seven o\'clock | at half past eight | at noon | at midnight | at quarter to one'],
  ['on + day', 'on Monday | on Friday | on Sunday | on Saturday morning | on Tuesday'],
  ['in + part of the day', 'in the morning | in the afternoon | in the evening | in July | in winter']
], pairs: [
  ['It\'s two o\'clock.', 'Ura je dve.'], ['It\'s half past three.', 'Ura je pol štirih.'], ['It\'s quarter past four.', 'Ura je četrt čez štiri.'], ['It\'s quarter to five.', 'Ura je tri četrt na pet.'],
  ['at seven o\'clock', 'ob sedmih'], ['at noon', 'opoldne'], ['on Monday', 'v ponedeljek'], ['on Sunday', 'v nedeljo'], ['in the morning', 'zjutraj'], ['in the evening', 'zvečer'],
  ['in July', 'julija'], ['at midnight', 'opolnoči']
] },

p1u5: { maps: [
  ['in / on / under', 'The cat is in the box. | The book is on the table. | The ball is under the bed. | The pen is in my bag. | The lamp is on the desk.'],
  ['next to / between / behind', 'The bank is next to the shop. | The park is between two streets. | The dog is behind the door. | My bag is next to my chair. | The cinema is behind the school.'],
  ['There is (one thing)', 'There is a sofa in the room. | There is a garden behind the house. | There is a lamp on the shelf. | There is a bed in my room. | There isn\'t a TV.'],
  ['There are (more things)', 'There are two chairs. | There are three windows. | There are books on the shelf. | There aren\'t any pictures. | There are four rooms.'],
  ['Questions', 'Is there a library? | Are there any shops? | Where is the cinema? | How many rooms are there? | Is there a park near here?']
], pairs: [
  ['The cat is in the box.', 'Mačka je v škatli.'], ['The book is on the table.', 'Knjiga je na mizi.'], ['The ball is under the bed.', 'Žoga je pod posteljo.'], ['There is a sofa in the room.', 'V sobi je kavč.'],
  ['There are two chairs.', 'Tam sta dva stola.'], ['There are three windows.', 'Tam so tri okna.'], ['There isn\'t a TV.', 'Televizije ni.'], ['Is there a library?', 'Je tam knjižnica?'],
  ['Where is the cinema?', 'Kje je kino?'], ['The bank is next to the shop.', 'Banka je poleg trgovine.'], ['The dog is behind the door.', 'Pes je za vrati.'], ['Are there any shops?', 'So tam kakšne trgovine?']
] },

p1u6: { maps: [
  ['Positive (am / is / are + -ing)', 'I am reading a book. | She is wearing a hat. | They are playing football. | He is running. | We are listening to music.'],
  ['Negative (not)', 'I am not sleeping. | He isn\'t wearing a coat. | They aren\'t playing. | She isn\'t smiling. | We aren\'t working.'],
  ['Questions', 'Are you reading? | Is he sleeping? | What is she doing? | What are they wearing? | Are they running?'],
  ['Spelling of -ing', 'run - running | swim - swimming | make - making | dance - dancing | sit - sitting']
], pairs: [
  ['I am reading a book.', 'Berem knjigo.'], ['She is wearing a hat.', 'Ima klobuk na glavi.'], ['They are playing football.', 'Igrajo nogomet.'], ['He is running.', 'Teče.'],
  ['We are listening to music.', 'Poslušamo glasbo.'], ['I am not sleeping.', 'Ne spim.'], ['He isn\'t wearing a coat.', 'Ne nosi plašča.'], ['Are you reading?', 'Bereš?'],
  ['What is she doing?', 'Kaj dela ona?'], ['What are they wearing?', 'Kaj nosijo?'], ['She isn\'t smiling.', 'Ne smeji se.'], ['Are they running?', 'Ali tečejo?']
] }

});
