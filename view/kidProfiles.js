import { addDataToFirebase } from '../model/firebaseOperations';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, Alert, TextInput, View, Button, ScrollView, Touchable, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import { getChildProfiles } from '../model/database';
import { useRoute } from '@react-navigation/native';
import { useUserId } from './userContext';

const KidProfiles = ({ navigation}) => {
    const [childrens, setChildrens] = useState([]);
    const { userId, setUserId } = useUserId();


    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
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
            };

            fetchData();
        
        }, [])
    );
    

    const goToChores = async () => {
        Alert.alert(userid);
    }

    const goToAddProfile = async () => {
        navigation.navigate('AddChildProfile');
    }

    return (
    <View style={styles.container}>
        <FlatList
            data={childrens}
            renderItem={({item}) => (
                <TouchableOpacity>
                    <Text onPress={goToChores} style={styles.button}> {item.name} </Text>
                </TouchableOpacity>
            )}
        />
        <StatusBar style="auto" />
        <Text onPress={goToAddProfile} style={styles.optionsaccount}> Add Profile </Text>
    </View>
    );
}

export default KidProfiles;