// ============================================================
//  EXPERT MIND MAPS (branches inside branches, 22 Oct 2026) - the ready-made topic maps of mindmaps.js and the Extra practice topics
//  window.DEEPMAPS[<map id of mindmaps.js>] = mmTree([ [branch name, 'own words (or empty)', [ [sub-branch, 'words', [ [sub-sub-branch, 'words'], ... ]], ... ]], ... ])
//  A node is [name, 'word, word', children]: words are separated by ", " (so a word never contains a comma), the words and the children are both optional.
//  Rules (the pupils' game relies on them): a word appears ONCE in the whole map and is never the same as the name of a group; a word belongs to the smallest group it is written in.
//  Shown as the tile "Expert" of the map (Extra practice > Mind maps) and as "Mind map · Expert" in the Hard level of the Extra practice topic that has the same id (aliases in exercises/index.html).
//  The units of the coursebooks have their Expert maps in exercises/deepunits-<class id>.js (window.DEEPUNITS), written with the same helper.
// ============================================================
window.mmTree = window.mmTree || (arr => arr.map(a => ({ name: a[0], items: a[1] ? a[1].split(', ') : [], kids: a[2] ? window.mmTree(a[2]) : [] })));
window.DEEPMAPS = window.DEEPMAPS || {};
(() => {
  const T = window.mmTree, D = window.DEEPMAPS;

  D.family = T([
    ['Close family', '', [['Parents', 'mother, father, mum, dad'], ['Children', 'son, daughter, child, baby'], ['Brothers and sisters', 'brother, sister, twin, only child']]],
    ['Grandparents and grandchildren', '', [['Grandparents', 'grandmother, grandfather, grandma, grandpa'], ['Grandchildren', 'grandson, granddaughter, grandchild']]],
    ['Wider family', '', [['Uncles and aunts', 'uncle, aunt, great-aunt, great-uncle'], ['Cousins and their children', 'cousin, nephew, niece']]],
    ['By marriage', '', [['Husband and wife', 'husband, wife, in-laws'], ['Step and half', 'stepmother, stepfather, stepsister, half-brother']]],
    ['Describing people', '', [['Looks', 'tall, short, slim, young, old'], ['Character', '', [['Kind people', 'kind, friendly, generous'], ['Difficult', 'strict, shy, bossy']]]]]
  ]);

  D.weather = T([
    ['Good weather', '', [['Sun and heat', 'sunny, sunshine, hot, warm, heatwave'], ['Mild and clear', 'mild, clear sky, fine, pleasant']]],
    ['Rainy weather', '', [['Light rain', 'drizzle, shower, cloudy, damp'], ['Heavy rain', 'rain, downpour, flood, puddle']]],
    ['Wind and storms', '', [['Wind', 'windy, breeze, gale'], ['Storms', '', [['Storm clouds', 'thunder, lightning, thunderstorm'], ['Big storms', 'storm, hurricane, tornado']]]]],
    ['Cold weather', '', [['Cold air', 'cold, chilly, freezing, frost, ice'], ['Snowy weather', 'snow, snowy, snowflake, blizzard, snowman']]],
    ['Seasons', '', [['Warm seasons', 'spring, summer'], ['Cool seasons', 'autumn, winter']]],
    ['Measuring the weather', '', [['Instruments', 'thermometer, weather forecast'], ['Numbers', 'temperature, degrees, humidity']]]
  ]);

  D.food = T([
    ['Fruit and vegetables', '', [
      ['Fruit', '', [['Tree fruit', 'apple, pear, peach, plum'], ['Other fruit', 'banana, orange, lemon, strawberry']]],
      ['Vegetables', '', [['Roots', 'carrot, onion, potato'], ['Green vegetables', 'cabbage, lettuce, spinach, cucumber']]]]],
    ['Meat, fish and eggs', '', [['Meat', 'beef, pork, lamb, chicken, sausage, ham'], ['Fish', 'salmon, tuna, trout'], ['Eggs', 'egg, omelette']]],
    ['Bread, rice and pasta', '', [['Bread and cakes', 'bread, roll, cake, biscuit, pancake'], ['Rice and pasta', 'rice, pasta, spaghetti, noodles']]],
    ['Dairy', 'milk, butter, cheese, yoghurt, cream'],
    ['Sweet things', '', [['Sweet snacks', 'chocolate, sweets, ice cream, jam'], ['Sweet extras', 'honey, sugar']]],
    ['Drinks', '', [['Cold drinks', 'water, juice, lemonade, cola'], ['Hot drinks', 'tea, coffee, hot chocolate']]],
    ['Meals', '', [['Meals of the day', 'breakfast, lunch, dinner, snack'], ['Courses', 'starter, main course, dessert']]]
  ]);

  D.school = T([
    ['Subjects', '', [['Sciences', 'Biology, Chemistry, Physics, ICT'], ['Languages', 'Slovenian, German'], ['Practical subjects', 'Technology, Home economics']]],
    ['Equipment', '', [['Maths tools', 'protractor, compass, calculator'], ['Writing tools', 'highlighter, glue stick, sharpener, pencil sharpener'], ['Office tools', 'stapler']]],
    ['School places', '', [['Learning places', 'library, gym, assembly hall'], ['Other places', 'playground, staff room, locker, corridor, cloakroom']]],
    ['School staff', '', [['Teachers', 'headteacher, form teacher, supply teacher, tutor'], ['Other staff', 'librarian, secretary, janitor'], ['Pupils in charge', 'prefect']]],
    ['School life', '', [['Tests and papers', 'exam, report, certificate, register'], ['Rules and time', 'detention, uniform, term, semester']]],
    ['Study skills', '', [['In class', '', [['Listening and writing', 'attend, take notes'], ['Working', 'concentrate, hand in']]], ['At home', 'revise, memorise, look up, practise']]]
  ]);

  D.home = T([
    ['Rooms and spaces', '', [['Living rooms', 'study, conservatory, loft'], ['Practical rooms', 'utility room, pantry, cellar'], ['Between rooms', 'landing, porch']]],
    ['Furniture', '', [['Storage', 'cupboard, bookcase, chest of drawers'], ['Seats and tables', 'stool, bench, coffee table'], ['Beds and desks', 'bunk bed, desk']]],
    ['Appliances', '', [['Cooking', 'cooker, microwave, toaster, kettle'], ['Cold', 'fridge, freezer'], ['Washing', 'dishwasher, washing machine']]],
    ['Decoration', '', [['Soft things', 'carpet, curtains, cushion, rug'], ['Wall things', 'wallpaper, mirror, poster'], ['Light', 'lamp']]],
    ['Types of home', '', [['Houses', 'detached house, semi-detached house, cottage, farmhouse, villa, bungalow'], ['Flats', 'flat, block of flats']]],
    ['Around the home', '', [['Parts of the building', 'fireplace, chimney, staircase, doorbell, letterbox'], ['Outside', 'driveway, shed, hedge']]]
  ]);

  D.hobbies = T([
    ['Team sports', '', [['Ball games', 'volleyball, handball, hockey, baseball, cricket'], ['Other team sports', 'rugby, water polo, rowing']]],
    ['Individual sports', '', [['Indoor', 'gymnastics, judo, fencing'], ['Outdoor', 'athletics, archery, surfing, skateboarding, climbing']]],
    ['Music', '', [['Instruments', 'trumpet, flute, saxophone'], ['Groups', 'band, choir, orchestra'], ['Song words', 'lyrics, melody']]],
    ['Creative hobbies', '', [['Art', 'painting, pottery, photography, calligraphy'], ['Crafts', 'knitting, origami, sewing, woodwork']]],
    ['Collecting and games', '', [['Collecting', 'stamps, coins, trading cards'], ['Games', 'board games, chess, puzzles, cards, video games']]],
    ['Out and about', '', [['Culture', 'gallery, theatre, exhibition, festival'], ['Fun places', 'fair, zoo, funfair, aquarium']]]
  ]);

  D.clothes = T([
    ['Formal clothes', '', [['Suit and shirt', 'suit, blazer, waistcoat, formal shirt'], ['Extras', 'tie, bow tie, cufflinks'], ['Dresses', 'evening dress']]],
    ['Sportswear', '', [['For the pool', 'swimsuit, swimming trunks'], ['For training', 'tracksuit, jersey, hoodie, sweatband, sports bra'], ['Protection', 'shin pads']]],
    ['Accessories', '', [['Jewellery', 'necklace, bracelet, earrings, watch'], ['Bags and belts', 'handbag, backpack, purse, belt']]],
    ['Footwear', '', [['Smart shoes', 'high heels, loafers, moccasins'], ['Boots', 'wellies, ankle boots'], ['Casual shoes', 'flip-flops, sneakers, clogs']]],
    ['Patterns and materials', '', [['Patterns', 'spotted, checked, plain'], ['Materials', 'cotton, wool, leather, silk, denim']]],
    ['Fit and style', '', [['Smart style', 'smart, elegant, trendy, matching'], ['Relaxed', 'casual, comfy, baggy, scruffy']]]
  ]);

  D.travel = T([
    ['By road', '', [['Roads', 'motorway, junction, roundabout, traffic jam'], ['People and places', 'pedestrian, pavement, zebra crossing, petrol station']]],
    ['At the airport', '', [['Before the flight', 'check-in, security, customs, boarding card'], ['The flight', 'departure, arrival, gate, runway']]],
    ['By rail and sea', '', [['Rail', 'platform, carriage, ticket office, waiting room'], ['Sea', 'ferry, cabin, deck, lifeboat']]],
    ['Accommodation', '', [['Rooms', 'single room, double room, reception'], ['Places to stay', 'hostel, resort, campsite'], ['Meals', 'full board, bed and breakfast']]],
    ['Kinds of holiday', '', [['Active', 'backpacking, road trip, excursion, sightseeing'], ['Relaxing', 'cruise, package holiday, city break, abroad']]],
    ['Problems', '', [['Travel problems', 'delayed, cancelled, missed connection, overbooked'], ['Personal problems', 'lost luggage, jet lag, sunburn, queue']]]
  ]);

  D.body = T([
    ['Head and face', '', [['Eyes', 'eyebrow, eyelash'], ['Face parts', 'forehead, cheek, chin, jaw'], ['Mouth', 'lip, tongue']]],
    ['Arms and legs', '', [['Arm', 'elbow, wrist, thumb'], ['Leg', 'thigh, shin, calf, ankle, heel']]],
    ['Inside the body', '', [['Organs', 'heart, lungs, brain, kidney'], ['Body material', 'muscle, bone, skin, blood']]],
    ['Illnesses', '', [['Infections', 'flu, infection, asthma'], ['Injuries', 'sprain, bruise, fracture'], ['Skin and allergies', 'allergy, rash']]],
    ['Treatment', '', [['Medical help', 'prescription, injection, operation, ambulance'], ['Places and tools', 'pharmacy, bandage, thermometer, x-ray']]],
    ['Healthy living', '', [['Eating and moving', 'diet, exercise, balanced meal, fresh air'], ['Rest and care', 'sleep, check-up, hygiene, relaxation']]]
  ]);

  D.jobs = T([
    ['Health and care', '', [['Doctors', 'surgeon, paramedic, midwife'], ['Therapists', 'physiotherapist, psychologist, dietician'], ['Helpers', 'optician, nursing assistant']]],
    ['Science and technology', '', [['Science', 'scientist, chemist, researcher, astronaut'], ['Technology', 'programmer, architect, mechanic, pilot']]],
    ['Law and business', '', [['Law and money', 'judge, lawyer, banker, accountant'], ['Office and sales', 'manager, salesperson, receptionist, secretary']]],
    ['Arts and media', '', [['On stage', 'actor, singer, musician'], ['Creating', 'photographer, designer, painter'], ['Media', 'interpreter, presenter']]],
    ['Outdoor jobs', '', [['Land', 'farmer, gardener, forester, miner'], ['Water', 'fisherman, lifeguard'], ['Building', 'builder, plumber']]],
    ['Services', '', [['Food', 'chef, waiter'], ['Shops and cleaning', 'cashier, cleaner, hairdresser'], ['Helping people', 'firefighter, tour guide, flight attendant']]]
  ]);

  D.feelings = T([
    ['Very happy', '', [['Joy', 'delighted, thrilled, overjoyed, ecstatic'], ['Calm happiness', 'cheerful, content, grateful, relieved']]],
    ['Sad or disappointed', '', [['Sad', 'miserable, gloomy, heartbroken, depressed'], ['Let down', 'disappointed, discouraged, hopeless, homesick']]],
    ['Angry', '', [['Very angry', 'furious, outraged, bitter, resentful'], ['A little angry', 'annoyed, irritated, impatient, jealous']]],
    ['Afraid and worried', '', [['Afraid', 'terrified, frightened, panicky'], ['Worried', 'anxious, uneasy, stressed, tense, insecure']]],
    ['Embarrassed', '', [['Shame', 'ashamed, guilty, humiliated, regretful, sorry'], ['Uncomfortable', 'awkward, shy, self-conscious']]],
    ['Mixed feelings', '', [['Interested', 'curious, amazed, shocked, determined'], ['Not excited', 'bored, indifferent'], ['Unsure', 'confused, hesitant']]]
  ]);

  D.countries = T([
    ['Western Europe', '', [['West', 'France, Spain, Portugal, Ireland'], ['Centre', 'Belgium, Netherlands, Switzerland, Luxembourg']]],
    ['Eastern Europe and the Balkans', '', [['East', 'Poland, Czech Republic, Ukraine, Romania, Bulgaria'], ['Balkans', 'Serbia, Bosnia, Montenegro']]],
    ['Capital cities', '', [['Western capitals', 'Madrid, Lisbon, Dublin, Berlin'], ['Eastern and southern capitals', 'Prague, Warsaw, Athens, Budapest']]],
    ['Languages', '', [['Germanic', 'German, Dutch'], ['Romance', 'Spanish, Italian, Portuguese'], ['Slavic and others', 'Polish, Croatian, Greek']]],
    ['Geography words', '', [['Land', 'border, peninsula, island, desert, valley'], ['People and place', 'capital, population, coast']]],
    ['Famous places', '', [['Buildings and towers', 'Eiffel Tower, Big Ben, Colosseum'], ['Nature', 'Alps, Danube, Sahara, Mount Everest, Triglav']]]
  ]);

  D.pastsimple = T([
    ['Spelling of -ed', '', [['Add -ed', 'worked, enjoyed'], ['Add -d', 'danced'], ['Double the consonant', 'stopped, planned, travelled'], ['Change y to -ied', 'carried, tried']]],
    ['Irregular verbs', '', [['Vowel change i - a', 'began, drank, rang, sang'], ['Ends in -ew', 'flew, grew, knew'], ['Other changes', 'broke, chose, drove, fell, forgot, gave, hid, lost, met, paid, ran, slept, spoke, wore'], ['Special forms', 'brought, built, taught']]],
    ['Questions and negatives', '', [['Questions', 'Did she …?, Who did you …?, How did it …?, Why did they …?, What did you do?, Where did she live?'], ['Negatives', 'They didn\'t …, He didn\'t go']]],
    ['Time expressions', '', [['Days and times', 'yesterday evening, last Monday, on Sunday, at the weekend'], ['Long ago', 'two weeks ago, in 1999, a long time ago, the day before']]]
  ]);

  D.presentperfect = T([
    ['Forms and answers', '', [['Positive', 'I\'ve finished, We\'ve been …'], ['Negative', 'she hasn\'t come, they haven\'t started'], ['Questions', 'Have you ever …?, Has he …?'], ['Short answers', 'Yes I have, No he hasn\'t']]],
    ['Regular participles', '', [['Ends in -ed', 'finished, visited, worked, played, watched, started, opened'], ['Change y to -ied', 'studied']]],
    ['Irregular participles', '', [['Ends in -n', 'begun, broken, chosen, driven, flown, forgotten, given'], ['Other forms', 'brought, built, taught']]],
    ['Time words', '', [['Time up to now', 'since, for, up to now, so far'], ['Recent time', 'recently, lately, today, this week']]],
    ['Past simple or present perfect?', '', [['Past simple signals', 'yesterday, in 2020, last week'], ['Present perfect signals', 'ever, already, just, never, not yet']]],
    ['Uses', '', [['Now', 'experience, recent news, result now'], ['Time', 'unfinished period, how long, change over time'], ['Other uses', 'repeated action, life achievements']]]
  ]);

  D.comparing = T([
    ['Spelling', '', [['Add -r or -er', 'nicer, larger, simpler'], ['Double the letter', 'thinner, hotter'], ['Change y to -ier', 'happier, easier, busier']]],
    ['Than and as', '', [['Than', 'taller than, more than, less than, much bigger, a bit smaller'], ['As', 'as tall as, not as old as, twice as big']]],
    ['Superlatives', '', [['With -est', 'the earliest, the happiest, the funniest, the richest'], ['With most or least', 'the most famous, the least expensive, the most dangerous, the furthest']]],
    ['Irregular forms', '', [['Good and bad', 'good - better - best, bad - worse - worst'], ['Quantity words', 'little - less - least, much - more - most, many - more - most'], ['Distance and age', 'far - further - furthest, old - older - oldest, late - later - latest']]],
    ['Quantity', '', [['Countable', 'more people, fewer cars, the fewest mistakes, as many as, far too many'], ['Uncountable', 'less water, the most money, not so much']]],
    ['Opposites', '', [['Easier and safer', 'easier / harder, safer / more dangerous, cheaper / more expensive'], ['Others', 'faster / slower, louder / quieter, lighter / heavier, wider / narrower, stronger / weaker']]]
  ]);

  D.modals = T([
    ['Ability', '', [['Can and could', 'couldn\'t, was able to, be able to'], ['Skills', 'manage to, know how to, was good at, succeed in, be capable of']]],
    ['Obligation', '', [['Strong', 'must, have to, had to, it is necessary'], ['Softer', 'need to, be supposed to, be required to, I am obliged to']]],
    ['Prohibition and no need', '', [['Not allowed', 'mustn\'t, can\'t, not allowed to, forbidden'], ['No need', 'don\'t have to, needn\'t, no need to, not necessary']]],
    ['Advice', '', [['Short advice', 'should, shouldn\'t, ought to, had better'], ['Longer advice', 'if I were you, why don\'t you, it\'s a good idea, I would recommend']]],
    ['Possibility', '', [['Modal verbs', 'may, might, could'], ['Other words', 'perhaps, probably, it\'s possible, there\'s a chance, maybe']]],
    ['Requests and offers', '', [['Requests', 'Can I …?, Could you …?, Would you …?, May I …?'], ['Offers', 'Shall I …?, Would you like …?, Let me …, How about …?']]]
  ]);

  D.animals = T([
    ['Mammals', '', [['Wild mammals', 'bear, wolf, fox, deer, kangaroo'], ['Small mammals', 'bat, squirrel, hedgehog']]],
    ['Reptiles and amphibians', '', [['Reptiles', 'crocodile, lizard, snake, turtle, tortoise, chameleon'], ['Amphibians', 'frog, toad']]],
    ['Birds', '', [['Flying birds', 'sparrow, seagull, swallow, pigeon, woodpecker'], ['Showy or big birds', 'peacock, ostrich, flamingo']]],
    ['Insects and bugs', '', [['Flying', 'wasp, moth, dragonfly'], ['Crawling and jumping', 'grasshopper, cricket, spider, flea, cockroach']]],
    ['Sea life', '', [['Shellfish', 'crab, lobster'], ['Sea animals', 'octopus, seahorse, starfish, stingray'], ['Sea mammals', 'seal, walrus']]],
    ['Parts of animals', '', [['Body covering', 'fur, feather'], ['Limbs', 'paw, claw, hoof, wing, tail'], ['Mouth', 'beak']]]
  ]);

  D.sport = T([
    ['Football words', '', [['Positions', 'goalkeeper, striker, substitute'], ['Actions and rules', 'penalty, offside, corner, header, tackle']]],
    ['Basketball and handball', '', [['Shots', 'free throw, slam dunk, jump shot'], ['Moves', 'dribble, rebound, pivot, fast break'], ['Rules', 'timeout']]],
    ['Winter sports', '', [['On snow', 'slalom, ski jump, cross-country, biathlon'], ['On ice', 'ice hockey, bobsleigh, figure skating, curling']]],
    ['Athletics', '', [['Running', 'sprint, relay, hurdles'], ['Throwing', 'javelin, discus, shot put'], ['Jumping and combined', 'pole vault, decathlon']]],
    ['Competitions', '', [['Matches', 'tournament, league, final, qualifier'], ['Prizes', 'championship, medal, trophy, record']]],
    ['Sport verbs', '', [['Results', 'win, lose, draw, beat, score'], ['Doing sport', 'train, compete, cheer']]]
  ]);

  D.town = T([
    ['Public buildings', '', [['Government', 'town hall, city council, embassy, court'], ['Safety', 'police station, fire station, prison'], ['Post', 'post office']]],
    ['Shops and services', '', [['Food shops', 'bakery, butcher, greengrocer'], ['Other shops', 'florist, chemist'], ['Services', 'hairdresser, laundry, dry cleaner']]],
    ['Streets and traffic', '', [['Crossing', 'pavement, zebra crossing, underpass, crossroads'], ['Roads', 'roundabout, one-way street, bypass, traffic jam']]],
    ['Places to visit', '', [['Old and religious', 'castle, cathedral, monument'], ['Squares and markets', 'fountain, market, square, harbour, gallery']]],
    ['Giving directions', '', [['Where', 'at the corner, across the street, on the left, behind, in front of'], ['Telling the way', 'take the second turning, keep going, you can\'t miss it']]],
    ['City life', '', [['Buildings and areas', 'skyscraper, suburb, neighbourhood'], ['People and problems', 'population, commuter, rush hour, pollution, crowded']]]
  ]);

  D.tech = T([
    ['Hardware', '', [['Inside', 'processor, hard drive, motherboard'], ['Connecting', 'router, USB stick, memory card'], ['Sound and picture', 'webcam, speaker']]],
    ['Software and apps', '', [['Programs', 'software, program, browser, operating system, antivirus'], ['Apps and games', 'game, update, install']]],
    ['Online life', '', [['Sharing', 'blog, podcast, post, comment'], ['People', 'profile, follower, hashtag'], ['Watching', 'streaming']]],
    ['Safety and privacy', '', [['Dangers', 'hacker, virus, cyberbullying, scam, spam'], ['Protection', 'privacy, firewall, login']]],
    ['Computer actions', '', [['Using', 'scroll, log in, log out, shut down'], ['Files', 'copy, paste, save, back up']]],
    ['Future technology', '', [['Machines', 'robot, drone, self-driving car, 3D printer'], ['Ideas', 'artificial intelligence, virtual reality, wearable, solar panel']]]
  ]);

  D.environment = T([
    ['Energy', '', [['Renewable sources', 'solar power, wind farm, renewable'], ['Not renewable', 'fossil fuel, coal, oil, nuclear'], ['Power supply', 'electricity']]],
    ['Pollution', '', [['In the air', 'exhaust fumes, smog, acid rain, greenhouse gas'], ['On land and water', 'oil spill, waste, toxic, contamination']]],
    ['Protecting nature', '', [['Places', 'habitat, rainforest, national park'], ['Living things', 'endangered, extinct, wildlife, species'], ['Action', 'conservation']]],
    ['Climate', '', [['Causes', 'carbon dioxide, ozone layer'], ['Effects', 'melting ice, sea level, drought, heatwave'], ['Big words', 'global warming, climate change']]],
    ['What we can do', '', [['The three Rs', 'recycle, reuse, reduce'], ['Other actions', 'compost, carpool, switch off, plant trees, volunteer']]],
    ['Everyday words', '', [['Rubbish', 'rubbish bin, bottle bank, plastic bag, packaging'], ['Saving', 'second-hand, refill, tap water, public transport']]]
  ]);

  D.celebrations = T([
    ['Weddings', '', [['Wedding people', 'bride, groom, best man, witness'], ['Events', 'ceremony, reception, honeymoon'], ['Wedding things', 'bouquet']]],
    ['Christmas traditions', '', [['Before Christmas', 'advent calendar, mistletoe, decorations'], ['On Christmas', 'gingerbread, nativity, midnight mass, wrapping paper, cracker']]],
    ['Festivals', '', [['Street events', 'parade, procession, float, street party'], ['Other festival things', 'costume, firework display, harvest festival, bonfire']]],
    ['Party words', '', [['People', 'host, guest'], ['Actions', 'invite, toast, celebrate'], ['Things', 'gift, surprise, congratulations']]],
    ['Public holidays', '', [['Days off', 'bank holiday, day off, national day'], ['Named days', 'Labour Day, Independence Day, All Saints\' Day, Saint Martin\'s Day, Statehood Day']]],
    ['Feelings at a party', '', [['Very happy', 'cheerful, excited, thrilled, delighted, joyful'], ['Kind and festive', 'grateful, generous, festive']]]
  ]);

  D.shopping = T([
    ['Kinds of shops', '', [['Small shops', 'greengrocer, newsagent, jeweller, optician, corner shop'], ['Big shops', 'shopping centre, department store, market stall']]],
    ['Money', '', [['Notes and coins', 'coins, notes, cash, currency'], ['Saving money', 'refund, discount, bargain, deposit']]],
    ['Paying', '', [['At the till', 'cashier, checkout, till, price tag'], ['Ways to pay', 'credit card, contactless, receipt, bill']]],
    ['Asking in a shop', '', [['Asking', 'How much is it?, Can I try it on?, Do you have a smaller size?, Is there a sale?'], ['Answering', 'I\'ll take it, It\'s too expensive, Can I pay by card?, I\'m just looking']]],
    ['Shopping online', '', [['Before buying', 'basket, website, review, voucher'], ['After buying', 'order, delivery, return, free shipping']]],
    ['Describing goods', '', [['Price', 'cheap, expensive, second-hand'], ['Quality', 'brand new, fashionable, good quality'], ['Availability', 'sold out, in stock']]]
  ]);

  D.routine = T([
    ['Getting up', '', [['Waking', 'wake up, oversleep, miss the bus'], ['Getting ready', 'get dressed, make the bed, wash my face, comb my hair, pack my bag']]],
    ['School and work', '', [['School', 'attend, hand in, take notes'], ['Work', 'commute, finish early, stay late, have a meeting, meet a deadline']]],
    ['Chores', '', [['Cleaning', 'vacuum, sweep, do the washing-up, take out the rubbish'], ['Clothes and plants', 'tidy up, hang out the washing, iron, water the plants']]],
    ['Free time', '', [['With friends', 'hang out, text, go for a walk'], ['On a screen', 'log on, scroll, binge-watch'], ['Active', 'work out, practise']]],
    ['Meals', '', [['Preparing', 'prepare, set the table, clear the table, wash the dishes'], ['Eating', 'have a snack, grab a bite, skip breakfast, order a takeaway']]],
    ['Winding down', '', [['Before bed', 'wind down, have a bath, read in bed, turn off the light, set the alarm'], ['Sleeping', 'fall asleep, get some sleep, lie awake']]]
  ]);

  D.colours = T([
    ['Reds and pinks', '', [['Strong reds', 'scarlet, crimson, maroon, burgundy'], ['Soft reds', 'rose, salmon, coral, magenta']]],
    ['Blues and greens', '', [['Blues', 'navy, turquoise, sky blue, aquamarine'], ['Greens', 'teal, emerald, olive, lime green']]],
    ['Yellows and browns', '', [['Yellows', 'gold, amber, mustard'], ['Browns', 'beige, tan, khaki, chocolate, caramel']]],
    ['Greys and neutrals', '', [['Light neutrals', 'silver, ivory, cream, pearl, snow white'], ['Dark neutrals', 'charcoal, slate, ash']]],
    ['Describing colours', '', [['Strong', 'bright, dark, vivid, shiny'], ['Weak', 'pale, light, faded, dull']]],
    ['Colours in sayings', '', [['Feelings', 'green with envy, feel blue, see red, in the pink'], ['Other sayings', 'red tape, black sheep, white lie, once in a blue moon']]]
  ]);

  D.transport = T([
    ['Road vehicles', '', [['Emergency', 'ambulance, fire engine, police car'], ['Big vehicles', 'tractor, caravan, minibus, double-decker, limousine']]],
    ['Rail', '', [['Trains', 'express train, steam engine, carriage'], ['Stations and tracks', 'platform, ticket office, signal, tunnel, level crossing']]],
    ['Air', '', [['Planes', 'jumbo jet, glider, airship'], ['At the airport', 'runway, control tower, cockpit, hangar, helipad']]],
    ['Water', '', [['Boats', 'cruise ship, lifeboat, tugboat, speedboat, rowing boat'], ['Port', 'harbour, lighthouse, dock']]],
    ['Road words', '', [['Roads', 'motorway, junction, roundabout, parking'], ['Rules and places', 'speed limit, zebra crossing, petrol station, traffic jam']]],
    ['People', '', [['Drivers', 'driver, pilot, captain, conductor'], ['Others', 'passenger, mechanic, cyclist, pedestrian']]]
  ]);

  D.calendar = T([
    ['Days and weeks', '', [['Days', 'Monday, Wednesday, Friday, Sunday'], ['Weeks', 'weekend, weekday, fortnight, bank holiday']]],
    ['Months and years', '', [['Months', 'January, March, May, July, September, November'], ['Years', 'leap year, calendar']]],
    ['Parts of the day', '', [['Light', 'dawn, morning, noon, afternoon'], ['Dark', 'evening, dusk, midnight, night']]],
    ['Time units', '', [['Short', 'second, minute, hour'], ['Long', 'day, week, month, year, century']]],
    ['Time expressions', '', [['Past', 'last month, two days ago, the day before, yesterday'], ['Future', 'next week, in a week, tomorrow'], ['Regular', 'every other day']]],
    ['Dates and clock', '', [['The clock', 'o\'clock, half past, quarter to, a.m., p.m.'], ['Dates', 'the first of May, the third of June, on Monday']]]
  ]);

  D.verbs = T([
    ['Same in all forms', '', [['Cut and put', 'cut, put, shut, let'], ['Hit and hurt', 'hit, cost, hurt, spread']]],
    ['-ought and -aught', '', [['With -ought', 'buy - bought, bring - brought, think - thought, fight - fought, seek - sought'], ['With -aught', 'teach - taught, catch - caught']]],
    ['i - a - u', '', [['Common ones', 'sing - sang - sung, drink - drank - drunk, swim - swam - swum, begin - began - begun'], ['More ones', 'ring - rang - rung, run - ran - run, sink - sank - sunk, spring - sprang - sprung']]],
    ['Add -n', '', [['Take type', 'take - took - taken, give - gave - given, eat - ate - eaten, see - saw - seen'], ['Write type', 'write - wrote - written, drive - drove - driven, break - broke - broken, speak - spoke - spoken']]],
    ['Ending in -t', '', [['Build type', 'build - built - built, send - sent - sent, spend - spent - spent, lend - lent - lent'], ['Feel type', 'feel - felt - felt, keep - kept - kept, sleep - slept - slept, leave - left - left']]],
    ['Odd ones', '', [['Be, go, do, have', 'be - was - been, go - went - gone, do - did - done, have - had - had'], ['Say, sell, tell, find', 'say - said - said, sell - sold - sold, tell - told - told, find - found - found']]]
  ]);

  D.football = T([
    ['Positions', '', [['Defence', 'centre-back, full-back, sweeper'], ['Midfield and attack', 'midfielder, winger, striker'], ['Others', 'goalkeeper, substitute']]],
    ['Rules and cards', '', [['Fouls and cards', 'offside, foul, yellow card, red card'], ['Restarts', 'penalty, free kick, throw-in, corner kick']]],
    ['Skills', '', [['Passing', 'pass, cross'], ['Shooting', 'shoot, volley, header'], ['Moving past', 'dribble, tackle, nutmeg']]],
    ['Match words', '', [['Time', 'kick-off, half-time, full-time, extra time, injury time'], ['Goals', 'penalty shoot-out, equaliser, own goal']]],
    ['Competitions', '', [['Leagues and cups', 'league, cup, tournament, group stage, knockout stage'], ['Moving up and down', 'promotion, relegation, transfer']]],
    ['Fans and places', '', [['Places', 'stadium, stand, pitch'], ['Supporters group', 'fans, supporters, scarf, chant, atmosphere']]]
  ]);

  D.basketball = T([
    ['Positions', '', [['Guards', 'point guard, shooting guard'], ['Forwards and centre', 'small forward, power forward, centre'], ['Others', 'substitute, captain, rookie']]],
    ['Shots', '', [['Close shots', 'layup, slam dunk, hook shot, alley-oop'], ['Longer shots', 'jump shot, three-pointer, free throw, buzzer-beater']]],
    ['Moves', '', [['With the ball', 'dribble, pivot, fast break, pick and roll'], ['Teamwork and defence', 'rebound, assist, steal, block']]],
    ['Rules', '', [['Fouls and mistakes', 'foul, technical foul, travelling, double dribble, turnover'], ['Time', 'shot clock, timeout, overtime']]],
    ['The court', '', [['Lines and areas', 'key, free-throw line, three-point line'], ['Equipment', 'backboard, rim, scoreboard, bench, court-side']]],
    ['Competitions', '', [['The season', 'league, season, playoffs, finals'], ['Special events', 'championship, draft, all-star game, trophy']]]
  ]);

  D.handball = T([
    ['Positions', '', [['Wings', 'left wing, right wing'], ['Backs', 'left back, right back, centre back, playmaker'], ['Others', 'goalkeeper, pivot']]],
    ['Attack', '', [['Quick attack', 'fast break, counter-attack, breakthrough'], ['Shots and passes', 'shot, jump shot, pass, feint, tactics']]],
    ['Defence', '', [['Ways to defend', 'man-to-man, zone defence, block, intercept'], ['Defender actions', 'tackle, passive play, steal, defender']]],
    ['Rules', '', [['Penalties', 'foul, penalty, seven-metre throw, two-minute suspension, red card, warning'], ['Other rules', 'free throw, steps']]],
    ['Equipment and court', '', [['Equipment', 'ball, goal, resin, shoes'], ['Court', 'goal area, substitution zone, centre line, scoreboard']]],
    ['Competition', '', [['During a match', 'match, half-time, final whistle'], ['Over the year', 'league, tournament, championship, team, season, final']]]
  ]);

  D['football-wc'] = T([
    ['Winning countries', '', [['South American winners', 'Brazil, Argentina, Uruguay'], ['European winners', 'Germany, Italy, France, Spain, England']]],
    ['Host countries', '', [['In Europe and Asia', 'Russia, Qatar, Japan, South Korea, Sweden'], ['In Africa and the Americas', 'South Africa, Mexico, Chile']]],
    ['Legends', '', [['From South America', 'Pelé, Maradona, Messi, Ronaldo'], ['From Europe', 'Cruyff, Zidane, Beckenbauer, Platini']]],
    ['Stages', '', [['Group and knockout', 'group stage, round of 16, quarter-final, semi-final'], ['The end', 'final, third-place match, knockout, qualifier']]],
    ['Tournament words', '', [['Players and teams', 'top scorer, squad, underdog'], ['Moments', 'golden boot, upset, comeback, extra time, penalty shoot-out']]],
    ['Slovenia at the World Cup', '', [['People', 'Katanec, Koren'], ['Years', '2002, 2010'], ['Opponents', 'Algeria, the USA']]]
  ]);

  D['football-si'] = T([
    ['Clubs', '', [['Big clubs', 'Olimpija, Maribor, Celje, Koper'], ['Other clubs', 'Mura, Domžale, Bravo, Gorica']]],
    ['Stadiums', '', [['Capital and Štajerska', 'Stožice, Ljudski vrt, Arena Petrol'], ['Coast and Prekmurje', 'Bonifika, Fazanerija']]],
    ['The national side', '', [['People', 'captain, coach, goalkeeper, striker, squad'], ['Things', 'national team, anthem, kit']]],
    ['Tournaments', '', [['Big tournaments', 'Euro 2000, World Cup 2002, World Cup 2010, Euro 2024'], ['Stages', 'qualifier, group stage, round of 16, penalties']]],
    ['Football words', '', [['Competitions', 'league, cup, derby, season, champion'], ['Money and youth', 'transfer, academy, contract']]],
    ['Fans and atmosphere', '', [['Fans of the national team', 'fans, supporters, scarf, flag, ticket'], ['Feelings', 'atmosphere, pride, passion']]]
  ]);})();
