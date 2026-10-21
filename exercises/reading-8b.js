// ============================================================
//  READING TEXTS FOR THE PRINTED TESTS - Project 3 (class 8.b)          (written 21 Oct 2026)
//  window.READING[unit id] = [ { t: title, x: text, tf: [[statement, 'T' | 'F' | 'DS'], ...], q: [[question, answer], ...] }, ... ]
//  tf: True / False / Doesn't say (DS) statements about the text; q: short-answer questions (reading for specific information).
//  Two texts per unit (so that group A and group B of a test get different texts); the language follows the unit.
// ============================================================
window.READING = window.READING || {};
Object.assign(window.READING, {

p3u1: [
  { t: "Tom's busy Saturday",
    x: "Last Saturday Tom got up at seven o'clock because he had a football match at nine. His team played against a school from Celje. Tom's mum made sandwiches and his dad drove the boys to the stadium. They didn't win, but Tom scored one goal. After the match the team had pizza in a small restaurant. In the afternoon Tom went home and played computer games with his brother. In the evening he wrote a long message to his grandmother. He was very tired and went to bed early.",
    tf: [["Tom had a football match on Saturday morning.", "T"], ["Tom's team won the match.", "F"], ["Tom scored a goal.", "T"], ["The team ate pizza after the match.", "T"], ["Tom's brother played in the match.", "DS"], ["Tom's grandmother lives in Celje.", "DS"]],
    q: [["Why did Tom get up at seven?", "Because he had a football match at nine."], ["Who drove the boys to the stadium?", "Tom's dad."], ["What did Tom do in the evening?", "He wrote a (long) message to his grandmother."]] },
  { t: "A letter from Ana",
    x: "Dear Mia, last summer I visited my aunt in Italy. We travelled by train and the journey took six hours. My aunt lives in a small village near the sea. Every day we swam in the sea and ate ice cream. I didn't like the food in the restaurants because it was too spicy, but my aunt cooked wonderful pasta. One evening we watched fireworks in the village square. I didn't want to come home! Next year you can come with me. Love, Ana",
    tf: [["Ana travelled to Italy by train.", "T"], ["The journey took eight hours.", "F"], ["Ana's aunt lives in a big city.", "F"], ["Ana liked the food in the restaurants.", "F"], ["Ana saw fireworks in the village.", "T"], ["Mia has visited Italy before.", "DS"]],
    q: [["Where does Ana's aunt live?", "In a small village near the sea."], ["What did Ana and her aunt do every day?", "They swam in the sea and ate ice cream."], ["Why didn't Ana like the food in the restaurants?", "It was too spicy."]] }
],

p3u2: [
  { t: "Life in 2050",
    x: "What will life be like in 2050? Scientists think that many things will change. Cars won't have drivers: they will drive themselves. People will work at home more often, and many pupils will learn with robots. Doctors will use computers to find illnesses very quickly. However, some things will stay the same. We will still need water, food and friends. Scientists also say that holidays on the Moon will be possible, but they will cost a lot of money, so only a few people will go.",
    tf: [["Cars will drive themselves in 2050.", "T"], ["All pupils will learn with robots.", "F"], ["Doctors will find illnesses faster with computers.", "T"], ["We will not need water in 2050.", "F"], ["Holidays on the Moon will be cheap.", "F"], ["Everybody will have a robot at home.", "DS"]],
    q: [["What will people do at home more often?", "Work."], ["What will doctors use computers for?", "To find illnesses very quickly."], ["Why will only a few people go to the Moon?", "Because it will cost a lot of money."]] },
  { t: "Sara's plans",
    x: "Sara is fourteen and she has big plans. This summer she is going to visit her cousin in Ljubljana for two weeks. They are going to see a concert and go to the swimming pool every day. In September Sara is going to join the school choir because she loves singing. After school she wants to be a vet, so she is going to study biology. Her parents think it's a good idea. Tomorrow Sara is going to buy a new notebook for school, but she isn't going to buy a new bag because her old one is still fine.",
    tf: [["Sara is going to stay in Ljubljana for two weeks.", "T"], ["Her cousin lives in Maribor.", "F"], ["Sara is going to join the school choir.", "T"], ["Sara wants to be a teacher.", "F"], ["Her parents don't like her plans.", "F"], ["Sara has got a dog.", "DS"]],
    q: [["What are Sara and her cousin going to do?", "See a concert and go to the swimming pool."], ["Why is Sara going to join the choir?", "Because she loves singing."], ["What is she going to buy tomorrow?", "A new notebook."]] }
],

p3u3: [
  { t: "The day Pompeii disappeared",
    x: "In the year 79 the people of Pompeii were living a normal life. Women were shopping in the market, children were playing in the streets and men were working in their shops. Nobody was thinking about danger. Suddenly a big noise came from Mount Vesuvius, the volcano near the city. A huge cloud of ash went into the sky. While people were running away, ash was falling on the houses. Many people escaped by boat, but about two thousand people stayed in the city. Today tourists visit Pompeii and walk through the old streets.",
    tf: [["Pompeii was near a volcano.", "T"], ["Pompeii was destroyed in the year 1979.", "F"], ["Before the eruption children were playing in the streets.", "T"], ["Everybody left the city by boat.", "F"], ["The volcano is called Vesuvius.", "T"], ["The eruption happened at night.", "DS"]],
    q: [["What were the women doing before the eruption?", "They were shopping in the market."], ["What was falling on the houses?", "Ash."], ["Who visits Pompeii today?", "Tourists."]] },
  { t: "A strange evening",
    x: "Last Friday evening I was doing my homework when the lights went out. At first I thought it was a joke, but the whole street was dark. My sister was watching TV in the living room and she screamed. My dad was cooking dinner and he laughed. We found candles in the kitchen and had dinner by candlelight. While we were eating, we heard a strange noise outside. It was only the neighbours' cat! After an hour the lights came back on. It was the best evening of the week.",
    tf: [["The writer was doing homework when the lights went out.", "T"], ["Only the writer's house was dark.", "F"], ["The writer's sister was cooking.", "F"], ["The family had dinner by candlelight.", "T"], ["The noise outside was a cat.", "T"], ["The neighbours' cat is black.", "DS"]],
    q: [["What was the writer's dad doing?", "Cooking dinner."], ["What did they find in the kitchen?", "Candles."], ["How long were the lights off?", "An hour."]] }
],

p3u4: [
  { t: "A day in London",
    x: "London is the capital of England and about nine million people live there. The River Thames goes through the city. Tourists often start their day at Buckingham Palace, where the King lives. You can watch the Changing of the Guard at eleven o'clock. Then you can walk to Big Ben, which is the name of the bell in the famous clock tower. In the afternoon many visitors take a ride on the London Eye, a giant wheel next to the river. The best way to travel in London is the Underground, which people call the Tube. Don't forget an umbrella: it often rains!",
    tf: [["London is the capital of England.", "T"], ["The River Thames goes through London.", "T"], ["The Changing of the Guard is at ten o'clock.", "F"], ["Big Ben is the name of a bell.", "T"], ["The London Eye is a giant wheel.", "T"], ["The Tube is more expensive than a taxi.", "DS"]],
    q: [["Where can tourists watch the Changing of the Guard?", "At Buckingham Palace."], ["What do people call the Underground?", "The Tube."], ["Why should you take an umbrella?", "Because it often rains."]] },
  { t: "Asking the way",
    x: "Emma is a tourist in London. She wants to go to a museum, but she is lost. She asks a woman in the street: \"Excuse me, how do I get to the museum?\" The woman says: \"Go straight on and turn left at the traffic lights. Then take the second road on the right. The museum is opposite a small park.\" Emma thanks her and walks for ten minutes. She finds the museum, but there is a very long queue. She decides to have a sandwich in the café next to the park and to come back later.",
    tf: [["Emma wants to visit a museum.", "T"], ["The woman tells Emma to turn right at the traffic lights.", "F"], ["The museum is opposite a small park.", "T"], ["Emma walks for twenty minutes.", "F"], ["There is a long queue at the museum.", "T"], ["Emma is travelling with her friend.", "DS"]],
    q: [["What does Emma ask the woman?", "How to get to the museum."], ["Where is the museum?", "Opposite a small park."], ["What does Emma decide to do?", "To have a sandwich in the café and come back later."]] }
],

p3u5: [
  { t: "Jack's experiences",
    x: "Jack is fifteen and he has done many exciting things. He has been to five countries, including Spain and Austria. He has never been to America, but he wants to go next year. Last winter he learned to snowboard and he has broken his arm only once. Jack has also tried many different foods: he has eaten sushi and snails, but he has never eaten insects. His favourite experience was a trip to a farm in Austria, where he milked a cow.",
    tf: [["Jack has been to five countries.", "T"], ["Jack has been to America.", "F"], ["Jack has eaten snails.", "T"], ["Jack has eaten insects.", "F"], ["Jack broke his arm while snowboarding.", "DS"], ["Jack's favourite trip was to a farm in Austria.", "T"]],
    q: [["Where does Jack want to go next year?", "To America."], ["What did Jack learn last winter?", "To snowboard."], ["What did Jack do on the farm?", "He milked a cow."]] },
  { t: "Lucy's first flight",
    x: "Lucy has never flown before, but tomorrow she is going to fly to London with her class. She has just packed her suitcase and she has already checked the weather: it will be cloudy but warm. Lucy is a little nervous because she hasn't been to an airport yet. Her teacher has told the pupils to arrive two hours before the flight. Lucy's brother has flown many times and he has given her some advice: \"Drink water, listen to the pilot and don't be afraid!\"",
    tf: [["Lucy has flown before.", "F"], ["Lucy is flying to London tomorrow.", "T"], ["Lucy has packed her suitcase.", "T"], ["The pupils must arrive one hour before the flight.", "F"], ["Lucy's brother has flown many times.", "T"], ["Lucy's parents are going with her.", "DS"]],
    q: [["Why is Lucy nervous?", "She hasn't been to an airport yet."], ["What will the weather be like?", "Cloudy but warm."], ["What advice has her brother given her?", "Drink water, listen to the pilot and don't be afraid."]] }
],

p3u6: [
  { t: "Dear Doctor",
    x: "Dear Dr Kim, I have a problem. I go to bed very late because I play computer games until midnight. In the morning I am always tired and I have a headache. At school I can't concentrate and my marks are getting worse. My mum says I must go to bed earlier, but it's difficult. What should I do? Max. - Dear Max, you shouldn't play games late at night. You should stop at eight o'clock and read a book or listen to music. You should also drink more water and eat a healthy breakfast. If you don't feel better in two weeks, you should see a doctor. Dr Kim",
    tf: [["Max goes to bed late.", "T"], ["Max plays games until ten o'clock.", "F"], ["Max's marks are getting better.", "F"], ["Dr Kim says Max should stop playing games at eight o'clock.", "T"], ["Max's mum is a doctor.", "DS"], ["Max should see a doctor immediately.", "F"]],
    q: [["Why is Max tired in the morning?", "He goes to bed late."], ["What should Max do instead of playing games?", "Read a book or listen to music."], ["When should he see a doctor?", "If he doesn't feel better in two weeks."]] },
  { t: "School rules",
    x: "At Green Hill School there are some important rules. Pupils must wear indoor shoes in the building and they mustn't run in the corridors. You mustn't use your mobile phone during lessons, but you can use it at break. Pupils don't have to wear a uniform, but they have to wear sports clothes in PE. If you are ill, you must bring a note from your parents. Pupils who help in the library don't have to do extra homework: that's a reward! The headteacher says: \"Rules help us to feel safe.\"",
    tf: [["Pupils must wear indoor shoes.", "T"], ["Pupils may run in the corridors.", "F"], ["Pupils can use their phones at break.", "T"], ["Pupils have to wear a uniform.", "F"], ["Pupils must wear sports clothes in PE.", "T"], ["The school has got a swimming pool.", "DS"]],
    q: [["What must you bring when you are ill?", "A note from your parents."], ["Who doesn't have to do extra homework?", "Pupils who help in the library."], ["What does the headteacher say about rules?", "They help us to feel safe."]] }
]

});
