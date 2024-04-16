import React, { useState, useCallback } from 'react';
import { Alert, Button, FlatList, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useUser } from './userContext';
import { getChildProfiles, deleteChildProfile } from '../model/database';
import styles from './styles';

const Profile = ({ id, name, onDelete, navigation }) => {
  const goToChores = () => {
    navigation.navigate("addChore", { childID: id });
  };

  return (
    <SafeAreaView style={[styles.container, styles.ContainerProfiles]}>
      <TouchableOpacity style={styles.ProfileButton} onPress={goToChores}>
        <Text title={name} color="white">{name}</Text>
        <Button style={styles.buttonText} title={"Delete Profile"} onPress={onDelete} />
      </TouchableOpacity>
    </SafeAreaView>
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
    <Profile id={item.id} name={item.name} onDelete={() => onDeleteProfile(item.id, item.name)} navigation={navigation} />
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
        <FlatList style={[styles.ContainerProfiles, styles.containerFirstProfile]}
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
