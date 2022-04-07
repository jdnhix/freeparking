import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, useEffect } from 'react-native';
import Position from 'react-native/Libraries/Components/Touchable/Position';
import { COLORS } from "../components/Colors";
import { createOpenLink } from "react-native-open-maps";
import { shadow } from 'react-native-paper';

export default function MapModal(props) {
    const toRoute = createOpenLink({ query: props.address });

    //TODO ADD A SHADOW TO THIS
    return (
        <View style={styles.modal}> 
            <Text style={styles.spotNameText}>{props.name}</Text>
            <Text style={styles.freeParkingText}>Free Parking</Text>

            <Text style={styles.timeText}>{props.address}</Text>
            
            {/* todo eventually add in text saying if the spot is currently available or not */}


            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.routeButton}
                onPressOut={toRoute}
            >
                <Text style={styles.btnText}>Route</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.editButton}
            >
                <Text style={styles.btnText}>Edit</Text>
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
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    
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
    },
    timeText:{
        fontSize: 20,
        top: "20%"

    },
    routeButton: {
        backgroundColor: COLORS.green_theme,
        width: 80,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "93%",
        left: "20%"
    },
    editButton: {
        backgroundColor: COLORS.green_theme,
        width: 80,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        top: "93%",
        left: "65%"
    },
    btnText: {
    fontSize: 18,
    color: "white",
    },
})