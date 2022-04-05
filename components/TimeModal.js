import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, useEffect } from 'react-native';
import { COLORS } from "../components/Colors";


export default function TimeModal(props) {
    return (
        <View style={styles.modal}>
            <Text>HIIIiiiii</Text>



        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        width: 300,
        height: 300,
        backgroundColor: 'red',
        position: 'absolute',
        top: "15%",
        left: "20%",
        borderRadius: 20,
        flex: 1,
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'

    }
})