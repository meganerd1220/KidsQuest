import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getChores, deleteChore } from '../model/database'; // Import deleteChore function
import { useUser } from './userContext';
import { useRoute } from '@react-navigation/native';
import styles from './styles';

const DisplayChoresScreen = () => {
  const { user } = useUser();
  const userId = user.userid;
  const route = useRoute();
  const childID = route.params?.childID;
  const [chores, setChores] = useState([]);

  useEffect(() => {
    fetchChores();
  }, []);

  const fetchChores = async () => {
    try {
      const choresData = await getChores(childID, userId);
      setChores(choresData);
    } catch (error) {
      console.error('Error fetching chores:', error);
    }
  };

  const renderItem = ({ item }) => (
    <SafeAreaView style={styles.choreItem}>
      <Text style={styles.choreText}>{item}</Text>
      <TouchableOpacity onPress={() => handleDeleteChore(item)}>
        <Text style={styles.settingsButton}>Delete</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  const handleDeleteChore = async (chore) => {
    try {
      await deleteChore(userId, childID, chore);
      fetchChores();
      Alert.alert('Chore deleted successfully!');
    } catch (error) {
      console.error('Error deleting chore:', error);
      Alert.alert('An unexpected error occurred while deleting the chore. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={[styles.topContainer, styles.topContainerProfiles]}>
        <Text style={styles.titleParent}>Welcome {user.name}</Text>
        <Image style={styles.minilogo} source={require('../images/logo.png')} />
      </SafeAreaView >
      <SafeAreaView style={styles.squareContainer}>
        <Text style={styles.title}>Chores List</Text>
        <FlatList
          data={chores}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default DisplayChoresScreen;
