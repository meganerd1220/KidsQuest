
import { getFirestore, collection, getDocs, query, where, serverTimestamp, addDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";
import {Alert} from 'react-native';
import app from "./firebase";
import { firestore } from "firebase/firestore";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

//Verify users in the application
const firestoreInstance = getFirestore(app);

export const verifyEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
// Check if email is already taken
export const isEmailTaken = async (email) => {
  try {
    const userQuery = query(
      collection(firestoreInstance, 'accounts'),
      where('email', '==', email)
    );

    const querySnapshot = await getDocs(userQuery);
    return querySnapshot.size > 0;
  } catch (error) {
    console.error('Error checking email:', error);
    return true; 
  }
};

// Check if username is already taken
export const isUserTaken = async (username) => {
  try {
    const userQuery = query(
      collection(firestoreInstance, 'accounts'),
      where('username', '==', username)
    );

    const querySnapshot = await getDocs(userQuery);
    return querySnapshot.size > 0;
  } catch (error) {
    console.error('Error checking username:', error);
    return true; 
  }
};

//send information to the database
export const sendNewCredentials = async (name, lastn, email, username, password) => {

  try {
    const newUserRef = await addDoc(collection(firestoreInstance, 'accounts'), {
      name,
      lastn,
      email,
      username,
      password,
      timestamp: serverTimestamp(),
      userid: uuidv4(),
    });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

// Verify user credentials
export const verifyUserCredentials = async (username, password) => {

  const userQuery = query(
    collection(firestoreInstance, 'accounts'), // 'accounts' is the table
    where('username', '==', username),
    where('password', '==', password)
  );

  try {
    const querySnapshot = await getDocs(userQuery);
    return querySnapshot.size > 0;
  } catch (e) {
    console.error(e);
    return false;
  }
};

// Get user info
export const getUserInfo = async (username) => {

  const userQuery = query(
    collection(firestoreInstance, 'accounts'),
    where('username', '==', username)
  );

  try {
    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.size > 0) {
      const userData = querySnapshot.docs[0].data();
      const { name, lastn, email, userid } = userData;
      return { name, lastn, email, userid };
    } else {
      return null; // Return null if user not found
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export async function getChildProfiles(userid) {
  //const [children, setChildren] = useState('');
  const childArray = [];

  try {
    const querySnapshot = await getDocs(collection(firestoreInstance, 'children'));  
    querySnapshot.forEach((doc) => {
      // Extract data from each document
      const data = doc.data();
      if(data.parentId == userid)
        childArray.push(data);
    });
    //setChildren(childArray);
    return childArray;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

//Add child profile
export const sendChildProfile = async (name, parentId) => {

  try {
    const newUserRef = await addDoc(collection(firestoreInstance, 'children'), {
      name,
      parentId,
      id: uuidv4(),
    });

    console.log("Child added with ID: ", newUserRef.id);
    return true; // success
  } catch (e) {
    console.error(e);
    return false; // Error
  }
};

//Delete Child Profile
export const deleteChildProfile = async (id, name) => {
  try {
    const querySnapshot = await getDocs(collection(firestoreInstance, 'children'));  
    querySnapshot.forEach((doc) => {
      // Extract data from each document
      const data = doc.data();
      if(data.id == id && data.name == name)
        docName = doc;
    });
    
    await deleteDoc(doc(firestoreInstance, "children", docName.id));

    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error removing document: ', error);
  }
};

export const sendNewChores = async (chore, userId) => {
  const choresCollection = collection(firestoreInstance, 'Chores');

  //const { userId, setUserId } = useUserId();
  try {
    const success = await addDoc(choresCollection, {
      chore,
      parentID: userId,
      childID: "childID",
      completed: false
    })
    
    if (success) {
      Alert.alert("Chore added successfully!");
      // Optionally navigate to a screen or perform other actions
      };   

  } catch (error) {
    console.error("Error adding chore:", error.message);
    Alert.alert("An unexpected error occurred. Please try again.");
  }
};



  export async function getChores(childID, userid) {
    const firestore = getFirestore(app);
    const choresArray = [];
  
    try {
      const choreQuery = await getDocs(collection(firestore, 'Chores'));  
      querySnapshot.forEach((doc) => {
        // Extract data from each document
        const data = doc.data();
        if(data.parentid == userid && data.id == childID && data.completed == false)
      docName = doc;
          choresArray.push(docName.chore);
      });
      return choresArray;
    } catch (error) {
      console.error('Error fetching chores:', error);
    }
  };
  
  

  // Update user info
export const updateUserInfo = async (userid, updatedFields) => {
  try {
    const userQuery = query(
      collection(firestoreInstance, 'accounts'),
      where('userid', '==', userid)
    );

    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size > 0) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(firestoreInstance, 'accounts', userDoc.id);

      await updateDoc(userRef, updatedFields);

      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

// Update password
export const updatePassword = async (userid, updatedFields) => {
  try {
    const userQuery = query(
      collection(firestoreInstance, 'accounts'),
      where('userid', '==', userid)
    );

    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size > 0) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(firestoreInstance, 'accounts', userDoc.id);

      await updateDoc(userRef, updatedFields);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};
