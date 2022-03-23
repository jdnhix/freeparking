import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import MapModal from '../components/MapModal';

const { height, width } = Dimensions.get( 'window' );
const LATITUDE = 36.174465; // Nashville, TN
const LONGITUDE = -86.767960; // Nashville, TN
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);


const markers = [
    {
        latitude: 36.174465,
        longitude: -86.767960,
        name: "test"
    },
    {
        latitude: 36.12,
        longitude: -86.763,
        name: "test2"
    },
    {
        latitude: 36.23,
        longitude: -86.71,
        name: "test3"
    },
    {
        latitude: 36.09,
        longitude: -86.74,
        name: "test"
    }
]


export default function HomeScreen() {
    return (
        <View style={styles.center}>
            <MapView style={styles.map}
                region = {{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    showCompass: false,
                    maxZoomLevel: 20
                }}
            >
                {markers.map((spot, index) => (
                    <Marker
                        key={index}
                        coordinate={{latitude: spot.latitude, longitude: spot.longitude}}
                        onPress={ () => {console.log(`marker ${spot.name} pressed`)}}
                    />
                ))}
            </MapView> 
            <View style={{zIndex: 10, position: 'absolute'}}>
                <MapModal/>
            </View>
            
         </View>
    );
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        width: width,
        height: height,
        zIndex: -1
    }

});
