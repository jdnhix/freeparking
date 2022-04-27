import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import MapModal from "../components/MapModal";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";

const { height, width } = Dimensions.get("window");
const LATITUDE = 36.174465; // Nashville, TN
const LONGITUDE = -86.76796; // Nashville, TN
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

const defTimeArr = [
  {
    days: [true, true, true, true, true, false, false],
    start: new Date("1899-12-31T6:00:00.000Z"),
    end: new Date("1899-12-31T18:00:00.000Z"),
    string: "M-F: 6:00 AM - 6:00 PM",
    idx: 0,
  },
  {
    days: [false, false, false, false, false, true, true],
    start: new Date("1899-12-31T14:00:00.000Z"),
    end: new Date("1899-12-31T17:00:00.000Z"),
    string: "S,U: 0:00 AM - 0:00 AM",
    idx: 1,
  },
];

const markers = [
  {
    latitude: 36.23,
    longitude: -86.71,
    name: "Brentwood??",
    address: "idek lol",
    timeArr: defTimeArr.map((time) => ({ ...time })),
  },
  {
    latitude: 36.09,
    longitude: -86.74,
    name: "Middle of nowhere",
    address: "1818 church st",
    timeArr: defTimeArr.map((time) => ({ ...time })),
  },
  {
    latitude: 36.14645,
    longitude: -86.803482,
    name: "Vanderbilt",
    address: "2301 Vanderbilt Place",
    timeArr: defTimeArr.map((time) => ({ ...time })),
  },
];

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = {
      modalVisible: false,
    };
    this.modalOn = this.setModalVisible.bind(this);
    this.modalOff = this.setModalNotVisible.bind(this);
    this.activeSpot = {};
  }

  setModalVisible(e) {
    this.setState({ modalVisible: true });
  }

  setModalNotVisible(e) {
    this.setState({ modalVisible: false });
  }

  connectTimeStr = (pArr) => {
    let res = "";
    if (pArr.length !== 0) {
      res = pArr[0].string.slice();
      pArr.forEach((time, i) => {
        if (i !== 0) {
          res += "; " + time.string.slice();
        }
      });
    } else {
      res = "No Available Time";
    }
    return res;
  };

  render() {
    return (
      <View style={styles.center}>
        <BlurView intensity={100} style={styles.statusBarBlur} />
        <MapView
          style={styles.map}
          ref={(ref) => {
            this.mapRef = ref;
          }}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            showCompass: false,
            maxZoomLevel: 20,
          }}
        >
          {markers.map((spot, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: spot.latitude,
                longitude: spot.longitude,
              }}
              onPress={() => {
                this.modalOn();
                this.activeSpot = spot;

                let r = {
                  latitude: spot.latitude + 0.001,
                  longitude: spot.longitude + 0.001,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                };

                this.mapRef.animateToRegion(r, 1000);
              }}
            />
          ))}
        </MapView>
        <Modal
          style={styles.modal}
          visible={this.state.modalVisible}
          onBackdropPress={() => {
            this.modalOff();
            this.activeSpot = {};

            let r = {
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            };

            this.mapRef.animateToRegion(r, 750);
          }}
          animationType="fade"
        >
          <MapModal
            name={this.activeSpot.name}
            address={this.activeSpot.address}
            time={this.activeSpot.timeArr}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: width,
    height: height,
    zIndex: -1,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  statusBarBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 40,
  },
});

export default HomeScreen;
