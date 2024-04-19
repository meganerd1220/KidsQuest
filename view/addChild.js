import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendChildProfile } from '../model/database';
import { useUser } from './userContext';
import styles from './styles';

const AddChild = () => {
  const [childName, setChildName] = useState('');
  const { user } = useUser();
  const [userId, setUserId] = useState(user?.userid ?? '');
  const navigation = useNavigation();

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

  const addProfilePicture = async () => {
    Alert.alert("Add Profile Picture");
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={[styles.topContainer, styles.topContainerProfiles]}>
        <Text style={styles.titleParent}>Welcome {user.name}</Text>
        <Image style={styles.minilogo} source={require('../images/logo.png')} />
      </SafeAreaView>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.squareContainer}>
          <Text style={styles.title2}>ADD PROFILE</Text>
          <View style={styles.roundImage}>
            <Image style={styles.roundImage} source={require('../images/profile.jpg')} />
          </View>
          <TouchableOpacity style={styles.profilePicButton} onPress={addProfilePicture}>
            <Text style={styles.profilePicButton}>Add Profile Picture</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Enter Kids Name"
            style={styles.input}
            onChangeText={(text) => setChildName(text)}
          />
          <View style={{ height: 50 }} />
          <TouchableOpacity style={[styles.settingsButton, styles.addFormat]} onPress={sendChildProfileToFirebase}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddChild;
