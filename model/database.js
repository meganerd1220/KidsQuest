
import { getFirestore, collection, getDocs, query, where, serverTimestamp, addDoc, doc, deleteDoc} from "firebase/firestore";
import {Alert} from 'react-native';
import app from "./firebase";
import { firestore } from "firebase/firestore";


//Verify users in the application

//getting count of user accounts
const getUserCount = async () => {
  const firestore = getFirestore(app);
  const accountsCollectionRef = collection(firestore, 'accounts');
  const accountsSnapshot = await getDocs(accountsCollectionRef);
  return accountsSnapshot.size + 1;
};

const getChildCount = async () => {
  const firestore = getFirestore(app);
  const accountsCollectionRef = collection(firestore, 'children');
  const accountsSnapshot = await getDocs(accountsCollectionRef);
  return accountsSnapshot.size + 1;
};

const verifyEmailFormat = async (email) => {
  //handle right format of email


}
//send information to the database
export const sendNewCredentials = async (name, lastn, email, username, password) => {
  const firestore = getFirestore(app);

  try {
    const userCount = await getUserCount();

    const newUserRef = await addDoc(collection(firestore, 'accounts'), {
      name,
      lastn,
      email,
      username,
      password,
      timestamp: serverTimestamp(),
      userid: `user${userCount}`,
    });

    console.log("User added with ID: ", newUserRef.id);
    return true; // success
  } catch (e) {
    console.error(e);
    return false; // Error
  }
};

export const verifyUserCredentials = async (username, password) => {
  const firestore = getFirestore(app);

  const userQuery = query(
    collection(firestore, 'accounts'), // 'accounts' is the table
    where('username', '==', username),
    where('password', '==', password)
  );

  try {
    const querySnapshot = await getDocs(userQuery);
    return querySnapshot.size > 0; // Return true if user exists, false otherwise
  } catch (e) {
    console.error(e);
    return false; // Return false on error
  }
};

export const getUserInfo = async (username) => {
  const firestore = getFirestore(app);

  const userQuery = query(
    collection(firestore, 'accounts'),
    where('username', '==', username)
  );

  try {
    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.size > 0) {
      // Assuming there's only one user with the provided username
      const userData = querySnapshot.docs[0].data();
      // Extracting necessary user information
      const { name, lastn, email, userid } = userData;
      return { name, lastn, email, userid };
    } else {
      return null; // Return null if user not found
    }
  } catch (e) {
    console.error(e);
    return null; // Return null on error
  }
};

export async function getChildProfiles(userid) {
  //const [children, setChildren] = useState('');
  const firestore = getFirestore(app);
  const childArray = [];

  try {
    const querySnapshot = await getDocs(collection(firestore, 'children'));  
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

  //const userQuery = query(
  //  collection(firestore, 'children'), // 'users' is the table
  //  where('id', '==', id)
  //);

  //try {
  //  const querySnapshot = await getDocs(userQuery);
  //  return querySnapshot.size > 0; // Return true if user exists, false otherwise
  //} catch (e) {
  //  console.error(e);
  //  return false; // Return false on error
  //}
};

//Add child profile
export const sendChildProfile = async (name, parentId) => {
  const firestore = getFirestore(app);

  try {
    const childCount = await getChildCount();

    const newUserRef = await addDoc(collection(firestore, 'children'), {
      name,
      parentId,
      id: `child${childCount}`,
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
  const firestore = getFirestore(app);
  try {
    const querySnapshot = await getDocs(collection(firestore, 'children'));  
    querySnapshot.forEach((doc) => {
      // Extract data from each document
      const data = doc.data();
      if(data.id == id && data.name == name)
        docName = doc;
    });
    
    await deleteDoc(doc(firestore, "children", docName.id));

    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error removing document: ', error);
  }
};

export const sendNewChores = async (chore, userId) => {
  const firestore = getFirestore(app);
  const choresCollection = collection(firestore, 'Chores');
  //const { userId, setUserId } = useUserId();
  try {
    const success = await addDoc(choresCollection, {
      chore,
      parentid: userId,
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