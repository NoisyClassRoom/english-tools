// ============================================================
//  EXPERT MIND MAPS OF THE UNITS - Project 3 (class 8.b)          (written 22 Oct 2026; format and rules: see exercises/deepmaps.js)
//  window.DEEPUNITS[unit id] = mmTree([...]): branches, sub-branches and sub-sub-branches around the words of the Hard map of the unit (plus some more).
//  A word appears ONCE in the map and is never the same as a group name. Shown as the tile "Expert" of the Mind map menu of the unit (exercises/index.html).
// ============================================================
window.DEEPUNITS = window.DEEPUNITS || {};
(() => {
  const T = window.mmTree; if (!T) return;
  const U = window.DEEPUNITS;

  U.p3u1 = T([
    ['Feelings', '', [
      ['Good feelings', '', [['Happy and proud', 'proud, delighted, grateful, relieved'], ['Feeling excited', 'excited, thrilled, surprised']]],
      ['Bad feelings', '', [['Feeling worried', 'nervous, worried, embarrassed'], ['Sad or angry', 'lonely, upset, disappointed, jealous']]]]],
    ['Describing a day', '', [['Good day', 'fantastic, exciting, wonderful'], ['Bad day', 'terrible, boring, awful']]],
    ['Family', '', [['Close family', 'only child, twin, half-brother, stepsister'], ['Parents by marriage', 'stepmother, stepfather, in-laws'], ['The wider family', 'relatives, cousin']]],
    ['Family events', '', [['Celebrations', 'wedding, anniversary, graduation, birthday party'], ['Changes', 'move house, new baby, first day at school'], ['Meeting again', 'family reunion']]],
    ['Getting on with people', '', [['Good relations', 'get on well, make friends, keep in touch, look after'], ['Problems', 'argue, fall out'], ['Meeting people', 'invite, introduce']]],
    ['Past simple (irregular)', '', [['Actions', 'went, bought, met'], ['States and senses', 'had, felt, saw, lost, told']]]
  ]);

  U.p3u2 = T([
    ['The solar system', '', [['Planets near the sun', 'Mercury, Venus, Earth, Mars'], ['Giant planets', 'Jupiter, Saturn, Uranus, Neptune'], ['Around the planets', 'moon, comet, asteroid']]],
    ['Far away', '', [['Stars and galaxies', 'star, galaxy, Milky Way, nebula, universe'], ['Strange things', 'black hole, light year']]],
    ['Space travel', '', [
      ['Vehicles', 'rocket, spaceship, space station, satellite'],
      ['Equipment', 'telescope, space suit'],
      ['A mission', '', [['Start and end', 'launch, landing'], ['The work', 'mission, experiment']]]]],
    ['People and jobs', '', [['In space', 'astronaut, pilot'], ['On Earth', 'scientist, engineer, inventor'], ['Imaginary', 'alien, robot']]],
    ['Science words', '', [['Conditions in space', 'gravity, weightless, orbit, radiation'], ['What we breathe', 'atmosphere, oxygen']]],
    ['Talking about the future', '', [['Sure', 'will, going to, I think it will'], ['Not sure', 'probably, perhaps, hope, maybe'], ['Time phrases', 'in the future, one day, by 2100']]]
  ]);

  U.p3u3 = T([
    ['Natural disasters', '', [
      ['Weather disasters', '', [['Too much water', 'flood, tsunami, hurricane'], ['Too little water', 'drought, heatwave'], ['Cold and storms', 'blizzard, tornado, thunderstorm, lightning']]],
      ['Ground disasters', '', [['Earth moves', 'earthquake, landslide, avalanche'], ['Volcanoes', 'volcano, eruption, lava']]],
      ['Fires', 'wildfire, fire']]],
    ['Help and danger', '', [['Before', 'warning, shelter'], ['During', 'rescue, evacuate, emergency'], ['After', 'survivor, victim, relief']]],
    ['Rooms', '', [['Downstairs', 'hall, dining room, living room'], ['Upstairs and under', 'attic, cellar, study']]],
    ['Parts of a house', '', [['Top and bottom', 'roof, ceiling, floor'], ['Inside the room', 'wall, staircase, fireplace']]],
    ['A detective story', '', [['People', 'detective, suspect, witness'], ['Clues', 'clue, evidence, alibi, crime scene'], ['The case', 'mystery, crime']]],
    ['Past continuous', '', [['Time words', 'while, when, at that moment, all evening'], ['Phrases', 'I was sleeping, they were watching, What were you doing?']]]
  ]);

  U.p3u4 = T([
    ['London landmarks', '', [['Palaces and churches', 'Buckingham Palace, St Paul\'s Cathedral, Westminster Abbey'], ['Towers and wheels', 'Big Ben, Tower Bridge, London Eye'], ['Open spaces', 'Hyde Park, Trafalgar Square']]],
    ['Public places', '', [['Culture', 'museum, art gallery, theatre, library'], ['Services', 'station, police station, post office, market']]],
    ['On the street', '', [['Crossing the road', 'pavement, crossing, traffic lights, zebra crossing'], ['Roads', 'roundabout, junction, corner, one-way street']]],
    ['Directions', '', [
      ['Turning', '', [['Left and right', 'turn left, turn right'], ['Straight ahead', 'go straight on, go past']]],
      ['Crossing and ending', 'cross the road, at the end of, take the second turning, you can\'t miss it']]],
    ['Where is it?', '', [['Next to things', 'next to, near, on the corner, behind'], ['Across and between', 'opposite, across from, between, in front of']]],
    ['Tourists', '', [['Before the trip', 'map, guide, ticket'], ['During the trip', 'sightseeing, queue, entrance, souvenir, tourist']]]
  ]);

  U.p3u5 = T([
    ['Famous people', '', [['Special people', 'hero, heroine, champion, pioneer'], ['Explorers and makers', 'explorer, inventor, composer'], ['Admired', 'celebrity, role model']]],
    ['Qualities', '', [['Strong and brave', 'brave, courageous, determined, ambitious'], ['Success', 'successful, famous, talented, popular'], ['Character', 'modest, proud']]],
    ['Achievements', '', [['Prizes', 'medal, award, record'], ['Discoveries', 'discovery, invention, expedition, climb, achievement']]],
    ['Our planet', '', [
      ['Problems', 'pollution, rubbish, endangered, extinct'],
      ['Solutions', 'recycle, protect, conservation'],
      ['Nature', '', [['Living things', 'wildlife'], ['Around us', 'environment']]]]],
    ['Music', '', [['Groups', 'band, orchestra, choir'], ['Parts of a song', 'melody, rhythm, lyrics, chorus'], ['Events', 'concert']]],
    ['Present perfect', '', [['Experience', 'ever, never, so far'], ['Recent', 'just, already, yet, recently'], ['Time', 'since, for']]]
  ]);

  U.p3u6 = T([
    ['Pains', '', [['Head and face', 'headache, toothache, earache, sore throat'], ['Body', 'stomach ache, backache, sore muscles, cramp']]],
    ['Illnesses', '', [
      ['Infections', '', [['Cold symptoms', 'cough, cold, flu'], ['Signs', 'fever, rash, dizzy']]],
      ['Allergy and sprain', 'allergy, sprain']]],
    ['Treatment', '', [['Medicines', 'medicine, tablet, cream, injection, prescription'], ['Basic care', 'plaster, bandage'], ['At the doctor', 'operation, vaccination, check-up, x-ray']]],
    ['In an emergency', '', [['Help', 'ambulance, emergency, first aid'], ['Injuries', 'accident, wound, bruise'], ['Places', 'hospital, surgery, pharmacy']]],
    ['Measuring the body', '', [['Numbers', 'temperature, blood pressure, pulse'], ['Senses', 'eyesight, hearing']]],
    ['Advice and rules', '', [['Giving advice', 'should, shouldn\'t, advice'], ['Strong rules', 'must, mustn\'t, have to, don\'t have to, rule']]]
  ]);
})();
