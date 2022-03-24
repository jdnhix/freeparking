import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import Position from 'react-native/Libraries/Components/Touchable/Position';
import { COLORS } from "../components/Colors";
import { createOpenLink } from "react-native-open-maps";

export default function MapModal(props) {

    const toRoute = createOpenLink({ query: props.address });

    return (
        <View style={styles.modal}>
            <Text style={styles.spotNameText}>Spot Name</Text>
            <Text style={styles.freeParkingText}>Free Parking</Text>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPressOut={toRoute}
            >
                <Text style={styles.btnText}>Route</Text>
            </TouchableOpacity>

            
        </View>
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
    },
    spotNameText: {
        fontWeight: 'bold',
        fontSize: 30,
        top: '5%',
        color: COLORS.green_theme
    },
    freeParkingText: {
        textDecorationLine: 'underline',
        color: COLORS.green_theme,
        fontSize: 22,
        top: '15%'
    }





})