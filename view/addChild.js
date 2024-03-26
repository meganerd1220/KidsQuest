import { sendChildProfile } from '../model/database';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';

const AddChild = ({ navigation}) => {
    const [childName, setChildName] = useState('');
    const [childID, setChildID] = useState('');

    const sendChildProfileToFirebase = async () => {
        try {
            const success = await sendChildProfile(childName, childID);
      
            if (success) {
              Alert.alert("Profile created successfully!");
              // Optionally navigate to the login screen or perform other actions
            } else {
              Alert.alert("Error creating profile. Please try again.");
            }
          } catch (error) {
            console.error("Error creating profile:", error.message);
            Alert.alert("An unexpected error occurred. Please try again.");
          }
    }
    return (
    <View style={styles.container}>
        <TextInput placeholder="Enter Kids Name" style={styles.input} onChangeText={(text) => setChildName(text)} />
        <TextInput placeholder="Enter id" style={styles.input} onChangeText={(text) => setChildID(text)} />
        <Button title="Send"  onPress={sendChildProfileToFirebase} />
        <StatusBar style="auto" />
    </View>
    );
}

export default AddChild;