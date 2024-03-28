import { addDataToFirebase } from '../model/firebaseOperations';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import { sendNewChores } from '../model/database';

const AddChoreScreen = ({ navigation}) => {
    const [chore, setchore] = useState('');
  
    const addChore = async () => {
      try {
        
        if (success) {
          Alert.alert("Chore added successfully!");
          // Optionally navigate to the login screen or perform other actions
        } else {
          Alert.alert("Error adding chore. Please try again.");
        }
      } catch (error) {
        console.error("Error adding chore:", error.message);
        Alert.alert("An unexpected error occurred. Please try again.");
      }
  
    };
    return (
    <View style={styles.container}>
        <TextInput 
        placeholder="Enter Chore" 
        style={styles.input} 
        value={chore}
        onChangeText={(text) => setchore(text)} 
        />
        <Button title="Send"  onPress={sendNewChores(chore)} />
        <StatusBar style="auto" />
    </View>
    );
}

export default addChore;