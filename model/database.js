import { getFirestore, collection, getDocs, query, where, doc, updateDoc, addDoc, serverTimestamp} from "firebase/firestore";
import app from "./firebase";
import { firestore } from "firebase/firestore";

//getting count of user accounts
const getUserCount = async () => {
  const firestore = getFirestore(app);
  const accountsCollectionRef = collection(firestore, 'accounts');
  const accountsSnapshot = await getDocs(accountsCollectionRef);
  return accountsSnapshot.size + 1;
};


export const verifyEmailFormat = (email) => {
  // A basic email format validation
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isUserTaken = async (username) => {
  const firestore = getFirestore(app);
  const accountsCollectionRef = collection(firestore, 'accounts');
  const usernameQuery = query(accountsCollectionRef, where('username', '==', username));

  try {
    const querySnapshot = await getDocs(usernameQuery);
    return querySnapshot.size > 0; // Return true if username is taken, false otherwise
  } catch (e) {
    console.error(e);
    return true; // Consider username as taken on error
  }
};


export const isEmailTaken = async (email) => {
  const firestore = getFirestore(app);
  const accountsCollectionRef = collection(firestore, 'accounts');
  const emailQuery = query(accountsCollectionRef, where('email', '==', email));

  try {
    const querySnapshot = await getDocs(emailQuery);
    return querySnapshot.size > 0; // Return true if email is taken, false otherwise
  } catch (e) {
    console.error(e);
    return true; // Consider email as taken on error
  }
};


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
      const { name, lastn, email, userid, username } = userData; // Include 'username' field here
      return { name, lastn, email, userid, username };
    } else {
      return null; // Return null if user not found
    }
  } catch (e) {
    console.error(e);
    return null; // Return null on error
  }
};

export const updateUserInfo = async (userid, updatedFields) => {
  const firestore = getFirestore(app);

  try {
    const userQuery = query(
      collection(firestore, 'accounts'),
      where('userid', '==', userid) // Query by userid instead of username
    );

    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size > 0) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(firestore, 'accounts', userDoc.id);

      // Update each field provided in the updatedFields object
      await updateDoc(userRef, updatedFields);

      return true; // Success
    } else {
      return false; // User not found
    }
  } catch (e) {
    console.error(e);
    return false; // Error
  }
};

