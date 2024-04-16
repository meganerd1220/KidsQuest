import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';
import { sendNewCredentials, isEmailTaken, isUserTaken, verifyEmailFormat } from '../model/database';

const SignUpScreen = ({ navigation }) => {
  const [name, setname] = useState('');
  const [lastn, setlastn] = useState('');
  const [email, setemail] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const signup = async () => {
    // Check email format
    if (!verifyEmailFormat(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Check if email is already taken
    const emailTaken = await isEmailTaken(email);
    if (emailTaken) {
      Alert.alert("Email Taken", "This email is already associated with an account.");
      return;
    }

    // Check if username is already taken
    const userTaken = await isUserTaken(username);
    if (userTaken) {
      Alert.alert("Username Taken", "This username is already taken. Please choose another one.");
      return;
    }

    try {
      const success = await sendNewCredentials(name, lastn, email, username, password);

      if (success) {
        Alert.alert("Account created successfully!");
        // Optionally navigate to the login screen or perform other actions
      } else {
        Alert.alert("Error creating account. Please try again.");
      }
    } catch (error) {
      console.error("Error creating account:", error.message);
      Alert.alert("An unexpected error occurred. Please try again.");
    }
  };

  const backlogin = () => {
    navigation.navigate('Login');
  };

  const googlesign = () => {
    Alert.alert("Hola");
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <SafeAreaView style={styles.topContainer}>
          <Image style={styles.minilogo} source={require('../images/logo.png')} />

        </SafeAreaView>
        <SafeAreaView style={styles.squareContainer}>
          <Text style={styles.title}>Create an Account</Text>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={(text) => setname(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Last name"
              value={lastn}
              onChangeText={(text) => setlastn(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setemail(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={(text) => setusername(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setpassword(text)}
              keyboardType="visible-password"
              secureTextEntry
              style={styles.input}
            />
          <TouchableOpacity style={styles.button} onPress={signup}>
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton} onPress={googlesign}>

            <Text style={styles.optionsaccount}>Sign Up with Google</Text>
          </TouchableOpacity>

          <Text onPress={backlogin} style={styles.optionsaccount}>
            Already have an account?
          </Text>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
