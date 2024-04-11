import { addDataToFirebase } from '../model/firebaseOperations';
import React, { useEffect, useState, useCallback  } from 'react';
import { useFocusEffect, Navigation} from '@react-navigation/native';
import { StyleSheet, Text, Alert, TextInput, View, Button, ScrollView, Touchable, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import { getChildProfiles, deleteChildProfile } from '../model/database';
import { useRoute } from '@react-navigation/native';
import { useUser } from './userContext';

    const Profile = ({ id, name, onDelete, onProfilePress, navigation}) => {
        const Delete = () => {
          Alert.alert(`Profile ID: ${id}`, `Name: ${name}`);
          deleteChildProfile(id, name).then(() => {
            onDelete();
          });
        };

        const goToChores = () => {
            navigation.navigate("addChore"); 
        };
        
        return (
          <TouchableOpacity style={styles.button} onPress={goToChores}>
            <Text  title={name} color="white" >{name}</Text>
            <Button style={styles.buttonDelete} title={"Delete Profile"} onPress={Delete} color="white" />
          </TouchableOpacity>  
        );
      };

    const KidProfiles = ({ navigation }) => {
        const [name, setName] = useState([]);
        const [childrens, setChildrens] = useState([]);
        const { user, setUser } = useUser();
        const [userId, setUserId] = useState(user?.userid ?? '');


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

        const RefreshPage = () => {
            fetchProfiles();
        }

        useFocusEffect(() => {
            fetchProfiles();
        });

        const renderItem = ({ item }) => (
            <Profile id={item.id} name={item.name} onDelete={RefreshPage} onProfilePress={goToChores} navigation={navigation} />
        );
        

        const goToAddProfile = () => {
            navigation.navigate('AddChildProfile');
        };

        const goToChores = () => {
            navigation.navigate('DisplayChores');
        };

        return (
        <View style={styles.container}>
            <FlatList
                data={childrens}
                renderItem={renderItem}
            />
            <StatusBar style="auto" />
            <View>
                <Button onPress={goToAddProfile} title="Add Profile" />
            </View>
            <TouchableHighlight style={styles.btnSettings} onPress={() => navigation.navigate('Settings')}>
                <Text>Settings</Text>
            </TouchableHighlight>
        </View>
        );
    }


export default KidProfiles;