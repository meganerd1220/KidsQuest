import React, { Component } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { auth } from '../model/firebase';
import styles from './styles';


class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleResetPassword = () => {
    const { email } = this.state;
    auth.sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent successfully
        Alert.alert('Password Reset Email Sent', 'Please check your email to reset your password.');
      })
      .catch((error) => {
        // Handle errors here
        Alert.alert('Error', error.message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button title="Reset Password" onPress={this.handleResetPassword} />
      </View>
    );
  }
}

export default ForgotPassword;
