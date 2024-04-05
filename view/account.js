import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import styles from './styles';
import { updateUserInfo } from '../model/database';
import { useUser } from './userContext';

const AccountScreen = ({ navigation, route }) => {
  const { user, setUser } = useUser();
  const [firstName, setFirstName] = useState(user?.name ?? '');
  const [lastName, setLastName] = useState(user?.lastn ?? '');
  const [userEmail, setUserEmail] = useState(user?.email ?? '');
  const [userName, setUserName] = useState(user?.username ?? '');
  const [editMode, setEditMode] = useState(false); //Edit mode?

  console.log('User:', user);

  const handleButtonPress = async () => {
    if (!firstName || !lastName || !userEmail || !userName) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    if (editMode) {
      const updatedFields = {
        name: firstName,
        lastn: lastName,
        email: userEmail,
        username: userName
      };

      const updated = await updateUserInfo(user.userid, updatedFields, setUser);

      if (updated) {
        // Update the user context with the new user information
        setUser({ ...user, ...updatedFields });
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
          placeholder="User ID"
          value={user.userid}
          style={styles.input}
          editable={false}
        />
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          editable={editMode}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          editable={editMode}
        />
        <TextInput
          placeholder="Email"
          value={userEmail}
          onChangeText={setUserEmail}
          style={styles.input}
          editable={editMode}
        />
        <TextInput
          placeholder="Username"
          value={userName}
          onChangeText={setUserName}
          style={styles.input}
          editable={editMode}
        />
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
