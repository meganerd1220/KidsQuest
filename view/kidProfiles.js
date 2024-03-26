import { addDataToFirebase } from '../model/firebaseOperations';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Alert, TextInput, View, Button, ScrollView, Touchable, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import { getChildProfiles } from '../model/database';
import { useRoute } from '@react-navigation/native';

const KidProfiles = ({ navigation}) => {
    const [childrens, setChildrens] = useState([]);
    const route = useRoute()
    const username = route.params?.UserName

    useEffect(() => {
        const fetchData = async () => {
            try {
                const KIDS = await getChildProfiles(username);
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
    }, []);

    const goToChores = async () => {
        Alert.alert(username);
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
    </View>
    );
}

export default KidProfiles;