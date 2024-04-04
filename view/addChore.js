import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';
import { sendNewChores } from '../model/database';
import { useUserId } from './userContext';

const AddChoreScreen = ({ navigation}) => {
    const [chore, setchore] = useState('');
    const { userId, setUserId } = useUserId();
    const addChore = async () => {
      try {
        const success = await sendNewChores(chore, userId);
      }
      catch (error) {
        console.error("Error creating account:", error.message);
        Alert.alert("An unexpected error occurred. Please try again.");
      } 
    };
    return (
      <SafeAreaView style={styles.container}>
    
        <TextInput 
        placeholder="Enter Chore" 
        style={styles.input} 
        value={chore}
        onChangeText={(text) => setchore(text)} 
        />
         
        <TouchableOpacity style={styles.choreButton} onPress={addChore}>
          <Text  style={styles.choreButtonText}> Add Chore </Text>
          </TouchableOpacity>
        </SafeAreaView>
    )
  };

export default AddChoreScreen;