import React, { useState } from 'react';
import {
    SafeAreaView, Text, TouchableOpacity, TextInput, Alert, Image,
    KeyboardAvoidingView, Platform
} from 'react-native';
import styles from './styles';
import { updatePassword, verifyUserCredentials } from '../model/database'; 
import { useUser } from './userContext';

const PasswordReset = ({ navigation }) => {
    const { user } = useUser();
    
    console.log('User:', user);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Function to handle password update
    const handlePasswordUpdate = async () => {
        if (newPassword !== confirmNewPassword) {
            Alert.alert("Error", "New passwords do not match.");
            return;
        }

        // Verify old password
        const credentialsValid = await verifyUserCredentials(user.username, oldPassword);
        if (!credentialsValid) {
            Alert.alert("Error", "Old password is incorrect.");
            return;
        }

        const updatedFields = {
            username: user.username,
            password: newPassword,
        };

        const success = await updatePassword(user.userid, updatedFields);

        if (success) {
            Alert.alert("Success", "Password updated successfully.");
            navigation.navigate('Settings'); 
        } else {
            Alert.alert("Password Changed Sucessfully");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <Text style={styles.title}>Kids Quest</Text>
                <TextInput
                    placeholder="Username"
                    value={user?.username}
                    editable={false} 
                    style={styles.input}
                />
                <TextInput
                    placeholder="Old Password"
                    value={oldPassword}
                    onChangeText={(text) => setOldPassword(text)}
                    keyboardType="visible-password"
                    secureTextEntry
                    style={styles.input}
                />
                <TextInput
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                    keyboardType="visible-password"
                    secureTextEntry
                    style={styles.input}
                />
                <TextInput
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChangeText={(text) => setConfirmNewPassword(text)}
                    keyboardType="visible-password"
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={handlePasswordUpdate}>
                    <Text style={styles.buttonText}>Update Password</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default PasswordReset;