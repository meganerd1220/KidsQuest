// KidProfiles.js
import React, { useState, useCallback } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useUser } from './userContext';
import { getChildProfiles, deleteChildProfile } from '../model/database';
import styles from './styles';

const Profile = ({ id, name, onDelete, navigation }) => {
  const goToChores = () => {
    navigation.navigate("addChore", { childID: id });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={goToChores}>
      <Text title={name} color="white">{name}</Text>
      <Button style={styles.buttonDelete} title={"Delete Profile"} onPress={onDelete} color="white" />
    </TouchableOpacity>  
  );
};

const KidProfiles = () => {
  const [childrens, setChildrens] = useState([]);
  const { user } = useUser();
  const [userId, setUserId] = useState(user?.userid ?? '');
  const navigation = useNavigation();

  const fetchProfiles = useCallback(async () => {
    try {
      const KIDS = await getChildProfiles(userId);
      if (KIDS) {
        setChildrens(KIDS);
      } else {
        console.error('Error retrieving data');
      }
    } catch (error) {
      console.error('Error fetching child profiles:', error);
    }
  });

  useFocusEffect(() => {
    fetchProfiles();
  });

  const onDeleteProfile = () => {
    fetchProfiles();
  };

  const renderItem = ({ item }) => (
    <Profile id={item.id} name={item.name} onDelete={onDeleteProfile} navigation={navigation} />
  );

  const goToAddProfile = () => {
    navigation.navigate('AddChildProfile');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={childrens}
        renderItem={renderItem}
      />
      <View>
        <Button onPress={goToAddProfile} title="Add Profile" />
      </View>
      <TouchableOpacity style={styles.btnSettings} onPress={() => navigation.navigate('Settings')}>
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default KidProfiles;
