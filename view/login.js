import React, { useState } from 'react';
import {
  SafeAreaView, Text, TouchableOpacity, TextInput, Alert, Image,
  KeyboardAvoidingView, Platform
} from 'react-native';
import styles from './styles';
import { verifyUserCredentials, getUserInfo } from '../model/database';
import { useUserId } from './userContext';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { userId, setUserId } = useUserId();

  const handleVerify = async () => {
    if (!username || !password) {
      Alert.alert("Please enter username and password!");
    } else {
      const isUserValid = await verifyUserCredentials(username, password);
      if (isUserValid) {
        const userData = await getUserInfo(username);
        setUserId(userData.userid);
        if (userData) {
          navigation.reset({
            index: 0,
            routes: [{
              name: 'KidProfiles',
              params: {
                name: userData.name,
                lastname: userData.lastn,
                email: userData.email,
                username: username,
                userid: userData.userid,
              }
            }],
          });
        } else {
          Alert.alert('User data not found.');
        }
      } else {
        Alert.alert('Incorrect Username or Password!\nTry again');
      }
    }
  };

  const signup = () => {
    navigation.navigate('SignUp');
  };

  const forgotPassword = () => {
    Alert.alert("Forgot Password?");
  }

  const signInWithGoogle = async () => {
    // Implement Google sign-in functionality
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Text style={styles.title}>Kids Quest</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          keyboardType="visible-password"
          secureTextEntry
          style={styles.input}
        />
        <Text onPress={forgotPassword} style={styles.optionsaccount}>
          Forgot Password?
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
          <Image
            source={{ uri: 'https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png' }}
            style={styles.googleIcon}
          />
          <Text style={styles.optionsaccount}>Sign in with Google</Text>
        </TouchableOpacity>
        <Text onPress={signup} style={styles.optionsaccount}>
          Don't have an account?
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;