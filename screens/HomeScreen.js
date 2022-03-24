import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlightBase } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import MapModal from '../components/MapModal';
import Modal from 'react-native-modal';

const { height, width } = Dimensions.get( 'window' );
const LATITUDE = 36.174465; // Nashville, TN
const LONGITUDE = -86.767960; // Nashville, TN
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);


const markers = [
    {
        latitude: 36.23,
        longitude: -86.71,
        name: "Brentwood??",
        address: "idek lol"
    },
    {
        latitude: 36.09,
        longitude: -86.74,
        name: "Middle of nowhere",
        address: "1818 church st"
    },
    {
        latitude: 36.146450,
        longitude: -86.803482,
        name: "Vanderbilt",
        address: "2301 Vanderbilt Place"
    },
]


class HomeScreen extends React.Component {

    constructor(props){
        super(props)
        this.mapRef = null
        this.state = {
            modalVisible: false
        }
        this.modalOn = this.setModalVisible.bind(this)
        this.modalOff = this.setModalNotVisible.bind(this)
        this.activeSpot = {}
    }

    setModalVisible(e) {
        this.setState({modalVisible: true})
    }

    setModalNotVisible(e) {
        this.setState({modalVisible: false})
    }

    render() {
        return (
            <View style={styles.center}>
                <MapView style={styles.map}
                    ref = {(ref) => {this.mapRef = ref}}
                    initialRegion = {{
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
                            onPress={ () => {
                                this.modalOn()
                                this.activeSpot = spot

                                let r = {
                                    latitude: spot.latitude + .001,
                                    longitude: spot.longitude + .001,
                                    latitudeDelta: .005,
                                    longitudeDelta: .005
                                }

                                this.mapRef.animateToRegion(r, 1000)
                        
                            }}
                        />
                    ))}
                </MapView> 
                <Modal
                    style={styles.modal}
                    visible={this.state.modalVisible}
                    onBackdropPress= {() => {
                        this.modalOff()
                        this.activeSpot = {}

                        let r = {
                            latitude: LATITUDE,
                            longitude: LONGITUDE,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA
                        }

                        this.mapRef.animateToRegion(r, 750) 
                    }}
                    animationType='fade'
                >
                    <MapModal name={this.activeSpot.name} address={this.activeSpot.address}/>
                </Modal>
             </View>
        );
    }



}

// export default function HomeScreen() {

//     const [modalVisible, setModalVisible] = React.useState(false)
//     const mapRef = React.useRef(null)


//     return (
//         <View style={styles.center}>
//             <MapView style={styles.map}
//                 ref = {mapRef}
//                 initialRegion = {{
//                     latitude: LATITUDE,
//                     longitude: LONGITUDE,
//                     latitudeDelta: LATITUDE_DELTA,
//                     longitudeDelta: LONGITUDE_DELTA,
//                     showCompass: false,
//                     maxZoomLevel: 20
//                 }}
//             >
//                 {markers.map((spot, index) => (
//                     <Marker
//                         key={index}
//                         coordinate={{latitude: spot.latitude, longitude: spot.longitude}}
//                         onPress={ () => {
//                             console.log(`marker ${spot.name} pressed`)
//                             setModalVisible(true)
//                             mapRef.fitToSuppliedMarkers(spot)
                        
//                         }}
//                     />
//                 ))}
//             </MapView> 
//             <Modal
//                 style={styles.modal}
//                 visible={modalVisible}
//                 onBackdropPress= {() => setModalVisible(false)}
//                 animationType='fade'
//             >
//                 <MapModal/>
//             </Modal>
//          </View>
//     );
// }

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        width: width,
        height: height,
        zIndex: -1
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    }


});


export default HomeScreen;
