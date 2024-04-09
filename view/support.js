import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './styles';
import { sendEmail } from './send-email'; // Import the sendEmail function

const SupportScreen = ({ navigation }) => {
    const [description, setDescription] = useState('');

    const sendEmailHandler = async () => {
        if(!description)
        {
            alert("Please write your problem"); 
        }
        else {
            try {
                // Set recipient email to fixed value
                const toEmail = 'robinhrdz@gmail.com';
        
                // Call sendEmail function with fixed recipient and user input for 'From' field
                await sendEmail(toEmail, 'Support Request', `${description}`);
                Alert.alert('Email Sent', 'Your support request has been sent successfully.');
            } catch (error) {
                Alert.alert('Error', 'Failed to send the email. Please try again later.');
            }
        };

        }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <Text style={styles.title}>Support and Questions</Text>
                <TextInput
                    placeholder="Description of Problem"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={6}
                    style={[styles.input, styles.descriptionInput]}
                />

                <TouchableOpacity style={styles.button} onPress={sendEmailHandler}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SupportScreen;