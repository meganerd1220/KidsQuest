import React from 'react';
import {
    SafeAreaView, Text, TouchableOpacity, Alert,
    KeyboardAvoidingView, Platform
} from 'react-native';
import styles from './styles';


const Settings = ({ navigation, route }) => {
    const { params } = route;
    const { name, lastname, email, username, userid } = params ?? {};
    console.log("Received params in Settings:", params);

    const accountSettings = () => {
        navigation.navigate('Account', { 
            name: name,
            lastname: lastname,
            email: email,
            username: username,
            userid: userid
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.title}>Welcome </Text>
                <TouchableOpacity style={styles.button} onPress={accountSettings}>
                    <Text style={styles.buttonText}> Account Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Notifications")}>
                    <Text style={styles.buttonText}> Password Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Notifications")}>
                    <Text style={styles.buttonText}> Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Support")}>
                    <Text style={styles.buttonText}> Support</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Settings;
