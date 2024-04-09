import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Modal, View } from 'react-native';
import styles from './styles';

const NotificationsScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [notification, setNotification] = useState('');

    const handleNotification = (kidName) => {
        setNotification(`${kidName} has finished a task!`);
        setModalVisible(true);
    };

    const handleMarkComplete = () => {
        setModalVisible(false);
    };

    const handleMarkIncomplete = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleNotification('Kid 1')}>
                <Text style={styles.buttonText}>Kid 1 has finished a task</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{notification}</Text>
                        <Text >Description of the Task</Text>
                        <View style={styles.buttonContainer}>
                            
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: 'lightgreen' }]}
                                onPress={handleMarkComplete}
                            >
                            <Text style={styles.modalButtonText}>Mark as Complete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: 'lightpink' }]}
                                onPress={handleMarkIncomplete}
                            >
                                <Text style={styles.modalButtonText}>Mark as Incomplete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default NotificationsScreen;