// ============================================================
//  EXPERT MIND MAPS OF THE UNITS - Project 4 (class 9.b)          (written 22 Oct 2026; format and rules: see exercises/deepmaps.js)
//  window.DEEPUNITS[unit id] = mmTree([...]): branches, sub-branches and sub-sub-branches around the words of the Hard map of the unit.
//  A word appears ONCE in the map and is never the same as a group name. Shown as the tile "Expert" of the Mind map menu of the unit (exercises/index.html).
// ============================================================
window.DEEPUNITS = window.DEEPUNITS || {};
(() => {
  const T = window.mmTree; if (!T) return;
  const U = window.DEEPUNITS;

  U.p4u1 = T([
    ['Natural materials', '', [['From animals', 'wool, leather, silk'], ['From plants', 'wood, cotton, linen'], ['From the ground', 'stone, clay']]],
    ['Metals', '', [['Precious metals', 'gold, silver'], ['Strong metals', 'iron, steel, aluminium'], ['Mixed and soft metals', 'copper, bronze, tin']]],
    ['Man-made materials', '', [['Hard materials', 'glass, brick, concrete'], ['Soft materials', 'plastic, rubber, nylon'], ['Paper products', 'paper, cardboard']]],
    ['Time words', '', [['Long ago', 'ancient, prehistoric, medieval'], ['Periods', 'century, decade, era, millennium'], ['Now', 'modern']]],
    ['History', '', [['People and power', 'invader, rival, empire, battle'], ['Things and ideas', '', [['Things', 'tool, treasure'], ['Ideas', 'invent, discovery']]]]],
    ['Past and enough', '', [['Used to', 'I used to play, He didn\'t use to, Did you use to?'], ['Past continuous', 'When I arrived it was raining, She was sleeping when'], ['Too and enough', 'too small, warm enough, I had to go']]]
  ]);

  U.p4u2 = T([
    ['Being famous', '', [['Famous people', 'celebrity, film star, fan, fan club'], ['Events and things', 'autograph, red carpet, spotlight'], ['Attention', 'fame, paparazzi']]],
    ['Doing well', '', [['Money and fame', 'fortune, reputation'], ['Skills and work', 'talent, career, ambition'], ['Results', 'award, success, achievement']]],
    ['Writing about people', '', [['Stories of a life', 'biography, autobiography'], ['In the press', 'interview, article, headline, review, magazine']]],
    ['Computer parts', '', [['Input', 'keyboard, mouse, webcam'], ['Output', 'screen, monitor, printer, speaker'], ['Inside', 'hard drive']]],
    ['Computer actions', '', [['Copying and saving', 'save, copy, paste'], ['Online and files', 'upload, download, install, delete, click']]],
    ['Present perfect and tags', '', [['Present perfect', 'I\'ve been to Rome, He has just finished, She has gone, Have you ever met?'], ['For and since', 'for ten years, since 2015'], ['Question tags', 'You\'re Slovenian aren\'t you?, He can swim can\'t he?']]]
  ]);

  U.p4u3 = T([
    ['Injuries', '', [['Hurting the skin', 'cut, burn, blister, bruise'], ['Hurting bones and joints', 'broken bone, fracture, sprain'], ['In general', 'injury']]],
    ['Joints and bones', '', [['Arm', 'shoulder, elbow, wrist'], ['Leg', 'hip, knee, ankle'], ['Head and back', 'skull, spine']]],
    ['Organs', '', [['Chest', 'heart, lungs'], ['Belly', 'stomach, kidney, liver, intestine'], ['Head and neck', 'brain, throat']]],
    ['Nutrients', '', [['Energy', 'carbohydrate, fat, protein'], ['Small but important', 'vitamin, mineral, calcium, iron'], ['Digestion', 'fibre']]],
    ['Healthy living', '', [['Eating', 'diet, balanced meal, healthy'], ['Resting and moving', 'exercise, sleep, fresh air'], ['Care', 'check-up, hygiene']]],
    ['Advice and linking', '', [['Advice', 'You should rest, You shouldn\'t eat, It might hurt, She may need a plaster'], ['Who and that', 'The girl who lives next door, The book that I read'], ['Agreeing', 'So do I, Neither do I']]]
  ]);

  U.p4u4 = T([
    ['Medieval times', '', [['Royal people', 'king, queen, prince, princess'], ['Soldiers and fighting', 'knight, sword, armour'], ['Place', 'castle']]],
    ['Stories and legends', '', [['Good characters', 'hero, wizard'], ['Bad characters', 'villain, enemy, giant, dragon'], ['Story words', 'legend, battle']]],
    ['Courage and action', '', [['Being brave', 'brave, courage, rescue'], ['Winning and losing', 'win, lose, defeat, escape'], ['Crime', 'burglar']]],
    ['Feelings and descriptions', '', [
      ['How I feel', '', [['Pleasant feelings', 'excited, interested, surprised, amazed'], ['Unpleasant feelings', 'bored, frightened, shocked, terrified']]],
      ['How things are', '', [['Pleasant things', 'exciting, interesting, surprising, amazing'], ['Unpleasant things', 'boring, frightening, shocking, terrifying']]]]],
    ['Verb patterns', '', [['Verb + ing', 'enjoy listening, stop playing, finish working, imagine flying'], ['Verb + to', 'want to be, decide to call, hope to win'], ['With a preposition', 'be good at']]]
  ]);

  U.p4u5 = T([
    ['Power', '', [['Clean power', 'solar power, wind power, hydropower, biofuel'], ['Limited power sources', 'fossil fuel, nuclear power'], ['Power words', 'energy, fuel']]],
    ['Climate', '', [['Causes', 'greenhouse effect, carbon dioxide, ozone layer'], ['Effects', 'melting ice, rising sea level, heatwave'], ['Big words', 'climate change, global warming']]],
    ['Pollution problems', '', [['In the air', 'smog, exhaust fumes, acid rain'], ['On land and water', 'oil spill, litter, waste'], ['In general', 'pollution, toxic']]],
    ['Natural disasters', '', [['Water and wind', 'flood, tsunami, hurricane, storm surge'], ['Dry and hot', 'drought, wildfire, famine'], ['Ground', 'landslide']]],
    ['Nature', '', [['Places', 'rainforest, habitat, ice'], ['Living things', 'species, wildlife, biodiversity'], ['In danger', 'endangered, extinct']]],
    ['Passive voice', '', [['Present', 'Plastic is recycled, English is spoken, The Earth is being polluted'], ['Past', 'The window was broken, It was written by, The pupils were told'], ['More examples', 'Many trees are cut down, The rubbish is collected']]]
  ]);

  U.p4u6 = T([
    ['Friends and trust', '', [['Good qualities', 'loyal, honest, supportive, reliable'], ['Feelings between friends', 'friendship, trust, respect, close']]],
    ['Problems', '', [['Fighting', 'argument, argue, fall out, misunderstanding'], ['Bad feelings', 'jealous, lonely, selfish, unfair']]],
    ['Parents and rules', '', [['House rules', 'rules, strict, curfew, permission'], ['Punishing and allowing', 'allow, punish, grounded, pocket money']]],
    ['Growing up', '', [['Stages of life', 'childhood, teenager, adult, generation'], ['Being grown-up', 'independent, mature, responsible'], ['The process', 'grow up']]],
    ['Phrasal verbs', '', [['Getting on', 'get on with, make up, put up with'], ['Family', 'look after, look up to, take after, bring up'], ['Falling out', 'fall out with']]],
    ['First conditional', '', [['If clauses', 'If it rains we\'ll stay, If you study you\'ll pass, If she is late'], ['Main clauses', 'What will you do if, We\'ll start without her'], ['Other words', 'Unless you hurry, As soon as I know, I won\'t go if']]]
  ]);
})();
