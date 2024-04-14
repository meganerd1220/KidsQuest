// AddChoreScreen.js

import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { sendNewChores } from '../model/database';
import { useUserId } from './userContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from './styles';

const AddChoreScreen = () => {
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
      <TextInput
        placeholder="Enter Chore"
        style={styles.input}
        value={chore}
        onChangeText={(text) => setChore(text)}
      />
      <TouchableOpacity style={styles.choreButton} onPress={addChore}>
        <Text style={styles.choreButtonText}> Add Chore </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.choreButton} onPress={displayChores}>
        <Text style={styles.choreButtonText}> See Chores </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddChoreScreen;
