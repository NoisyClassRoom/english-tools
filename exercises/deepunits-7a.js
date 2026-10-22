// ============================================================
//  EXPERT MIND MAPS OF THE UNITS - Dream Team Starter (class 7.a)          (written 22 Oct 2026; format and rules: see exercises/deepmaps.js)
//  window.DEEPUNITS[unit id] = mmTree([...]): branches, sub-branches and sub-sub-branches around the words of the Hard map of the unit.
//  A word appears ONCE in the map and is never the same as a group name. Shown as the tile "Expert" of the Mind map menu of the unit (exercises/index.html).
// ============================================================
window.DEEPUNITS = window.DEEPUNITS || {};
(() => {
  const T = window.mmTree; if (!T) return;
  const U = window.DEEPUNITS;

  U.dts0 = T([
    ['Greetings', '', [['Hello and nice to meet you', 'hello, hi, good morning, good evening, nice to meet you'], ['Leaving', 'good night, see you tomorrow, take care']]],
    ['Polite words', '', [['Asking and thanking', 'please, thank you, thanks a lot, you\'re welcome'], ['Saying sorry', 'sorry, excuse me, pardon, never mind']]],
    ['Colours', '', [['Main colours', 'red, blue, green, yellow, black, white'], ['Other colours', 'orange, purple, pink, brown, grey'], ['Special colours', 'turquoise, navy, beige, gold, silver']]],
    ['Names and spelling', '', [['Names', '', [['Whole name', 'name, first name, surname'], ['Other name', 'nickname']]], ['Spelling', 'alphabet, spell, capital letter, full stop']]],
    ['Countries and languages', '', [['Countries', 'country, Slovenia, nationality, passport, flag'], ['Languages', 'language, English, Slovenian']]]
  ]);

  U.dts1 = T([
    ['Numbers', '', [['Eleven to nineteen', '', [['Eleven to fifteen', 'eleven, twelve, thirteen, fourteen, fifteen'], ['Sixteen to nineteen', 'sixteen, seventeen, eighteen']]], ['Tens', 'ten, twenty, thirty, forty, fifty, sixty, seventy, eighty']]],
    ['Days', '', [['School days', 'Monday, Tuesday, Wednesday, Thursday, Friday'], ['Weekend days', 'Saturday, Sunday, weekend']]],
    ['Months', '', [['First half of the year', 'January, February, March, April, May, June'], ['Second half of the year', 'July, August, September, October, November, December']]],
    ['Dates and time', '', [['Special days', 'birthday, calendar'], ['Periods', 'month, season']]],
    ['To be', '', [['Short forms', 'I\'m, you\'re, he\'s, she\'s, it\'s, we\'re, they\'re'], ['Negative', 'I\'m not']]]
  ]);

  U.dts2 = T([
    ['Family', '', [['Parents and grandparents', 'mum, dad, parents, grandma, grandpa, grandparents'], ['Aunts and uncles', 'aunt, uncle, cousin'], ['Children', 'baby, toddler, son, daughter, twin, sister, brother']]],
    ['Big numbers', '', [['Tens', 'fifty, sixty, seventy, eighty, ninety'], ['Hundreds and thousands', 'a hundred, two hundred, a thousand']]],
    ['This and that', '', [['Close by', 'this is, these are, here, near'], ['Far away', 'that is, those are, there, far']]],
    ['Possessives', '', [['Pronouns', 'my, your, his, her, our, their'], ['Names with \'s', 'Ana\'s, Tom\'s']]],
    ['Questions', '', [['Who and whose', 'Who is this?, Whose book is it?, What\'s his name?'], ['Yes or no', 'Is he your brother?, Are they your parents?, Have you got a cousin?'], ['How and where', 'How old is your sister?, Where is your uncle from?']]]
  ]);

  U.dts3 = T([
    ['The time', '', [['Clock times', 'o\'clock, half past, quarter past, quarter to, twenty past, twenty-five to'], ['Morning and afternoon', 'a.m., p.m.']]],
    ['Parts of the day', '', [['Light', 'morning, afternoon, dawn, noon'], ['Dark', 'evening, night, midnight, sunset']]],
    ['Ball sports', '', [['Team ball sports', 'football, basketball, volleyball, handball, hockey, rugby'], ['Racket and club', 'tennis, golf']]],
    ['Other sports', '', [['Winter and water', 'skiing, skating, swimming'], ['Body sports', 'gymnastics, dancing, climbing, running, cycling']]],
    ['Sports people and places', '', [['People', 'player, team, coach, referee, fan'], ['Places and games', 'match, stadium, pitch']]],
    ['Present simple', '', [['Statements', 'She plays tennis on Fridays, He gets up at seven, We have lunch at noon'], ['Negative and questions', 'I don\'t swim, Do you play?, What time is it?'], ['Telling the time', 'It\'s half past four, At what time?']]]
  ]);

  U.dts4 = T([
    ['Morning', '', [['Waking up', 'wake up, brush my teeth, have a shower, get dressed'], ['Leaving home', 'have breakfast, pack my bag, leave home, catch the bus']]],
    ['School and homework', '', [['At school', 'go to school, learn, read, write'], ['At home', 'do homework, revise, practise, hand in']]],
    ['Hobbies', '', [['Making things', 'draw, paint, knit, collect stamps'], ['Music and photos', 'sing, dance, play the guitar, take photos']]],
    ['Home life', '', [['Relaxing', 'watch TV, read comics, listen to music, play computer games'], ['Chores', 'cook, tidy my room, wash up, go shopping']]],
    ['Evening', '', [['Before bed', 'have dinner, take a bath, set the alarm, turn off the light'], ['Sleeping', 'go to bed, sleep, dream, lie awake']]],
    ['Likes and dislikes', '', [['Liking', 'I like, I love, she enjoys, I\'m into'], ['Not liking', 'I don\'t like, I hate, he doesn\'t mind'], ['Asking', 'Do you like?']]]
  ]);

  U.dts5 = T([
    ['Head and face', '', [['Top of the head', 'forehead, eyebrow, eyelash'], ['Mouth and chin', 'lip, jaw, tongue, chin, cheek']]],
    ['Upper body', '', [['Trunk', 'neck, shoulder, chest, back, stomach'], ['Arm', 'elbow, wrist, thumb']]],
    ['Legs and feet', '', [['Leg', 'thigh, knee, shin, calf, hip'], ['Foot', 'ankle, heel, toe']]],
    ['Inside the body', '', [['Organs', 'heart, lungs, brain'], ['Body materials', 'bone, muscle, skin, blood, tooth']]],
    ['Monsters', '', [['Monster body', 'tail, wing, claw, horn, tentacle'], ['Covering', 'fur, scales'], ['Kinds of monster', 'monster, dragon, ghost']]],
    ['Orders', '', [['Do it', 'Give me the ball, Open your book, Come here, Sit down please'], ['Don\'t do it', 'Don\'t talk, Don\'t run'], ['Other orders', 'Be quiet, Look at me']]]
  ]);

  U.dts6 = T([
    ['Party food', '', [['Hot food', 'pizza, hamburger, chips, pancakes'], ['Cold food', 'cake, sandwich, ice cream, popcorn']]],
    ['Sweet things', '', [['Chocolate and biscuits', 'chocolate, biscuit, doughnut, cookie'], ['Sweets and jelly', 'sweets, lollipop, jelly, candyfloss']]],
    ['Fruit', '', [['Fruit you peel', 'banana, orange, pineapple, melon, lemon'], ['Fruit you bite', 'apple, strawberry, grapes']]],
    ['Vegetables', '', [['Salad vegetables', 'tomato, cucumber, lettuce, pepper'], ['Cooked vegetables', 'potato, carrot, onion, sweetcorn']]],
    ['Drinks', '', [['Cold drinks', 'juice, lemonade, milk, water, milkshake, smoothie'], ['Hot drinks', 'tea, hot chocolate']]],
    ['Countable and uncountable', '', [['Uncountable', 'some cake, any milk, How much juice?, There isn\'t any bread'], ['Countable', 'a sandwich, two apples, How many eggs?, There are some biscuits']]]
  ]);
})();
