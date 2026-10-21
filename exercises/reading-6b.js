// ============================================================
//  READING TEXTS FOR THE PRINTED TESTS - Project 1 (class 6.b)          (written 22 Oct 2026; same format as reading-8b.js)
//  window.READING[unit id] = [ { t: title, x: text, tf: [[statement, 'T' | 'F' | 'DS'], ...], q: [[question, answer], ...] }, ... ]
//  Very short and simple texts (A1), two per unit.
// ============================================================
window.READING = window.READING || {};
Object.assign(window.READING, {

p1u1: [
  { t: "Hello, I'm Luka",
    x: "Hello! My name is Luka. I am eleven years old and I am from Slovenia. I am in class 6.b. My teacher is Mrs Novak. She is nice. I have got a blue bag. In my bag there are a book, a pen, a pencil and a ruler. My best friend is Ana. She is eleven too. We sit at the same desk. I like English because it is fun.",
    tf: [["Luka is eleven.", "T"], ["Luka is from England.", "F"], ["His teacher is Mrs Novak.", "T"], ["Ana is Luka's sister.", "F"], ["Luka and Ana sit at the same desk.", "T"], ["Luka likes Maths.", "DS"]],
    q: [["What is Luka's teacher's name?", "Mrs Novak."], ["What colour is his bag?", "Blue."], ["Why does Luka like English?", "Because it is fun."]] },
  { t: "In the classroom",
    x: "This is my classroom. There are twenty desks and twenty chairs. The board is on the wall in front of the desks. There are two windows and one door. On the teacher's desk there is a computer. On the wall there is a map of the world. In the corner there is a plant. I like my classroom because it is big and bright.",
    tf: [["There are twenty desks.", "T"], ["There are three windows.", "F"], ["The board is at the back of the room.", "F"], ["There is a computer on the teacher's desk.", "T"], ["There is a map on the wall.", "T"], ["There is a clock in the classroom.", "DS"]],
    q: [["How many chairs are there?", "Twenty."], ["Where is the plant?", "In the corner."], ["Why does the writer like the classroom?", "Because it is big and bright."]] }
],

p1u2: [
  { t: "My family",
    x: "I have got a small family. My mother is a nurse and my father is a driver. I have got one sister, Eva. She is eight. My grandparents live in a village. My grandmother is seventy and my grandfather is seventy-two. At the weekend we visit them. My cousin Tim is there too. He is twelve and he is very funny.",
    tf: [["The writer's mother is a nurse.", "T"], ["The writer's father is a teacher.", "F"], ["Eva is eight.", "T"], ["The grandparents live in a village.", "T"], ["Tim is the writer's cousin.", "T"], ["The writer has got a brother.", "DS"]],
    q: [["How old is the writer's grandmother?", "Seventy."], ["When do they visit the grandparents?", "At the weekend."], ["What is Tim like?", "He is very funny."]] },
  { t: "Where are you from?",
    x: "Hi! I'm Maria and I'm from Spain. My friend Paul is from England and my friend Hans is from Germany. We are all in the same school in Ljubljana. On Mondays we have English together. On Fridays we play football. I am twelve. Paul is eleven and Hans is twelve too. We are good friends.",
    tf: [["Maria is from Spain.", "T"], ["Paul is from Germany.", "F"], ["The friends are at school in Ljubljana.", "T"], ["They play football on Mondays.", "F"], ["Hans is twelve.", "T"], ["Paul has got a brother.", "DS"]],
    q: [["Where is Hans from?", "Germany."], ["When do they have English?", "On Mondays."], ["How old is Paul?", "Eleven."]] }
],

p1u3: [
  { t: "My pets",
    x: "I have got two pets: a rabbit and a goldfish. The rabbit is white and its name is Snow. It eats carrots and lettuce. The goldfish is orange and it lives in a bowl in my bedroom. My brother hasn't got a pet, but he wants a parrot. My mum says no because parrots are very loud. I clean the rabbit's cage every Sunday.",
    tf: [["The writer has got two pets.", "T"], ["The rabbit's name is Snow.", "T"], ["The goldfish lives in the garden.", "F"], ["The writer's brother has got a parrot.", "F"], ["The writer cleans the cage on Sundays.", "T"], ["The rabbit is three years old.", "DS"]],
    q: [["What does the rabbit eat?", "Carrots and lettuce."], ["Why does Mum say no to a parrot?", "Because parrots are very loud."], ["Where does the goldfish live?", "In a bowl in the writer's bedroom."]] },
  { t: "My school subjects",
    x: "My favourite subject is Art because I like drawing. I also like Maths, but Science is difficult. We have English on Tuesday and Thursday. PE is on Friday and it is my brother's favourite subject. In Music we sing and play the recorder. My timetable is on the wall next to my desk. I have got six lessons on Monday.",
    tf: [["The writer's favourite subject is Art.", "T"], ["Science is easy for the writer.", "F"], ["English is on Tuesday and Thursday.", "T"], ["PE is on Monday.", "F"], ["The writer plays the recorder in Music.", "T"], ["The writer has got a lot of homework.", "DS"]],
    q: [["Why does the writer like Art?", "Because he or she likes drawing."], ["Where is the timetable?", "On the wall next to the writer's desk."], ["How many lessons are there on Monday?", "Six."]] }
],

p1u4: [
  { t: "Ben's day",
    x: "Ben gets up at seven o'clock. He has breakfast at half past seven and goes to school by bus. School starts at eight and finishes at one. At quarter past one he has lunch at home. In the afternoon he does his homework and plays the guitar. At six o'clock the family has dinner. Ben watches TV for an hour and goes to bed at nine.",
    tf: [["Ben gets up at seven o'clock.", "T"], ["He goes to school by car.", "F"], ["School finishes at one.", "T"], ["Ben has lunch at school.", "F"], ["He plays the guitar in the afternoon.", "T"], ["Ben has got a dog.", "DS"]],
    q: [["What time does Ben have breakfast?", "At half past seven."], ["What does he do after lunch?", "He does his homework and plays the guitar."], ["When does he go to bed?", "At nine."]] },
  { t: "My weekend",
    x: "On Saturday I get up late, at nine o'clock. In the morning I play football with my friends in the park. We have lunch at twelve. In the afternoon I go swimming. On Sunday I visit my grandmother. She plays the piano and I sing. In the evening I read a book. I love weekends!",
    tf: [["The writer gets up at nine on Saturday.", "T"], ["The writer plays football in the park.", "T"], ["The writer has lunch at one.", "F"], ["The writer goes swimming on Sunday.", "F"], ["The grandmother plays the piano.", "T"], ["The writer's friends play the guitar.", "DS"]],
    q: [["Who does the writer visit on Sunday?", "His or her grandmother."], ["What does the writer do in the evening?", "Reads a book."], ["What do the writer and the grandmother do together?", "She plays the piano and the writer sings."]] }
],

p1u5: [
  { t: "My new flat",
    x: "We live in a new flat in the town centre. There are five rooms: a living room, a kitchen, a bathroom and two bedrooms. There is a balcony with flowers. My bedroom is next to the kitchen. There is a bed, a wardrobe and a desk in my room. There isn't a garden, but there is a park behind the building.",
    tf: [["The flat is in the town centre.", "T"], ["There are five rooms.", "T"], ["There is a garden.", "F"], ["The writer's bedroom is next to the kitchen.", "T"], ["There is a park behind the building.", "T"], ["The flat is on the third floor.", "DS"]],
    q: [["What is on the balcony?", "Flowers."], ["What is in the writer's room?", "A bed, a wardrobe and a desk."], ["Where is the park?", "Behind the building."]] },
  { t: "Our town",
    x: "Our town is small but nice. In the centre there is a church and a library. Opposite the library there is a supermarket. There is a cinema next to the post office. There are two parks and a swimming pool. My school is between the library and the bank. There isn't a museum. On Saturdays I go to the cinema with my friends.",
    tf: [["There is a library in the centre.", "T"], ["The supermarket is opposite the library.", "T"], ["The cinema is next to the bank.", "F"], ["There are two parks.", "T"], ["There is a museum in the town.", "F"], ["The swimming pool is big.", "DS"]],
    q: [["Where is the school?", "Between the library and the bank."], ["What is next to the post office?", "The cinema."], ["What does the writer do on Saturdays?", "Goes to the cinema with friends."]] }
],

p1u6: [
  { t: "My best friend",
    x: "My best friend is Nina. She is twelve and she is tall and slim. She has got long fair hair and blue eyes. Today she is wearing jeans, a red T-shirt and white trainers. She isn't wearing a jacket because it is warm. Nina is very friendly and she is always smiling. She can draw very well.",
    tf: [["Nina is tall.", "T"], ["She has got short dark hair.", "F"], ["Nina is wearing a red T-shirt.", "T"], ["Nina is wearing a jacket.", "F"], ["She can draw well.", "T"], ["Nina has got a sister.", "DS"]],
    q: [["What colour are Nina's eyes?", "Blue."], ["Why isn't she wearing a jacket?", "Because it is warm."], ["What is Nina like?", "Friendly (and always smiling)."]] },
  { t: "What are they doing?",
    x: "It is Saturday afternoon in the park. Tom is running with his dog. The dog is brown and it is wearing a red collar. Two girls are sitting on a bench and they are reading comics. Three boys are playing football. An old man is feeding the birds. A little boy is crying because his ice cream is on the ground.",
    tf: [["Tom is running with his dog.", "T"], ["The dog is black.", "F"], ["Two girls are reading comics.", "T"], ["Three boys are playing basketball.", "F"], ["An old man is feeding the birds.", "T"], ["It is raining.", "DS"]],
    q: [["What colour is the dog?", "Brown."], ["Where are the girls sitting?", "On a bench."], ["Why is the little boy crying?", "Because his ice cream is on the ground."]] }
]

});
