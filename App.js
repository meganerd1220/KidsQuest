import React, { useEffect, useState } from 'react';
import AddChild from './view/addChild';
import AddChoreScreen from './view/addChore';
import SignUpScreen from './view/signup';
import LoginScreen from './view/login';
import SettingsScreen from './view/settings';
import DisplayChoreScreen from './view/displayChores';
import AccountScreen from './view/account';
import KidProfiles from './view/kidProfiles';
import PasswordReset from './view/passwordReset';
import SupportScreen from './view/support';
import ForgotPassword from './view/forgotPassword';
import NotificationsScreen from './view/notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './view/userContext';


const Stack = createStackNavigator();

function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="KidProfiles" component={KidProfiles} options={{ headerShown: false }} />
          <Stack.Screen name="DisplayChores" component={DisplayChoreScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddChores" component={AddChoreScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddChildProfile" component={AddChild} options={{headerShown:false}}/>
          <Stack.Screen name="addChore" component={AddChoreScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PasswordReset" component={PasswordReset} options={{ headerShown: false }} />
          <Stack.Screen name="forgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="Suport" component={SupportScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  )
}



export default App;
