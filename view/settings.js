import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './styles';
import { useUser } from './userContext';

const Settings = ({ navigation }) => {
  const { user } = useUser();

  const accountSettings = () => {
    navigation.navigate('Account');
  };

  const passwordReset = () => {
    navigation.navigate('PasswordReset');
  };
  const support = () =>{
    navigation.navigate('Suport'); 
  }; 
  const notification = () =>{
    navigation.navigate('Notifications'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.title}>Welcome {user.name}</Text>
        <TouchableOpacity style={styles.button} onPress={accountSettings}>
          <Text style={styles.buttonText}> Account Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={passwordReset}>
          <Text style={styles.buttonText}> Password Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={notification}>
          <Text style={styles.buttonText}> Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={support}>
          <Text style={styles.buttonText}> Support</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Settings;
