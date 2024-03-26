
import { getFirestore, collection, getDocs, query, where, serverTimestamp, addDoc } from "firebase/firestore";
import React, { useEffect, useState, Alert} from 'react-native';

import app from "./firebase";
//Verify users in the application
export const verifyUserCredentials = async (username, password) => {
  const firestore = getFirestore(app);

  const userQuery = query(
    collection(firestore, 'accounts'), // 'users' is the table
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

//Get Children Profiles
export async function getChildProfiles(uname) {
  //const [children, setChildren] = useState('');
  const firestore = getFirestore(app);
  const childArray = [];

  try {
    const querySnapshot = await getDocs(collection(firestore, 'children'));  
    querySnapshot.forEach((doc) => {
      // Extract data from each document
      const data = doc.data();
      if(data.id == "user4")
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

const getUserCount = async () => {
  const firestore = getFirestore(app);
  const accountsCollectionRef = collection(firestore, 'accounts');
  const accountsSnapshot = await getDocs(accountsCollectionRef);
  return accountsSnapshot.size + 1;
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

//Add child profile
export const sendChildProfile = async (name, id) => {
  const firestore = getFirestore(app);

  try {
    //const userCount = await getUserCount();

    const newUserRef = await addDoc(collection(firestore, 'children'), {
      name,
      id,
    });

    console.log("Child added with ID: ", newUserRef.id);
    return true; // success
  } catch (e) {
    console.error(e);
    return false; // Error
  }
};

