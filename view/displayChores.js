// displayChores.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getChores } from '../model/database';
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
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chores List</Text>
      <FlatList
        data={chores}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default DisplayChoresScreen;
