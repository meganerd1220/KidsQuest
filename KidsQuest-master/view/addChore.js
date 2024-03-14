import { addDataToFirebase } from '../model/firebaseOperations';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';

const addChore = ({ navigation}) => {
    const [chore, setChore] = useState('');
    const choreChangeText = (text) => {
    setChore(text);
    };
    function sendChore(){
    addDataToFirebase(chore)
    }
    return (
    <View style={styles.container}>
        <TextInput placeholder="Enter Chore" style={styles.input} onChangeText={choreChangeText} />
        <Button title="Send"  onPress={sendChore} />
        <StatusBar style="auto" />
    </View>
    );
}

export default addChore;