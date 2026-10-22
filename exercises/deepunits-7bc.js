// ============================================================
//  EXPERT MIND MAPS OF THE UNITS - Project 2 (classes 7.b / 7.c)          (written 22 Oct 2026; format and rules: see exercises/deepmaps.js)
//  window.DEEPUNITS[unit id] = mmTree([...]): branches, sub-branches and sub-sub-branches around the words of the Hard map of the unit.
//  A word appears ONCE in the map and is never the same as a group name. Shown as the tile "Expert" of the Mind map menu of the unit (exercises/index.html).
// ============================================================
window.DEEPUNITS = window.DEEPUNITS || {};
(() => {
  const T = window.mmTree; if (!T) return;
  const U = window.DEEPUNITS;

  U.p2u1 = T([
    ['Months', '', [['Winter and spring months', 'January, February, March, April, May'], ['Summer months', 'June, July, August'], ['Autumn and winter months', 'September, October, November, December']]],
    ['Seasons', '', [['Warm', 'spring, summer'], ['Cool', 'autumn, winter']]],
    ['Ordinal numbers', '', [['Low numbers', 'first, second, third, fifth, ninth'], ['High numbers', 'twelfth, twentieth, thirty-first']]],
    ['How often', '', [['Always and often', 'always, usually, often'], ['Now and then', 'sometimes, occasionally'], ['Not often', 'hardly ever, rarely, never']]],
    ['Housework', '', [
      ['Cleaning', '', [['Washing', 'wash the dishes, do the laundry'], ['Other cleaning', 'vacuum, take out the rubbish']]],
      ['Tidying', 'tidy my room, make my bed'],
      ['Helping', 'set the table, feed the pets']]],
    ['Present simple', '', [['Positive', 'I always get up early, He usually walks, They sometimes watch, It starts at nine'], ['Negative', 'She doesn\'t like, We never eat meat'], ['Questions', 'Do you often play?, Does she live here?']]]
  ]);

  U.p2u2 = T([
    ['Mammals', '', [['Big cats', 'lion, tiger'], ['Wolves and foxes', 'wolf, fox'], ['Other mammals', 'bear, kangaroo, bat, giraffe']]],
    ['Reptiles and amphibians', '', [['Reptiles', 'crocodile, snake, lizard, turtle, chameleon'], ['Amphibians', 'frog, toad, salamander']]],
    ['Sea life', '', [['Sea mammals', 'dolphin, whale, seal'], ['Fish and sharks', 'shark, stingray'], ['Other sea animals', 'octopus, jellyfish, lobster']]],
    ['Birds', '', [['Birds that can fly', 'eagle, owl, parrot, seagull, woodpecker, flamingo'], ['Birds that cannot fly', 'penguin, ostrich']]],
    ['Insects', '', [['Flying insects', 'bee, butterfly, mosquito, wasp'], ['On the ground', 'ant, beetle, grasshopper, ladybird']]],
    ['Animal facts', '', [['Groups', 'mammal, reptile, amphibian, insect'], ['Other words', 'wild, endangered, predator, prey']]]
  ]);

  U.p2u3 = T([
    ['Getting there', '', [['At the airport', 'airport, boarding card, check-in, customs, departure, arrival'], ['Problems on the way', 'delay, luggage']]],
    ['Staying', '', [['Where to sleep', 'hotel, campsite, tent, hostel, apartment'], ['In the hotel', 'reception, full board, single room']]],
    ['Activities', '', [['By the sea', 'sail, snorkel, sunbathe'], ['On land', 'hike, go on an excursion, visit a museum, take photos, sightseeing']]],
    ['Things to take', '', [['Papers', 'passport, ticket, map, guidebook, travel insurance'], ['Packing', 'suitcase, sun cream, sunglasses']]],
    ['Holiday problems', '', [['Health', 'sunburn, homesick'], ['Travel trouble', 'lost luggage, delayed flight, missed bus, overbooked'], ['Other problems', 'queue, bad weather']]],
    ['Past simple', '', [['Positive', 'I went, we stayed, she bought, we visited, It was great'], ['Negative', 'they didn\'t go'], ['Questions', 'Did you swim?, Where did you go?']]]
  ]);

  U.p2u4 = T([
    ['Vegetables', '', [['Leaves', 'lettuce, spinach, cabbage'], ['Roots and bulbs', 'carrot, onion'], ['Other vegetables', 'cauliflower, mushroom, pumpkin']]],
    ['Fruit', '', [['Berries', 'strawberry, raspberry, blueberry, cherry, grapes'], ['Orchard fruit', 'peach, plum, pear']]],
    ['Meat and fish', '', [['Meat', '', [['Red meat', 'beef, pork, lamb'], ['Poultry and others', 'turkey, sausage, ham']]], ['Fish', 'salmon, tuna']]],
    ['Baking and sweet food', '', [['Baking', 'butter, flour, biscuit, pancake'], ['Sweet things', 'sugar, honey, jam, ice cream']]],
    ['Table and kitchen', '', [['Cutlery', 'spoon, knife, fork'], ['Dishes', 'plate, cup, bowl, jug'], ['Cooking', 'saucepan']]],
    ['Countable and uncountable', '', [['Countable', 'a carrot, a few strawberries, How many onions?'], ['Uncountable', 'some soup, How much sugar?, a lot of butter, a little salt, There isn\'t any oil']]]
  ]);

  U.p2u5 = T([
    ['Water', '', [['Moving water', 'river, stream, waterfall'], ['Still water', 'lake, bay'], ['Big water', 'sea, ocean, coast']]],
    ['Land', '', [['High land', 'mountain, hill, cliff'], ['Low land', 'valley, plain, desert'], ['Surrounded by water', 'island, peninsula'], ['Green land', 'forest']]],
    ['Directions', '', [['Main directions', 'north, south, east, west'], ['In between', 'north-east, south-west'], ['Describing', 'northern, southern']]],
    ['Continents', '', [['Europe, Asia and Africa', 'Europe, Asia, Africa'], ['The Americas', 'North America, South America'], ['Others', 'Australia, Antarctica, Oceania']]],
    ['Countries', '', [['Facts', 'capital, border, population, climate, territory'], ['Geography', 'volcano, continent']]],
    ['Comparing', '', [['Bigger and higher', 'bigger than, higher than, more beautiful than, as long as'], ['The most', 'the biggest, the longest, the highest, the most beautiful']]]
  ]);

  U.p2u6 = T([
    ['TV and radio', '', [['Programmes', 'TV programme, news, series, reality show, quiz show, weather forecast'], ['Equipment', 'channel, remote control']]],
    ['Kinds of films', '', [['Exciting', 'thriller, western, science fiction'], ['Funny and light', 'comedy, musical, animation'], ['Real and scary', 'documentary, horror film']]],
    ['People', '', [['On screen', 'actor, actress, extra, cast'], ['Behind the camera', 'director, producer'], ['Watching', 'audience, critic']]],
    ['Making a film', '', [['Words on the page', 'script, scene, subtitles'], ['Things to make it', 'special effects, costume, trailer, camera, studio']]],
    ['At the theatre', '', [['Where', 'theatre, stage, backstage'], ['During the show', 'performance, curtain, rehearsal, interval, applause']]],
    ['Going to', '', [['Plans', 'I\'m going to watch, She is going to see, We\'re going to buy tickets'], ['Questions', 'What are you going to do?, Are you going to the cinema?'], ['Negative and predictions', 'They aren\'t going to come, He\'s going to be famous, It\'s going to start at eight']]]
  ]);
})();
