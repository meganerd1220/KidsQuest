import { getFirestore, collection, getDocs, query, where, doc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { Alert } from 'react-native';
import app from "./firebase";

const firestoreInstance = getFirestore(app);

// Get count of user accounts
const getUserCount = async () => {
  const accountsCollectionRef = collection(firestoreInstance, 'accounts');
  const accountsSnapshot = await getDocs(accountsCollectionRef);
  return accountsSnapshot.size + 1;
};

// Verify email format
export const verifyEmailFormat = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Check if username is taken
export const isUserTaken = async (username) => {
  const accountsCollectionRef = collection(firestoreInstance, 'accounts');
  const usernameQuery = query(accountsCollectionRef, where('username', '==', username));

  try {
    const querySnapshot = await getDocs(usernameQuery);
    return querySnapshot.size > 0;
  } catch (e) {
    console.error(e);
    return true;
  }
};

// Check if email is taken
export const isEmailTaken = async (email) => {
  const accountsCollectionRef = collection(firestoreInstance, 'accounts');
  const emailQuery = query(accountsCollectionRef, where('email', '==', email));

  try {
    const querySnapshot = await getDocs(emailQuery);
    return querySnapshot.size > 0;
  } catch (e) {
    console.error(e);
    return true;
  }
};

// Send new credentials
export const sendNewCredentials = async (name, lastn, email, username, password) => {
  try {
    const userCount = await getUserCount();

    await addDoc(collection(firestoreInstance, 'accounts'), {
      name,
      lastn,
      email,
      username,
      password,
      timestamp: serverTimestamp(),
      userid: `user${userCount}`,
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
    collection(firestoreInstance, 'accounts'),
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
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
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

// Get child profiles
export const getChildProfiles = async (userid) => {
  const childArray = [];

  try {
    const querySnapshot = await getDocs(collection(firestoreInstance, 'children'));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id === userid)
        childArray.push(data);
    });
    return childArray;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Add child profile
export const sendChildProfile = async (name, id) => {
  try {
    const userQuery = query(
      collection(firestoreInstance, 'accounts'),
      where('userid', '==', id)
    );

    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size > 0) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(firestoreInstance, 'accounts', userDoc.id);

      await updateDoc(userRef, { childName: name }); // Adjust the field name as per requirement
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};
