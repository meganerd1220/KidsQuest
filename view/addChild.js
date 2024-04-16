import { sendChildProfile } from '../model/database';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, SafeAreaView, StyleSheet, Text, TextInput, View, Button, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useUser } from './userContext';
import styles from './styles';

const AddChild = ({ navigation }) => {
  const [childName, setChildName] = useState('');
  const { user, setUser } = useUser();
  const [userId, setUserId] = useState(user?.userid ?? '');

  const sendChildProfileToFirebase = async () => {
    try {
      const success = await sendChildProfile(childName, userId);

      if (success) {
        Alert.alert("Profile created successfully!");
        navigation.navigate('KidProfiles');
      } else {
        Alert.alert("Error creating profile. Please try again.");
      }
    } catch (error) {
      console.error("Error creating profile:", error.message);
      Alert.alert("An unexpected error occurred. Please try again.");
    }
  };
  const addProfilePicture = async() =>{
    Alert.alert("Add Profile Picture"); 
  }; 
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={[styles.topContainer, styles.topContainerProfiles]}>
        <Text style={styles.titleParent}>Welcome {user.name}</Text>
        <Image style={styles.minilogo} source={require('../images/logo.png')} />
      </SafeAreaView >
      <View style={styles.squareContainer}>
      <Text style={styles.title}>ADD PROFILE</Text>

        <View style={styles.roundImage}>
          <Image style={ styles.roundImage } source={require('../images/profile.jpg')} />
        </View>
        <TouchableOpacity style={styles.profilePicButton} onPress={addProfilePicture}>
          <Text style={styles.profilePicButton}>Add Profile Picture</Text>
        </TouchableOpacity>
        <TextInput placeholder="Enter Kids Name" style={styles.input} onChangeText={(text) => setChildName(text)} />
        <View style={{ height: 50 }} /> 
        <TouchableOpacity style={[styles.settingsButton, styles.addFormat]} onPress={sendChildProfileToFirebase}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>

    </SafeAreaView>

  );
}

export default AddChild;