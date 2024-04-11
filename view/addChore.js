import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import styles from './styles';
import { sendNewChores } from '../model/database';
import { useUserId } from './userContext';

const AddChoreScreen = ({ navigation }) => {
    const [chore, setChore] = useState('');
    const userId = useUserId();

    const addChore = async () => {
      try {
        const success = await sendNewChores(chore, userId, childID);
      }
      catch (error) {
        console.error("Error creating chore:", error.message);
        Alert.alert("An unexpected error occurred. Please try again.");
      } 
    };
    return (
      <SafeAreaView style={styles.container}>
    
        <TextInput 
        placeholder="Enter Chore" 
        style={styles.input}x 
        value={chore}
        onChangeText={(text) => setChore(text)} 
        />
         
        <TouchableOpacity style={styles.choreButton} onPress={addChore}>
          <Text  style={styles.choreButtonText}> Add Chore </Text>
          </TouchableOpacity>
        </SafeAreaView>
    )
  };

export default AddChoreScreen;
