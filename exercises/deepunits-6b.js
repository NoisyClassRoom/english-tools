// ============================================================
//  EXPERT MIND MAPS OF THE UNITS - Project 1 (class 6.b)          (written 22 Oct 2026; format and rules: see exercises/deepmaps.js)
//  window.DEEPUNITS[unit id] = mmTree([...]): branches, sub-branches and sub-sub-branches around the words of the Hard map of the unit (plus some more).
//  A word appears ONCE in the map and is never the same as a group name. Shown as the tile "Expert" of the Mind map menu of the unit (exercises/index.html).
// ============================================================
window.DEEPUNITS = window.DEEPUNITS || {};
(() => {
  const T = window.mmTree; if (!T) return;
  const U = window.DEEPUNITS;

  U.p1u1 = T([
    ['Greetings', '', [['Meeting', 'hello, good morning, nice to meet you, how are you?'], ['Answering', 'I\'m fine, very well'], ['Saying goodbye', 'goodbye, good night, see you later']]],
    ['Letters and spelling', '', [['Letters', 'letter, alphabet, capital letter'], ['Sounds', 'vowel, consonant'], ['Writing', 'spell, word, sentence']]],
    ['Numbers', '', [['Tens', 'twenty, thirty, fifty, ninety'], ['Big numbers', 'hundred, thousand'], ['Sums', 'plus, minus']]],
    ['In the classroom', '', [['Furniture', 'desk, chair, board'], ['Things to use', '', [['Writing things', 'ruler, rubber, pencil case'], ['Books and dictionaries', 'notebook, dictionary']]]]],
    ['Classroom instructions', '', [['Moving', 'sit down, stand up, close the door'], ['Working', 'open your book, write, read, listen, look at the board']]],
    ['Plurals', '', [['Add -s or -es', 'books, boxes, buses, glasses'], ['Irregular plurals', 'children, men, women'], ['Change y to ies', 'babies']]]
  ]);

  U.p1u2 = T([
    ['The family', '', [['Grandparents', 'grandfather, grandmother'], ['Uncles and aunts', 'uncle, aunt'], ['Children of relatives', 'cousin, nephew, niece'], ['Brothers and sisters', 'twins']]],
    ['Countries and people', '', [
      ['Near Slovenia', '', [['Neighbour countries', 'Slovenia, Croatia, Austria, Hungary'], ['Neighbour nationalities', 'Slovenian, Croatian, Austrian, Hungarian']]],
      ['Further away', '', [['Other countries', 'France, Spain, Germany, Poland'], ['Other nationalities', 'French, Spanish, German, Polish']]]]],
    ['The week', '', [['Working days', 'Monday, Tuesday, Wednesday, Thursday, Friday'], ['Free days', 'Saturday, Sunday, weekend']]],
    ['Whose is it?', '', [['Mine and yours', 'my, your, whose'], ['Others', 'his, her, its, our, their']]],
    ['Questions', '', [['About people', 'Who is he?, What\'s her name?, How old are you?'], ['Yes or no', 'Is she your sister?, Are they cousins?'], ['About places and times', 'Where are you from?, When is your birthday?, Whose is this?']]]
  ]);

  U.p1u3 = T([
    ['Pets', '', [['Small pets', 'hamster, goldfish, rabbit, budgie'], ['Pets with legs', 'dog, cat, tortoise, guinea pig'], ['Young animals', 'puppy, kitten']]],
    ['Technology', '', [['Phones and computers', 'mobile phone, computer, tablet, laptop'], ['Other things', 'camera, headphones, games console, charger']]],
    ['Toys and wheels', '', [['Wheels', 'bike, scooter, skateboard, roller skates'], ['Snow', 'skis, snowboard, sledge'], ['Protection', 'helmet']]],
    ['School subjects', '', [['Languages', 'English, Slovenian'], ['Science and numbers', 'Maths, Science, Geography, History'], ['Creative', 'Art, Music']]],
    ['The timetable', '', [['Time at school', 'timetable, lesson, break, term'], ['Work and marks', 'homework, test, report']]],
    ['Have got', '', [['Positive', 'I\'ve got, he\'s got, they\'ve got'], ['Negative', 'she hasn\'t got, haven\'t got'], ['Questions and answers', 'Have you got?, Yes I have, No I haven\'t']]]
  ]);

  U.p1u4 = T([
    ['Morning routine', '', [['Getting ready', 'wake up, get up, brush my teeth, have a shower, get dressed'], ['Leaving', 'have breakfast, leave home, catch the bus']]],
    ['Afternoon and evening', '', [['Meals', 'have lunch, have dinner'], ['Free time', 'watch TV, read a book, tidy my room'], ['Before bed', 'do homework, take a bath, go to bed']]],
    ['Telling the time', '', [['On the hour', 'o\'clock, noon, midnight'], ['Past the hour', 'half past, quarter past, five past'], ['To the hour', 'quarter to, twenty to']]],
    ['Music', '', [['Strings', 'guitar, violin, cello'], ['Keys and drums', 'piano, drums'], ['Wind', 'trumpet, flute, saxophone']]],
    ['Sports', '', [['With a ball', 'football, basketball, tennis'], ['In water and snow', 'swimming, skiing'], ['Other sports', 'cycling, gymnastics, judo']]],
    ['Present simple', '', [['Statements', 'I get up, she goes, at seven o\'clock'], ['Negative', 'he doesn\'t like'], ['Questions', 'Do you play?, What time does it start?']]]
  ]);

  U.p1u5 = T([
    ['Rooms and spaces', '', [['Main rooms', 'bedroom, kitchen, bathroom, living room'], ['Other spaces', 'hall, attic, cellar, garden']]],
    ['Furniture', '', [['For sitting and sleeping', 'sofa, armchair, bed'], ['For storing', 'wardrobe, shelf, cupboard, bookcase'], ['Other things', 'lamp, desk']]],
    ['Shops', '', [['Food shops', 'bakery, butcher\'s, greengrocer\'s, supermarket'], ['Other shops', 'bookshop, chemist\'s, newsagent\'s, shopping centre']]],
    ['Public places', '', [['Free time', 'cinema, museum, swimming pool, park'], ['Services', 'library, hospital, school, police station']]],
    ['Where is it?', '', [['Close by', 'next to, near, on the corner'], ['Across', 'opposite, between, across the street'], ['Front and back', 'behind, in front of, far from']]],
    ['There is, there are', '', [['Singular', 'There is a bed, There\'s a garden, There isn\'t a TV'], ['Plural', 'There are two chairs, There aren\'t any shops'], ['Questions', 'Is there a lamp?, Are there any books?, How many rooms are there?']]]
  ]);

  U.p1u6 = T([
    ['Hair', '', [['Colour', 'fair, dark, ginger, blond'], ['Shape', 'curly, straight, wavy, bald']]],
    ['Faces', '', [['Parts of the face', 'eyes, nose, glasses'], ['Hair on the face', 'beard, moustache'], ['Marks', 'freckles, dimples, wrinkles']]],
    ['Size and age', '', [['Height and build', 'tall, short, slim, plump, strong'], ['Age', 'young, old, middle-aged']]],
    ['Looks and character', '', [['Looks', 'beautiful, handsome, pretty'], ['Character', '', [['Pleasant', 'kind, friendly, funny, clever'], ['Quiet', 'shy']]]]],
    ['Clothes', '', [['Tops', 'T-shirt, jumper'], ['Bottoms and dresses', 'jeans, skirt, dress'], ['Feet and head', 'trainers, hat, coat']]],
    ['Present continuous', '', [['Positive', 'She is wearing, He\'s smiling, They are running'], ['Negative', 'I\'m not sleeping'], ['Questions', 'What is he doing?, Are you reading?'], ['Time words', 'at the moment, now']]]
  ]);
})();
