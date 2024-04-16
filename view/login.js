import React, { useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './styles';
import { verifyUserCredentials, getUserInfo } from '../model/database';
import { useUser } from './userContext';

const LoginScreen = ({ navigation }) => {
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleVerify = async () => {
    if (!username || !password) {
      Alert.alert("Please enter username and password!");
    } else {
      const isUserValid = await verifyUserCredentials(username, password);
      if (isUserValid) {
        const userData = await getUserInfo(username);
        if (userData) {
          setUser({ ...userData, username }); // Include the username in user data
          navigation.navigate('KidProfiles');
        } else {
          Alert.alert('User data not found.');
        }
      } else {
        Alert.alert('Incorrect Username or Password!\nTry again');
      }
    }
  };

  const forgotPassword = () => {
    navigation.navigate("forgotPassword");
  }

  const signup = () => {
    navigation.navigate('SignUp');
  }

  const signInWithGoogle = async () => {
    // Implement Google sign-in functionality
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Image style={styles.logo} source={require('../images/logo.png')} />
        <Text style={styles.title}>Kids Quest</Text>
        <SafeAreaView style={styles.squareContainer}>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={[styles.input, styles.firstinput]}
              />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              keyboardType="visible-password"
              secureTextEntry
              style={styles.input}
            />
          <TouchableOpacity style={styles.forgotPassword} onPress={forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupText} onPress={signup}>
          <Text style={styles.signupTextContent}>Create new Account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
