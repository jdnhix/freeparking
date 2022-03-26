import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Position from 'react-native/Libraries/Components/Touchable/Position';

export default function MapModal(props) {
    return (
        <SafeAreaView>
            <View style={styles.modal}>
                <Text>Helloooo</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modal: {
        width: '70%',
        height: '60%',
        position: 'absolute',
        top: 50,
        left: 50,
        zIndex: 10
        
    }




})