import { getDatabase, ref, set, onValue } from 'firebase/database';
import { app } from './firebase';

const addDataToFirebase = (name) => {
  console.log("WHY");
  //const database = getDatabase(app);
  //const usersRef = ref(database, 'users');

  // Assuming you want to add individual users under unique keys
  //const newUserRef = ref(database, 'kids/' + Date.now()); // Unique key for each user
  //set(newUserRef, {
  //  name: name
  //})
  //.then(() => {
  //  console.log('Data added to Firebase Realtime Database successfully!');
  //})
  //.catch(error => {
  //  console.error('Error adding data to Firebase Realtime Database:', error);
  //});
};

export { addDataToFirebase };