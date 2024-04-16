import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
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
  // const notification = () =>{
  //   navigation.navigate('Notifications'); 
  // };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={[styles.topContainer, styles.topContainerProfiles]}>
      <Text style={styles.titleParent}>Welcome {user.name}</Text>
        <Image style={styles.minilogo} source={require('../images/logo.png')} />
      </SafeAreaView >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.squareContainer}>
          <SafeAreaView styles= {styles.squareContainer}>
        <Text style={styles.title}>SETTINGS</Text>

        <TouchableOpacity style={styles.button} onPress={accountSettings}>
          <Text style={styles.buttonText}> Account Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={passwordReset}>
          <Text style={styles.buttonText}> Password Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={support}>
          <Text style={styles.buttonText}> Support</Text>
        </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Settings;