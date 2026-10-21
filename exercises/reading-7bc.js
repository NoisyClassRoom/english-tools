// ============================================================
//  READING TEXTS FOR THE PRINTED TESTS - Project 2 (classes 7.b / 7.c)          (written 21 Oct 2026; same format as reading-8b.js)
//  window.READING[unit id] = [ { t: title, x: text, tf: [[statement, 'T' | 'F' | 'DS'], ...], q: [[question, answer], ...] }, ... ]
//  Two texts per unit (A1 - A2).
// ============================================================
window.READING = window.READING || {};
Object.assign(window.READING, {

p2u1: [
  { t: "A busy girl",
    x: "Nina is thirteen and she has a very busy week. She always gets up at half past six and she usually walks to school with her friend Eva. After school she often goes to music lessons: she plays the violin. On Tuesdays and Thursdays she plays basketball. She never watches TV on school days because she has a lot of homework. At the weekend she sometimes helps her dad in the garden. Her birthday is on the twelfth of May, and every year she has a small party at home.",
    tf: [["Nina always gets up at half past six.", "T"], ["Nina walks to school alone.", "F"], ["Nina plays the violin.", "T"], ["Nina plays basketball on Mondays.", "F"], ["Nina watches TV on school days.", "F"], ["Nina has got a brother.", "DS"]],
    q: [["Who does Nina walk to school with?", "Her friend Eva."], ["When does she play basketball?", "On Tuesdays and Thursdays."], ["When is her birthday?", "On the twelfth of May."]] },
  { t: "Housework",
    x: "In the Kranjc family everybody helps at home. Mum cooks every day, but Dad washes the dishes. Luka, who is fourteen, takes out the rubbish on Mondays and Fridays. His little sister Mia sets the table and feeds the cat. The children rarely tidy their rooms without being asked! On Saturdays the whole family cleans the house together and then they have pizza. Luka says: \"I hardly ever like housework, but pizza is great.\"",
    tf: [["Dad washes the dishes.", "T"], ["Mia is older than Luka.", "F"], ["Luka takes out the rubbish twice a week.", "T"], ["The children often tidy their rooms without being asked.", "F"], ["The family has pizza after cleaning on Saturdays.", "T"], ["Mum works in a bank.", "DS"]],
    q: [["Who feeds the cat?", "Mia."], ["When does the family clean the house?", "On Saturdays."], ["What does Luka think about housework?", "He hardly ever likes it."]] }
],

p2u2: [
  { t: "Penguins",
    x: "Penguins are birds, but they can't fly. They live in the cold south of the Earth, in Antarctica. They are excellent swimmers and they eat fish and small sea animals. Emperor penguins are the biggest penguins. The female lays one egg and the father keeps it warm on his feet for about two months. Meanwhile the mother goes to the sea to find food. When the baby comes out of the egg, both parents look after it.",
    tf: [["Penguins can't fly.", "T"], ["Penguins live in the Arctic.", "F"], ["Penguins eat fish.", "T"], ["Emperor penguins are the smallest penguins.", "F"], ["The father keeps the egg warm.", "T"], ["Penguins live for thirty years.", "DS"]],
    q: [["Where do penguins live?", "In Antarctica."], ["What do they eat?", "Fish and small sea animals."], ["How long does the father keep the egg warm?", "For about two months."]] },
  { t: "My dog Rex",
    x: "My dog Rex is a big brown dog. He is three years old. He loves playing in the park and swimming in the river. Rex is a very clever animal: he can open the door and bring me my slippers. He is afraid of thunder, so when there is a storm he hides under my bed. Rex doesn't like cats, but he is friendly with other dogs. My grandmother says dogs are better than cats, but my sister disagrees because she has a cat.",
    tf: [["Rex is three years old.", "T"], ["Rex is a black dog.", "F"], ["Rex can open the door.", "T"], ["Rex is afraid of thunder.", "T"], ["Rex likes cats.", "F"], ["Rex sleeps in the kitchen.", "DS"]],
    q: [["Where does Rex hide in a storm?", "Under the writer's bed."], ["What can Rex bring the writer?", "Slippers."], ["Why does the sister disagree with the grandmother?", "Because she has a cat."]] }
],

p2u3: [
  { t: "Last summer",
    x: "Last summer my family went to Croatia. We travelled by car and the journey took five hours. We stayed in a small hotel near the beach. Every morning we swam in the sea and every afternoon we visited a different village. One day we went on a boat trip and saw dolphins! My brother got sunburn because he didn't use sun cream. We bought souvenirs for our grandparents and ate a lot of ice cream. It was the best holiday ever.",
    tf: [["The family travelled by plane.", "F"], ["The journey took five hours.", "T"], ["They stayed in a hotel.", "T"], ["They saw dolphins.", "T"], ["The writer's brother got sunburn.", "T"], ["The weather was hot every day.", "DS"]],
    q: [["How did the family travel?", "By car."], ["What happened to the writer's brother?", "He got sunburn."], ["What did they buy for the grandparents?", "Souvenirs."]] },
  { t: "A lost suitcase",
    x: "Mr and Mrs Lopez arrived at the airport in Rome at six o'clock. They waited for their suitcases, but one suitcase didn't come. \"It's lost!\" said Mrs Lopez. An airport worker wrote down the details and promised to call the next day. The Lopez family went to the hotel without their clothes. They bought some T-shirts and toothbrushes in a shop. The next morning the airline called: \"We found your suitcase in Madrid!\" It arrived at the hotel in the evening.",
    tf: [["The Lopez family arrived in Rome.", "T"], ["They arrived at eight o'clock.", "F"], ["All their suitcases arrived.", "F"], ["They bought T-shirts and toothbrushes.", "T"], ["The suitcase was found in Madrid.", "T"], ["The Lopez family has got children.", "DS"]],
    q: [["What did the airport worker promise?", "To call the next day."], ["What did the family buy?", "T-shirts and toothbrushes."], ["When did the suitcase arrive at the hotel?", "In the evening (the next day)."]] }
],

p2u4: [
  { t: "A healthy breakfast",
    x: "A good breakfast gives you energy for the morning. Doctors say you should eat some fruit and some bread or cereal. Milk is good because it has got calcium. Don't eat too much sugar. In Tom's house breakfast is at seven. He has two slices of bread with butter and a little jam, and an apple. He drinks a glass of milk. His sister Kim doesn't like milk, so she drinks orange juice. How much sugar do they eat? Not much!",
    tf: [["Breakfast gives you energy.", "T"], ["Doctors say you shouldn't eat fruit.", "F"], ["Milk has got calcium.", "T"], ["Tom has breakfast at eight.", "F"], ["Kim drinks orange juice.", "T"], ["Tom eats eggs every day.", "DS"]],
    q: [["What does Tom eat for breakfast?", "Two slices of bread with butter and jam, and an apple."], ["Why does Kim drink juice?", "She doesn't like milk."], ["What shouldn't you eat too much of?", "Sugar."]] },
  { t: "Pancakes",
    x: "Here is a recipe for pancakes. You need two eggs, a cup of flour, a cup of milk and a little salt. First put the flour in a big bowl. Add the eggs and the milk. Mix everything well until there are no lumps. Then heat a little oil in a pan. Pour some mixture into the pan and wait for two minutes. Turn the pancake over and cook for one more minute. You can eat pancakes with jam, honey or chocolate. How many pancakes can you make? About eight.",
    tf: [["You need two eggs.", "T"], ["You need a cup of sugar.", "F"], ["First you put the flour in a bowl.", "T"], ["You cook the first side for five minutes.", "F"], ["You can eat pancakes with honey.", "T"], ["The recipe is from Italy.", "DS"]],
    q: [["How much flour do you need?", "A cup."], ["How long do you wait before you turn the pancake over?", "Two minutes."], ["How many pancakes can you make?", "About eight."]] }
],

p2u5: [
  { t: "The Amazon",
    x: "The Amazon is the biggest rainforest in the world. It is in South America and it covers parts of nine countries; most of it is in Brazil. The Amazon River is one of the longest rivers in the world and it flows into the Atlantic Ocean. Millions of animals and plants live in the rainforest, for example jaguars, monkeys and colourful parrots. The climate is hot and wet all year. Many trees are cut down every year, so scientists say we must protect the forest.",
    tf: [["The Amazon is in South America.", "T"], ["Most of the rainforest is in Peru.", "F"], ["The Amazon River flows into the Atlantic Ocean.", "T"], ["The climate is cold and dry.", "F"], ["Jaguars live in the rainforest.", "T"], ["The rainforest is older than the Alps.", "DS"]],
    q: [["Which country has most of the rainforest?", "Brazil."], ["Name two animals that live in the rainforest.", "Any two of: jaguars, monkeys, parrots."], ["Why must we protect the forest?", "Because many trees are cut down every year."]] },
  { t: "Slovenia",
    x: "Slovenia is a small country in the middle of Europe. The capital is Ljubljana. In the north there are high mountains; the highest is Triglav. In the west there is a short coast on the Adriatic Sea, and in the east there are plains and hills with vineyards. Slovenia borders four countries: Italy, Austria, Hungary and Croatia. About two million people live there. The climate is warm in summer and cold in winter, and there is a lot of snow in the mountains.",
    tf: [["Slovenia is in the middle of Europe.", "T"], ["The capital of Slovenia is Maribor.", "F"], ["Triglav is a high mountain.", "T"], ["Slovenia borders Germany.", "F"], ["About two million people live in Slovenia.", "T"], ["Most Slovenians speak three languages.", "DS"]],
    q: [["How many countries does Slovenia border?", "Four."], ["What is in the west?", "A short coast on the Adriatic Sea."], ["What is the winter like?", "Cold, with a lot of snow in the mountains."]] }
],

p2u6: [
  { t: "A trip to the cinema",
    x: "On Saturday Zoe and her friends are going to see a new science fiction film. They are going to meet outside the cinema at five o'clock. The film starts at half past five and lasts two hours. Zoe is going to buy popcorn, but her friend Ben is going to buy a drink. After the film they are going to have pizza in a café. Zoe thinks the film is going to be exciting because her favourite actor is in it. \"I'm not going to talk during the film!\" says Ben.",
    tf: [["The friends are going to see a science fiction film.", "T"], ["They are going to meet at six o'clock.", "F"], ["The film lasts two hours.", "T"], ["Ben is going to buy popcorn.", "F"], ["They are going to eat pizza after the film.", "T"], ["Zoe has seen the film before.", "DS"]],
    q: [["What is Zoe going to buy?", "Popcorn."], ["Why does Zoe think the film is going to be exciting?", "Because her favourite actor is in it."], ["What are they going to do after the film?", "Have pizza in a café."]] },
  { t: "TV favourites",
    x: "Every family has favourite TV programmes. In my house we love different things. My dad likes the news and sport. My mum watches cookery shows, and she loves talent shows because she enjoys music. My little brother watches cartoons all the time. I like comedies and documentaries about animals. We hate adverts, but we have only one TV, so we have to share it. On Sundays we watch a film together, and we always choose it in turns.",
    tf: [["The writer's dad likes the news.", "T"], ["The writer's mum hates music.", "F"], ["The writer's brother watches cartoons.", "T"], ["The family has two TVs.", "F"], ["On Sundays the family watches a film together.", "T"], ["The writer's favourite comedy is a British series.", "DS"]],
    q: [["What does the writer like to watch?", "Comedies and documentaries about animals."], ["Why does the family have to share the TV?", "They have only one TV."], ["How do they choose the Sunday film?", "In turns."]] }
]

});
