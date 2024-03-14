import { addDataToFirebase } from '../model/firebaseOperations';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';

const addChild = ({ navigation}) => {
    const [textInputValue1, setTextInputValue1] = useState('');
    const childNameChangeText = (text) => {
    setTextInputValue1(text);
    };
    function sendChildName(){
    addDataToFirebase(textInputValue1)
    }
    return (
    <View style={styles.container}>
        <TextInput placeholder="Enter Kids Name" style={styles.input} onChangeText={childNameChangeText} />
        <Button title="Send"  onPress={sendChildName} />
        <StatusBar style="auto" />
    </View>
    );
}

export default addChild;