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
        width: 340,
        height: 250,
        backgroundColor: 'white',
        position: 'absolute',
        top: "25%",
        borderRadius: 20,
        flex: 1,
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center',

    }
})