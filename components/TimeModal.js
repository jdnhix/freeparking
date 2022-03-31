import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, useEffect } from 'react-native';
import { COLORS } from "../components/Colors";


export default function TimeModal(props) {
    return (
        <Modal style={styles.modal}>
            <Text>HI</Text>



        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        width: 300,
        height: 320,
        backgroundColor: 'white',
        position: 'absolute',
        top: "15%",
        borderRadius: 20,
        flex: 1,
        padding: 25,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    
    }
})