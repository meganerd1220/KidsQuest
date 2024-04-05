import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, Alert, View, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import { getChildProfiles } from '../model/database';
import { useUser } from './userContext';

const KidProfiles = ({ navigation }) => {
    const [childrens, setChildrens] = useState([]);
    const { user } = useUser();
    const { userid } = user;

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const KIDS = await getChildProfiles(userid);
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

        }, [userid])
    );

    const goToChores = async () => {
        Alert.alert(userid);
    }

    const goToAddProfile = () => {
        navigation.navigate('AddChildProfile');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
                <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
            <FlatList
                data={childrens}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={goToChores}>
                        <Text style={styles.button}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <StatusBar style="auto" />
            <Text onPress={goToAddProfile} style={styles.optionsaccount}> Add Profile </Text>
        </View>
    );
}

export default KidProfiles;
