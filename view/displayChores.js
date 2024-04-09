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
  FlatList
} from 'react-native';
import styles from './styles';
import { getChores } from '../model/database';
import { useUserId } from './userContext';
import { useChildID, useChildName } from './childContext';


const DisplayChoreScreen = ({ navigation}) => {
    const { userId, setUserId } = useUserId();
    const [ choreList, setChoreList ] = useState([]);
    const { childID } = useChildID();
    const { childName } = useChildName();
    displayChores(childID, userId);
    const fetchChores = async () => {
      try {
        const success = await getChores(childID, userId);
        if (success)
        {
          setChoreList(success);
        }
        else {
          console.error('Error getting chores')
        }
      }
      catch (error) {
        console.error("Error displaying chores:", error.message);
        Alert.alert("An unexpected error occurred. Please try again.");
      } 
    };

    const RefreshPage = () => {
      fetchChores();
  }

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
                data={choreList}
                //renderItem={renderItem}
            >
            <Text> test</Text>
        </FlatList>
            <StatusBar style="auto" />
      </SafeAreaView>
    )
  };

export default DisplayChoreScreen;