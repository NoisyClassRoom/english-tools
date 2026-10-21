// ============================================================
//  READING TEXTS FOR THE PRINTED TESTS - Dream Team Starter (class 7.a)          (written 21 Oct 2026; same format as reading-8b.js)
//  window.READING[unit id] = [ { t: title, x: text, tf: [[statement, 'T' | 'F' | 'DS'], ...], q: [[question, answer], ...] }, ... ]
//  Short and simple texts (A1), two per unit.
// ============================================================
window.READING = window.READING || {};
Object.assign(window.READING, {

dts0: [
  { t: "A new school",
    x: "Hi, I'm Lena. I'm twelve and I'm from Celje. This is my first day at a new school. My new teacher is Mr Kern. He is friendly and he speaks English very well. There are twenty-four pupils in my class. Some of them are from other countries. My desk is next to the window. I'm a bit nervous, but I'm happy too.",
    tf: [["Lena is twelve.", "T"], ["Lena is from Maribor.", "F"], ["Mr Kern is her new teacher.", "T"], ["There are twenty pupils in the class.", "F"], ["Lena's desk is next to the window.", "T"], ["Lena has got a brother.", "DS"]],
    q: [["Where is Lena from?", "Celje."], ["What is Mr Kern like?", "Friendly."], ["How does Lena feel?", "A bit nervous but happy."]] },
  { t: "Meet my friends",
    x: "My name is Jack and I'm thirteen. My best friends are Sam and Ruby. Sam is fourteen and he is from Canada. Ruby is thirteen and she is from Ireland. We are in the same class. We aren't in the same football team, but we play together at the weekend. Ruby is a very good player. Sam isn't good at football, but he is good at chess.",
    tf: [["Jack is thirteen.", "T"], ["Sam is from Ireland.", "F"], ["Ruby is fourteen.", "F"], ["The three friends are in the same class.", "T"], ["Ruby is a good football player.", "T"], ["Sam has got a chess club.", "DS"]],
    q: [["Where is Sam from?", "Canada."], ["When do the friends play football together?", "At the weekend."], ["What is Sam good at?", "Chess."]] }
],

dts1: [
  { t: "The school match",
    x: "Today is the big match: our school against Green School. We are in the red shirts. Our team is good, but Green School is very good too. Mia is our best player. She is fast and she scores a lot of goals. Our goalkeeper is Tim. He isn't tall, but he is brilliant. The weather is cold and cloudy, but the stadium is full. Are we ready? Yes, we are!",
    tf: [["The match is today.", "T"], ["The writer's team wears blue shirts.", "F"], ["Mia scores a lot of goals.", "T"], ["Tim is very tall.", "F"], ["The stadium is full.", "T"], ["Green School wins the match.", "DS"]],
    q: [["Who is the best player?", "Mia."], ["What is Tim?", "The goalkeeper."], ["What is the weather like?", "Cold and cloudy."]] },
  { t: "A good swimmer",
    x: "Anna is ten years old and she is a very good swimmer. She isn't in a team, but she goes to the swimming pool three times a week. Her coach is Mr Bell. He is kind and he says: \"You are a great swimmer, Anna!\" Anna is happy when she is in the water. Are her friends good swimmers too? No, they aren't, but they are learning.",
    tf: [["Anna is ten.", "T"], ["Anna is in a swimming team.", "F"], ["She goes to the pool three times a week.", "T"], ["Mr Bell is her teacher.", "F"], ["Anna's friends are good swimmers.", "F"], ["Anna has got a medal.", "DS"]],
    q: [["How often does Anna go to the pool?", "Three times a week."], ["What is Mr Bell?", "Her coach."], ["What does he say to her?", "\"You are a great swimmer.\""]] }
],

dts2: [
  { t: "Family photos",
    x: "This is a photo of my family. These are my parents, Mark and Sue. That man next to them is my grandfather and this lady is my grandmother. Those children in front are my cousins, Tom and Lily. These two dogs are Max and Bella. That big house in the photo isn't our house. It is my grandparents' house. We are in their garden.",
    tf: [["The photo is of the writer's family.", "T"], ["Mark and Sue are the writer's parents.", "T"], ["Tom and Lily are the writer's brothers.", "F"], ["Max and Bella are dogs.", "T"], ["The big house is the writer's house.", "F"], ["The photo is from last summer.", "DS"]],
    q: [["Who is the man next to the parents?", "The writer's grandfather."], ["Who are Tom and Lily?", "The writer's cousins."], ["Where are they in the photo?", "In their grandparents' garden."]] },
  { t: "In the sport shop",
    x: "Tom and Kim are in a sport shop. Tom wants new trainers. He looks at two pairs. These trainers are white and they cost thirty euros. Those trainers on the shelf are black and they cost forty euros. Tom likes the white ones. Kim wants a T-shirt. That T-shirt is too big and this T-shirt is too small. Kim says: \"I'll look in another shop.\"",
    tf: [["Tom wants new trainers.", "T"], ["The white trainers cost thirty euros.", "T"], ["The black trainers are cheaper than the white ones.", "F"], ["Tom likes the black trainers.", "F"], ["Kim wants a T-shirt.", "T"], ["Tom buys the white trainers.", "DS"]],
    q: [["How much are the black trainers?", "Forty euros."], ["Why doesn't Kim buy a T-shirt?", "One is too big and the other is too small."], ["What does Kim say at the end?", "\"I'll look in another shop.\""]] }
],

dts3: [
  { t: "A day at the zoo",
    x: "The Smith family is at the zoo. The zoo opens at nine o'clock and closes at five. At half past nine they see the elephants. They are in a big field next to the lake. At twelve o'clock they have lunch in the café opposite the monkey house. At quarter past two they watch the penguins. The penguins are in front of a big pool. The family leaves at quarter to five. \"This is a great place!\" says Dad.",
    tf: [["The zoo opens at nine o'clock.", "T"], ["The zoo closes at six o'clock.", "F"], ["The elephants are next to a lake.", "T"], ["The café is opposite the monkey house.", "T"], ["The family watches the penguins at quarter past two.", "T"], ["The children like the monkeys best.", "DS"]],
    q: [["What time do they have lunch?", "At twelve o'clock."], ["Where are the penguins?", "In front of a big pool."], ["What time does the family leave?", "At quarter to five."]] },
  { t: "My room",
    x: "This is my room. It is small, but I like it. My bed is under the window and my desk is next to the bed. On the desk there is a lamp, a laptop and three books. My guitar is behind the door. There are posters on the wall: my favourite band is in front of the bed. My cat sleeps on the chair. Where is my bag? It is under the desk.",
    tf: [["The writer's room is big.", "F"], ["The bed is under the window.", "T"], ["The guitar is behind the door.", "T"], ["The writer's cat sleeps on the bed.", "F"], ["The bag is under the desk.", "T"], ["The writer plays the guitar every day.", "DS"]],
    q: [["What is on the desk?", "A lamp, a laptop and three books."], ["Where does the cat sleep?", "On the chair."], ["What is on the wall?", "Posters."]] }
],

dts4: [
  { t: "Charlie's Saturday",
    x: "Charlie doesn't like shopping. On Saturdays his mum goes to the supermarket and he stays at home. He doesn't get up early. At ten o'clock he has breakfast and then he plays computer games. His sister Lucy doesn't play games. She reads books or draws pictures. In the afternoon Charlie meets his friends. They play football in the park, but they don't play if it rains. Does Charlie help at home? Not very often!",
    tf: [["Charlie likes shopping.", "F"], ["Charlie's mum goes to the supermarket on Saturdays.", "T"], ["Lucy plays computer games.", "F"], ["Charlie plays football with his friends.", "T"], ["They play in the park when it rains.", "F"], ["Charlie has got a dog.", "DS"]],
    q: [["What time does Charlie have breakfast?", "At ten o'clock."], ["What does Lucy do?", "She reads books or draws pictures."], ["Does Charlie help at home often?", "No, he doesn't."]] },
  { t: "A school day",
    x: "Maya goes to school by bus. She lives near the school, but she doesn't walk because the road is dangerous. Lessons start at eight and finish at two. Maya doesn't like Maths, but she loves English. She doesn't eat lunch in the canteen; she brings sandwiches. After school she does homework and then she watches TV. Do her parents watch TV with her? No, they don't. They work in the evening.",
    tf: [["Maya goes to school by bus.", "T"], ["Maya walks to school.", "F"], ["Lessons finish at two.", "T"], ["Maya likes Maths.", "F"], ["Maya eats lunch in the canteen.", "F"], ["Maya's parents are teachers.", "DS"]],
    q: [["Why doesn't Maya walk to school?", "Because the road is dangerous."], ["What does she bring for lunch?", "Sandwiches."], ["What do her parents do in the evening?", "They work."]] }
],

dts5: [
  { t: "Football in the park",
    x: "Sam and his friends are in the park. Sam has got a new ball. \"Give the ball to me!\" shouts Ben. \"Pass it to Tom,\" says Sam. \"He is near the goal.\" Tom kicks the ball, but he hasn't got good boots and the ball goes over the wall. \"Don't worry,\" says Ben. \"I'll go and get it.\" A woman gives the ball back to him. \"Thank you!\" says Ben. \"Be careful next time,\" she says. They have got one more hour to play.",
    tf: [["Sam has got a new ball.", "T"], ["Ben wants the ball.", "T"], ["Tom is far from the goal.", "F"], ["Tom has got good boots.", "F"], ["A woman gives the ball back.", "T"], ["The woman is Tom's mother.", "DS"]],
    q: [["Where does the ball go?", "Over the wall."], ["Who gives the ball back?", "A woman."], ["How long can they play?", "One more hour."]] },
  { t: "Class rules",
    x: "Our teacher has got some rules for the class. Listen to the teacher. Don't talk when other people are talking. Open your books when she says \"page twelve\". Don't use your phone in the lesson. Help your friends, but don't copy their answers. If you haven't got a pen, ask me and I will give you one. Mrs Hart says: \"Rules are easy if you follow them!\"",
    tf: [["The teacher has got some rules.", "T"], ["Pupils can use their phones in the lesson.", "F"], ["Pupils should help their friends.", "T"], ["Pupils can copy their friends' answers.", "F"], ["Mrs Hart gives a pen to pupils who haven't got one.", "T"], ["Mrs Hart has got a dog.", "DS"]],
    q: [["What must you do when the teacher says \"page twelve\"?", "Open your books."], ["What can you ask the teacher for?", "A pen."], ["What does Mrs Hart say about rules?", "They are easy if you follow them."]] }
],

dts6: [
  { t: "Planning a party",
    x: "It's Anna's birthday on Saturday and her friends are planning a party. \"Let's have it in the garden,\" says Mark. \"We haven't got any chairs,\" says Anna. \"Let's ask the neighbours.\" They need some food. \"Have we got any bread?\" asks Mark. \"Yes, we have some bread, but there isn't any cheese. Let's buy some cheese and some juice.\" Anna wants a chocolate cake. \"Let's make it together on Friday,\" says her mum.",
    tf: [["The party is on Saturday.", "T"], ["The party is in the garden.", "T"], ["They have got a lot of chairs.", "F"], ["There is some bread.", "T"], ["There is some cheese.", "F"], ["Anna's mum is a baker.", "DS"]],
    q: [["Whose birthday is it?", "Anna's."], ["What do they need to buy?", "Cheese and juice."], ["When do they make the cake?", "On Friday."]] },
  { t: "In the fridge",
    x: "I'm hungry! Is there any food in the fridge? Let's look. There are some eggs and there is some milk. There isn't any butter, but there is some jam. There are some tomatoes, but there aren't any onions. Let's make an omelette with eggs and tomatoes. Is there any salt? Yes, there is some in the cupboard. Let's start cooking!",
    tf: [["There are some eggs.", "T"], ["There is some butter.", "F"], ["There is some jam.", "T"], ["There are some onions.", "F"], ["The salt is in the cupboard.", "T"], ["There is some cheese in the fridge.", "DS"]],
    q: [["What do they want to make?", "An omelette."], ["Where is the salt?", "In the cupboard."], ["What haven't they got?", "Butter and onions."]] }
]

});
