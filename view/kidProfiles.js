import React, { useState, useCallback } from 'react';
import { View, Alert, Button, FlatList, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useUser } from './userContext';
import { getChildProfiles, deleteChildProfile, getChores } from '../model/database'; // Import getChores function
import styles from './styles';

const Profile = ({ id, name, onDelete, navigation, choresCount }) => { // Pass choresCount as prop
  const goToChores = () => {
    navigation.navigate("addChore", { childID: id });
  };

  return (
    <TouchableOpacity style={styles.ProfileButton} onPress={goToChores}>
      <View style={styles.rowContainer}>
        <View style={styles.imageColumn}>
          <Image source={require('../images/kid.png')} style={styles.kidsProfileImage} />
        </View>
        <View style={styles.textButtonColumn}>
          <Text title={name} color="white" style={styles.nameText}>{name}</Text>
          <Text style={styles.choreCount}>Chores: {choresCount}</Text> 
          <View style={{height:50}}/>
          <TouchableOpacity style={styles.settingsButton} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
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
        const kidsWithChoresCount = await Promise.all(KIDS.map(async (kid) => {
          const chores = await getChores(kid.id, userId);
          return { ...kid, choresCount: chores.length };
        }));
        setChildrens(kidsWithChoresCount);
      } else {
        console.error('Error retrieving data');
      }
    } catch (error) {
      console.error('Error fetching child profiles:', error);
    }
  }, [userId]);

  useFocusEffect(() => {
    fetchProfiles();
  });

  const onDeleteProfile = async (id, name) => {
    try {
      await deleteChildProfile(id, name);
      fetchProfiles();
      Alert.alert('Success', 'Child profile deleted successfully.');
    } catch (error) {
      console.error('Error deleting child profile:', error);
    }
  };

  const renderItem = ({ item }) => (
    <Profile
      id={item.id}
      name={item.name}
      onDelete={() => onDeleteProfile(item.id, item.name)}
      navigation={navigation}
      choresCount={item.choresCount} // Pass chores count as prop
    />
  );

  const goToAddProfile = () => {
    navigation.navigate('AddChildProfile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={[styles.topContainer, styles.topContainerProfiles]}>
        <Text style={styles.titleParent}>Welcome {user.name}</Text>
        <Image style={styles.minilogo} source={require('../images/logo.png')} />
      </SafeAreaView >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={[styles.settingsButton, styles.settingsFormat]} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <FlatList
          style={[styles.ContainerProfiles, styles.containerFirstProfile]}
          data={childrens}
          renderItem={renderItem}
        />
        <TouchableOpacity style={[styles.settingsButton, styles.addFormat]} onPress={goToAddProfile}>
          <Text style={styles.buttonText}>Add Profile +</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default KidProfiles;
