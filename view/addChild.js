import { sendChildProfile } from '../model/database';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, View, Button, ScrollView, Alert } from 'react-native';
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
  }
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={[styles.topContainer, styles.topContainerProfiles]}>
        <Text style={styles.titleParent}>Welcome {user.name}</Text>
        <Image style={styles.minilogo} source={require('../images/logo.png')} />
      </SafeAreaView >
      <View style={styles.squareContainer}>
      <Image style={styles.minilogo} source={require('../images/logo.png')} />
        <TextInput placeholder="Enter Kids Name" style={styles.input} onChangeText={(text) => setChildName(text)} />
        <Button title="Send" style ={styles.ProfileButton} onPress={sendChildProfileToFirebase} />
        <StatusBar style="auto" />
      </View>

    </SafeAreaView>

  );
}

export default AddChild;