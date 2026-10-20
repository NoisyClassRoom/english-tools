// ============================================================
//  READY-MADE MIND MAPS (21 Oct 2026, original word groups written for this site, no copied text)
//  Global MINDMAPS = [{ id, title, icon, branches: [{ name, items: [word, word, ...] }, ...] }]
//  Used by the printable maker (mindmap/index.html) and by the online "Mind map" game for pupils (exercises/index.html):
//  the pupil sorts the words into the branches, so every word belongs to ONE branch only. Keep 4-5 branches with 5-6 short items each.
//  To add a map: copy a block, change the id (no spaces) and the words. Items are English words or short phrases.
// ============================================================
window.MINDMAPS = [
  { id: 'family', title: 'Family', icon: '👪', branches: [
    { name: 'Parents and children', items: ['mother', 'father', 'son', 'daughter', 'parents', 'children'] },
    { name: 'Wider family', items: ['grandmother', 'grandfather', 'aunt', 'uncle', 'cousin', 'nephew'] },
    { name: 'By marriage', items: ['husband', 'wife', 'stepmother', 'stepfather', 'half-brother', 'in-laws'] },
    { name: 'Describing people', items: ['tall', 'kind', 'funny', 'strict', 'young', 'shy'] } ] },
  { id: 'weather', title: 'Weather', icon: '⛅', branches: [
    { name: 'What is it like?', items: ['sunny', 'cloudy', 'rainy', 'windy', 'foggy', 'snowy'] },
    { name: 'Temperature', items: ['hot', 'warm', 'cool', 'cold', 'freezing', 'degrees'] },
    { name: 'Seasons', items: ['spring', 'summer', 'autumn', 'winter', 'season', 'forecast'] },
    { name: 'What do we wear?', items: ['raincoat', 'umbrella', 'scarf', 'gloves', 'sunglasses', 'boots'] },
    { name: 'Dangerous weather', items: ['storm', 'thunder', 'lightning', 'flood', 'hurricane', 'drought'] } ] },
  { id: 'school', title: 'School', icon: '🏫', branches: [
    { name: 'Subjects', items: ['Maths', 'English', 'History', 'Geography', 'Science', 'PE'] },
    { name: 'In the classroom', items: ['board', 'desk', 'chair', 'ruler', 'rubber', 'pencil case'] },
    { name: 'People', items: ['teacher', 'pupil', 'headteacher', 'classmate', 'friend', 'caretaker'] },
    { name: 'The school day', items: ['lesson', 'break', 'homework', 'test', 'timetable', 'canteen'] } ] },
  { id: 'food', title: 'Food and drink', icon: '🍎', branches: [
    { name: 'Fruit and vegetables', items: ['apple', 'banana', 'orange', 'carrot', 'potato', 'tomato'] },
    { name: 'Meat, fish and dairy', items: ['chicken', 'sausage', 'fish', 'cheese', 'butter', 'yoghurt'] },
    { name: 'Meals', items: ['breakfast', 'lunch', 'dinner', 'snack', 'starter', 'dessert'] },
    { name: 'Drinks and sweets', items: ['water', 'juice', 'milk', 'chocolate', 'ice cream', 'biscuit'] },
    { name: 'At the table', items: ['plate', 'fork', 'knife', 'spoon', 'cup', 'glass'] } ] },
  { id: 'home', title: 'House and home', icon: '🏠', branches: [
    { name: 'Rooms', items: ['kitchen', 'bedroom', 'bathroom', 'living room', 'hall', 'attic'] },
    { name: 'Furniture', items: ['sofa', 'table', 'bed', 'wardrobe', 'shelf', 'armchair'] },
    { name: 'Parts of a house', items: ['roof', 'floor', 'wall', 'door', 'window', 'stairs'] },
    { name: 'Outside', items: ['garden', 'garage', 'fence', 'gate', 'balcony', 'terrace'] } ] },
  { id: 'hobbies', title: 'Free time', icon: '🎸', branches: [
    { name: 'Sports', items: ['football', 'swimming', 'tennis', 'skiing', 'cycling', 'basketball'] },
    { name: 'Music', items: ['guitar', 'piano', 'drums', 'violin', 'sing', 'concert'] },
    { name: 'At home', items: ['read a book', 'watch TV', 'play computer games', 'cook', 'draw', 'listen to music'] },
    { name: 'Out and about', items: ['cinema', 'park', 'museum', 'shopping centre', 'swimming pool', 'library'] } ] },
  { id: 'clothes', title: 'Clothes', icon: '👕', branches: [
    { name: 'On top', items: ['T-shirt', 'shirt', 'jumper', 'sweatshirt', 'blouse', 'cardigan'] },
    { name: 'On the legs', items: ['jeans', 'trousers', 'shorts', 'skirt', 'tights', 'leggings'] },
    { name: 'On the feet', items: ['trainers', 'boots', 'sandals', 'socks', 'slippers', 'shoes'] },
    { name: 'Outdoors', items: ['coat', 'jacket', 'raincoat', 'scarf', 'gloves', 'hat'] },
    { name: 'Describing clothes', items: ['tight', 'loose', 'stripy', 'fashionable', 'comfortable', 'old-fashioned'] } ] },
  { id: 'travel', title: 'Travel', icon: '✈️', branches: [
    { name: 'Ways to travel', items: ['car', 'bus', 'train', 'plane', 'ship', 'bike'] },
    { name: 'Places', items: ['airport', 'station', 'harbour', 'hotel', 'beach', 'campsite'] },
    { name: 'Things you take', items: ['suitcase', 'passport', 'ticket', 'map', 'camera', 'sunglasses'] },
    { name: 'Travel words', items: ['journey', 'trip', 'luggage', 'delay', 'reservation', 'sightseeing'] } ] },
  { id: 'body', title: 'Body and health', icon: '🩺', branches: [
    { name: 'Head', items: ['hair', 'eye', 'ear', 'nose', 'mouth', 'tooth'] },
    { name: 'Body', items: ['arm', 'leg', 'back', 'stomach', 'shoulder', 'knee'] },
    { name: 'Problems', items: ['headache', 'cough', 'fever', 'sore throat', 'toothache', 'injury'] },
    { name: 'Getting better', items: ['medicine', 'doctor', 'rest', 'plaster', 'vitamin', 'hospital'] } ] },
  { id: 'jobs', title: 'Jobs', icon: '💼', branches: [
    { name: 'Health and care', items: ['doctor', 'nurse', 'vet', 'pharmacist', 'dentist', 'social worker'] },
    { name: 'Education and office', items: ['teacher', 'secretary', 'lawyer', 'accountant', 'journalist', 'translator'] },
    { name: 'Making and fixing', items: ['builder', 'carpenter', 'plumber', 'electrician', 'engineer', 'farmer'] },
    { name: 'Services', items: ['waiter', 'hairdresser', 'shop assistant', 'bus driver', 'postman', 'police officer'] } ] },
  { id: 'feelings', title: 'Feelings', icon: '😊', branches: [
    { name: 'Feeling good', items: ['happy', 'excited', 'proud', 'delighted', 'cheerful', 'relieved'] },
    { name: 'Sad or angry', items: ['sad', 'angry', 'upset', 'furious', 'disappointed', 'lonely'] },
    { name: 'Feeling nervous', items: ['nervous', 'scared', 'anxious', 'worried', 'embarrassed', 'ashamed'] },
    { name: 'Other', items: ['bored', 'tired', 'surprised', 'jealous', 'curious', 'confused'] } ] },
  { id: 'countries', title: 'Countries and languages', icon: '🌍', branches: [
    { name: 'Neighbours of Slovenia', items: ['Italy', 'Austria', 'Hungary', 'Croatia'] },
    { name: 'Capital cities', items: ['Rome', 'Vienna', 'Paris', 'Berlin', 'Madrid', 'London'] },
    { name: 'People', items: ['Italian', 'Austrian', 'French', 'German', 'Spanish', 'British'] },
    { name: 'Continents', items: ['Europe', 'Asia', 'Africa', 'North America', 'South America', 'Australia'] } ] },
  { id: 'pastsimple', title: 'Past simple', icon: '⏮️', branches: [
    { name: 'Regular verbs (-ed)', items: ['played', 'watched', 'visited', 'walked', 'liked', 'studied'] },
    { name: 'Irregular verbs', items: ['went', 'saw', 'had', 'bought', 'ate', 'wrote'] },
    { name: 'Time words', items: ['yesterday', 'last week', 'two days ago', 'in 2020', 'when I was ten', 'last summer'] },
    { name: 'Questions and negatives', items: ['Did you …?', 'I didn\'t …', 'Yes, I did.', 'No, I didn\'t.', 'Where did …?', 'What did …?'] } ] },
  { id: 'presentperfect', title: 'Present perfect', icon: '✅', branches: [
    { name: 'The form', items: ['have + past participle', 'has + past participle', 'I\'ve done', 'she\'s seen', 'haven\'t finished', 'hasn\'t come'] },
    { name: 'Time words', items: ['just', 'already', 'yet', 'ever', 'never', 'so far'] },
    { name: 'Irregular participles', items: ['been', 'seen', 'done', 'eaten', 'written', 'gone'] },
    { name: 'We use it for', items: ['experience', 'recent news', 'unfinished time', 'a result now', 'for and since', 'life so far'] } ] },
  { id: 'comparing', title: 'Comparing things', icon: '⚖️', branches: [
    { name: 'Short adjectives (-er)', items: ['bigger', 'taller', 'older', 'colder', 'faster', 'cheaper'] },
    { name: 'Long adjectives (more)', items: ['more interesting', 'more expensive', 'more difficult', 'more beautiful', 'more dangerous', 'more useful'] },
    { name: 'The most / the -est', items: ['the biggest', 'the tallest', 'the oldest', 'the most famous', 'the best', 'the worst'] },
    { name: 'Irregular', items: ['good - better - best', 'bad - worse - worst', 'far - further - furthest', 'little - less - least', 'much - more - most', 'many - more - most'] } ] },
  { id: 'modals', title: 'Modal verbs', icon: '🔑', branches: [
    { name: 'Ability', items: ['can', 'can\'t', 'could', 'couldn\'t', 'be able to', 'know how to'] },
    { name: 'Rules and duty', items: ['must', 'mustn\'t', 'have to', 'don\'t have to', 'need to', 'be allowed to'] },
    { name: 'Advice', items: ['should', 'shouldn\'t', 'ought to', 'had better', 'Why don\'t you …?', 'If I were you …'] },
    { name: 'Possibility and offers', items: ['may', 'might', 'perhaps', 'Shall I …?', 'Would you like …?', 'Can I …?'] } ] }
];
