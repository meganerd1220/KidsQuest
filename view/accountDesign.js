import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import app from "../model/firebase";

const firestore = getFirestore(app);

const AccountScreen = ({ navigation, route }) => {
  const { userData } = route.params ?? {};
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const userQuery = query(
  //         collection(firestore, 'accounts'), 
  //         where('username', '==', userData.username)
  //       );
  //       const querySnapshot = await getDocs(userQuery);
  //       if (!querySnapshot.empty) {
  //         querySnapshot.forEach((doc) => {
  //           const userData = doc.data();
  //           setUser(userData); // Set the retrieved user data
  //           setName(userData.name);
  //           setLastName(userData.lastname);
  //           setEmail(userData.email);
  //           setUsername(userData.username);
  //         });
  //       } else {
  //         Alert.alert('User data not found');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //       Alert.alert('Error fetching user data');
  //     }
  //   };

  //   fetchUserData();

  //   return () => {
  //     // Cleanup code, if any
  //   };
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Text style={styles.title}>Kids Quest</Text>
        <Text style={styles.title}>Account Settings</Text>
        {user && (
          <>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Edit Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Update Information</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AccountScreen;
