import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './styles';

const AccountScreen = ({ navigation, route }) => {
  const { name, lastname, email, username, userid } = route.params ?? {};
  const [Userid, setUserid] = useState(userid?? ''); 
  const [firstName, setFirstName] = useState(name ?? '');
  const [lastName, setLastName] = useState(lastname ?? '');
  const [userEmail, setUserEmail] = useState(email ?? '');
  const [userName, setUserName] = useState(username ?? '');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.title}>Kids Quest</Text>
        <Text style={styles.title}>Account Settings</Text>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input} />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input} />
        <TextInput
          placeholder="Email"
          value={userEmail}
          onChangeText={setUserEmail}
          style={styles.input} />
        <TextInput
          placeholder="Username"
          value={userName}
          onChangeText={setUserName}
          style={styles.input} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => { }}>
          <Text
            style={styles.buttonText}>Edit Information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button} onPress={() => { }}>
          <Text
            style={styles.buttonText}>Update Information</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AccountScreen;
