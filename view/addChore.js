import React, { useState } from 'react';
import { View, Image, SafeAreaView, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { sendNewChores } from '../model/database';
import { useUserId } from './userContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from './styles';
import { useUser } from './userContext';


const AddChoreScreen = () => {
  const { user } = useUser();

  const route = useRoute();
  const childID = route.params?.childID;
  const [chore, setChore] = useState('');
  const userId = useUserId();
  const navigation = useNavigation();

  const displayChores = () => {
    navigation.navigate('DisplayChores', { childID: childID });
  };

  const addChore = async () => {
    try {
      const success = await sendNewChores(chore, userId, childID);
      if (success) {
        Alert.alert("Chore added successfully!");
      };
    } catch (error) {
      console.error("Error adding chore:", error.message);
      Alert.alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={[styles.topContainer, styles.topContainerProfiles]}>
        <Text style={styles.titleParent}>Welcome {user.name}</Text>
        <Image style={styles.minilogo} source={require('../images/logo.png')} />
      </SafeAreaView >
      <SafeAreaView style={styles.squareContainer}>
      <View style={{ height: 50 }} /> 

      <Image style={styles.minilogo} source={require('../images/logo.png')} />

      <TextInput
        placeholder="Enter Chore"
        style={styles.input}
        value={chore}
        onChangeText={(text) => setChore(text)}
      />
      <TouchableOpacity style={[styles.settingsButton, styles.choreButton]} onPress={addChore}>
        <Text style={styles.buttonText}> Add Chore </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.settingsButton, styles.choreButton]} onPress={displayChores}>
        <Text style={styles.buttonText}> See Chores </Text>
      </TouchableOpacity>

      </SafeAreaView>

    </SafeAreaView>
  );
};

export default AddChoreScreen;
