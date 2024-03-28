import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import styles from './styles';
import { updateUserInfo } from '../model/database';

const AccountScreen = ({ navigation, route }) => {
  const { name, lastname, email, username, userid } = route.params ?? '';
  const [Userid, setUserid] = useState(userid ?? '');
  const [firstName, setFirstName] = useState(name ?? '');
  const [lastName, setLastName] = useState(lastname ?? '');
  const [userEmail, setUserEmail] = useState(email ?? '');
  const [userName, setUserName] = useState(username ?? '');
  
  const [editMode, setEditMode] = useState(false); // State to track edit mode

 
  const handleButtonPress = async () => {
    // Check if any field is empty
    if (!firstName || !lastName || !userEmail || !userName) {
      Alert.alert('Please fill in all fields.');
      return;
    }
  
    // Proceed with updating user information if all fields are filled
    if (editMode) {
      const updatedFields = {
        name: firstName,
        lastn: lastName,
        email: userEmail,
        username: userName
      };
  
      const updated = await updateUserInfo(userid, updatedFields); // Pass userid instead of username
  
      if (updated) {
        setEditMode(false); // Exit edit mode
        Alert.alert('User information updated successfully.');
      } else {
        Alert.alert('Failed to update user information.');
      }
    } else {
      setEditMode(true); // Enter edit mode
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.title}>Kids Quest</Text>
        <Text style={styles.title}>Account Settings</Text>
        {/* Display userid as non-editable text input */}
        <TextInput
          placeholder="User ID"
          value={Userid}
          onChangeText={setUserid}
          style={[styles.input, {backgroundColor: 'lightgray'}]}
          editable={false} // Set editable to false
        />
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          editable={editMode} />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          editable={editMode} />
        <TextInput
          placeholder="Email"
          value={userEmail}
          onChangeText={setUserEmail}
          style={styles.input}
          editable={editMode} />
        <TextInput
          placeholder="Username"
          value={userName}
          onChangeText={setUserName}
          style={styles.input}
          editable={editMode} />
        <TouchableOpacity
          style={styles.button}
          onPress={handleButtonPress}>
          <Text style={styles.buttonText}>{editMode ? 'Update Information' : 'Edit Information'}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AccountScreen;
