import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../components/Colors";
import { useForm, Controller } from "react-hook-form";
import * as Location from "expo-location";
import TimeModal from "../components/TimeModal";
import Modal from "react-native-modal";
import { LogBox } from "react-native";
import apiKey from "../components/Key";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

// Display the time availability (does not contain any actual
// code to edit the spot and stuff. That is in the EditSpotScreen)
function AvailDisplay(props) {
  const onEdit = () => {
    props.editTime(props.arrIdx);
  };

  const onDelete = () => {
    props.removeTime(props.arrIdx);
  };

  return (
    <View style={styles.avilContainer}>
      <Text style={[styles.avilText, { flex: 4 }]}>{props.text}</Text>
      <TouchableOpacity style={{ flex: 1 }} onPressOut={onEdit}>
        <Text style={styles.avilBtnText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1 }} onPress={onDelete}>
        <View>
          <Entypo name="cross" size={24} color={COLORS.green_theme} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function EditSpotScreen({ route, navigation }) {
  // This is to pass into the time modal
  // Represents an empty state (when adding a new time)
  // When editing an existing time, the existing data will replace
  // this emptyModal
  const emptyModal = {
    days: new Array(7).fill(false),
    start: new Date(0, 0, 0),
    end: new Date(0, 0, 0),
  };

  // Array of objects representing different time slots
  const [timeArr, setTimeArr] = useState(
    route.params?.origSpot
      ? route.params.origSpot.timeArr.map((t) => ({ ...t }))
      : []
  );

  // Toggle to set modal visible or not
  const [modalVisible, setModalVisible] = useState(false);

  // idx of which time spot is being edited
  // -1 means a new time availability is being added
  const [editIdx, setEditIdx] = useState(-1);

  // The data passed to the TimeModal
  // Will be emptyModal when adding a new time slot
  // Will be the pre-existing data when editing an existing time slot
  const [modalInit, setModalInit] = useState({ ...emptyModal });

  // Close the time modal
  const closeModal = () => {
    setModalVisible(false);
    setEditIdx(-1);
  };

  // A temporary hack to assign unique IDs in the map function
  // Can be replaced with object _id when the backend is connected
  const generateID = (time, i) => {
    return `${time.start.toString()}_${new Date().getTime()}_${i}`;
  };

  // Status indicating whether geolocation failed or not
  const [failedGeolocation, setFailedGeolocation] = React.useState(false);

  // Go back to the saved spots page.
  // Going to "Tabs" not "Saved" since it will be without the bottom bar
  const toSaved = () => {
    navigation.navigate("Tabs", {
      screen: "Saved",
    });
  };

  const toCamera = () => {
    console.log("Bring out camera");
  };

  // Needed syntax for react-hook-form
  // The form only takes care of the title and location input
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: route.params?.origSpot ? route.params.origSpot.title : "",
      address: route.params?.origSpot ? route.params.origSpot.address : "",
    },
  });

  // When the "Save" button is clicked
  const onSubmit = (data) => {
    // Editing spot
    if (route.params?.origSpot) {
      navigation.navigate("Tabs", {
        screen: "Saved",
        params: {
          editSpot: {
            idx: route.params.origSpot.idx,
            title: data.title,
            address: data.address,
            timeArr: timeArr,
          },
        },
      });
    } else {
      // Adding a new spot
      navigation.navigate("Tabs", {
        screen: "Saved",
        params: {
          newSpot: {
            title: data.title,
            address: data.address,
            timeArr: timeArr,
            fav: false,
          },
        },
      });
    }
  };

  // testing geolocation functionality
  const getLocation = async () => {
    console.log("retrieivng current address");
    let status = await Location.requestForegroundPermissionsAsync();
    let coords = await Location.getCurrentPositionAsync();
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        coords.latitude +
        "," +
        coords.longitude +
        "&key=" +
        apiKey
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status != "OK") {
          console.log("there was an issue calculating the current address");
          setFailedGeolocation(true);
        } else {
          setFailedGeolocation(false);
          const address = responseJson.results[0].formatted_address;
          console.log(address);
          setValue("address", address);
        }
      });
  };

  // for the Save button in TimeModal
  const onSave = (checkedState, startTime, endTime, string) => {
    if (editIdx === -1) {
      setTimeArr([
        ...timeArr,
        {
          days: [...checkedState],
          start: new Date(startTime.getTime()),
          end: new Date(endTime.getTime()),
          string: string.slice(),
          idx: timeArr.length,
        },
      ]);
    } else {
      let tmpTimes = [...timeArr];
      let target = { ...tmpTimes[editIdx] };
      target.days = [...checkedState];
      target.start = new Date(startTime.getTime());
      target.end = new Date(endTime.getTime());
      target.string = string.slice();
      tmpTimes[editIdx] = target;
      setTimeArr(tmpTimes);
    }

    setModalVisible(false);
  };

  // For the remove "x" button in the current screen
  const removeTime = (idx) => {
    let tmpArr = timeArr.filter((time) => time.idx !== idx);
    for (let i = idx; i < tmpArr.length; ++i) {
      tmpArr[i].idx = i;
    }
    setTimeArr(tmpArr);
  };

  // For the "edit" button
  const editTime = (idx) => {
    setEditIdx(idx);
    setModalVisible(true);
    setModalInit({
      days: [...timeArr[idx].days],
      start: new Date(timeArr[idx].start.getTime()),
      end: new Date(timeArr[idx].end.getTime()),
    });
  };

  return (
    // Make keyboard disappear when clicked in blank spot
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
        }}
      >
        {/* The top two icons */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "center",
              marginLeft: "6%",
            }}
            activeOpacity={0.8}
            onPressOut={toSaved}
          >
            <View>
              <AntDesign name="arrowleft" size={50} color={COLORS.red_theme} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "center",
              marginRight: "7%",
            }}
            activeOpacity={0.8}
            onPressOut={() => {
              toCamera();
            }}
          >
            <View>
              <Feather name="camera" size={40} color={COLORS.green_theme} />
            </View>
          </TouchableOpacity>
        </View>

        {/* The form with two input */}
        <View style={styles.form}>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /[a-zA-Z0-9,. ]/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Spot Name"
              />
            )}
            name="title"
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: /[a-zA-Z0-9,. ]/,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Spot Address"
                />
              )}
              name="address"
            />

            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.gps}
              onPress={() => getLocation()}
            >
              <MaterialIcons
                name="gps-fixed"
                size={24}
                color={COLORS.green_theme}
              />
            </TouchableOpacity>
          </View>

          {/* Error messages when the input of name/loc is not formatted correctly */}
          {((errors.title && errors.title.type === "required") ||
            (errors.loc && errors.loc.type === "required")) && (
            <Text style={styles.errorMsg}>Both fields are required.</Text>
          )}
          {((errors.title && errors.title.type === "pattern") ||
            (errors.loc && errors.loc.type === "pattern")) && (
            <Text style={styles.errorMsg}>
              Format error: alphanumeric and comma only.
            </Text>
          )}
          {failedGeolocation && (
            <Text style={styles.errorMsg}>
              Failed to geolocate, please manually type address.
            </Text>
          )}
        </View>

        <View style={styles.timeAvailView}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Availability:</Text>

          {timeArr.map((time, i) => (
            <AvailDisplay
              key={generateID(time, i)}
              text={time.string}
              arrIdx={time.idx}
              removeTime={removeTime}
              editTime={editTime}
            />
          ))}

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setEditIdx(-1);
              setModalInit({ ...emptyModal });
            }}
          >
            <Text style={styles.timeText}>+ Add Time Slot</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.saveBtn}
          onPressOut={handleSubmit(onSubmit)}
        >
          <Text style={styles.saveBtnTxt}>Save</Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          animationType={"fade"}
          hasBackdrop={true}
          backdropOpacity={10}
          backdropColor={"rgba(255, 0, 0, 0.8)"}
        >
          <TimeModal
            closeModal={closeModal}
            onSave={onSave}
            modalInit={modalInit}
          />
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 50,
    marginTop: "13%",
    flexDirection: "row",
  },
  // Save spot button
  saveBtn: {
    backgroundColor: COLORS.green_theme,
    position: "absolute",
    width: 170,
    height: 50,
    bottom: "14%",
    left: "30%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  // Add spot button text
  saveBtnTxt: {
    fontSize: 20,
    color: "white",
  },

  input: {
    fontSize: 20,
    color: COLORS.green_theme,
    borderBottomColor: COLORS.green_theme,
    borderBottomWidth: 2,
    width: "55%",
    height: 40,
    marginBottom: 20,
  },

  form: {
    alignItems: "center",
    marginTop: "25%",
  },

  errorMsg: {
    color: COLORS.red_theme,
    fontWeight: "300",
  },

  timeAvailView: {
    alignItems: "flex-start",
    height: 200,
    paddingLeft: 45,
    marginTop: 35,
  },
  timeText: {
    fontSize: 20,
    margin: 15,
    color: COLORS.green_theme,
  },
  avilContainer: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  avilText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.green_theme,
    marginRight: 7,
  },
  avilBtnText: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 18,
    color: COLORS.green_theme,
  },
  // Scroll section style
  scrollSec: {
    paddingBottom: "20%",
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 0,
    flexDirection: "column",
    backgroundColor: "lightblue",
    width: "100%",
  },
  gps: {
    position: "absolute",
    left: "60%",
  },
});
