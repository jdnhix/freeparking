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
  Dimensions,
  ScrollView,
} from "react-native";
import { AntDesign, Feather, Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../components/Colors";
import { useForm, Controller } from "react-hook-form";
import * as Location from "expo-location";
import TimeModal from "../components/TimeModal";
import Modal from "react-native-modal";

// TODO:
// 1. Time availability design (checkout modal)

// Display the time availability (does not contain any actual
// code to edit the spot and stuff. That is in the EditSpotScreen)
function AvailDisplay(props) {
  const [text, setText] = useState(props.text);

  const onEdit = () => {
    console.log("edit time avail");
  };

  const onDelete = () => {
    props.removeTime(props.arrIdx);
  };

  return (
    <View style={styles.avilContainer}>
      <Text style={[styles.avilText, { flex: 4 }]}>{text}</Text>
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
  const screenHeight = Dimensions.get("window").height;
  const scrollThreshold = 0.4; // when the time take up x% of the screen, scoll is enabled

  const [timeArr, setTimeArr] = useState([
    {
      days: [true, false, true, false, true, false, true],
      start: new Date("1899-12-31T10:00:00.000Z"),
      end: new Date("1899-12-31T13:00:00.000Z"),
      string: "M,W,F,U: 10:00 AM - 1:00 PM",
      idx: 0,
    },
    {
      days: [false, true, false, true, false, true, false],
      start: new Date("1899-12-31T14:00:00.000Z"),
      end: new Date("1899-12-31T17:00:00.000Z"),
      string: "T,R,S: 2:00 PM - 5:00 PM",
      idx: 1,
    },
  ]);

  // Toggle to set modal visible or not
  const [modalVisible, setModalVisible] = useState(false);

  // idx of which time spot is being edited
  // -1 means a new time availability is being added
  const [editIdx, setEditIdx] = useState(-1);

  // For the times to be scrollable. NOT working atm
  const [scroll, setScroll] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
    setEditIdx(-1);
  };

  const generateID = (time, i) => {
    return `${time.start.toString()}_${new Date().getTime()}_${i}`;
  };

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: route.params?.origSpot ? route.params.origSpot.title : "",
      loc: route.params?.origSpot ? route.params.origSpot.loc : "",
      // TODO: add time availability stuff
    },
  });

  const onSubmit = (data) => {
    // Editing spot
    if (route.params?.origSpot) {
      navigation.navigate("Tabs", {
        screen: "Saved",
        params: {
          editSpot: {
            idx: route.params.origSpot.idx,
            title: data.title,
            loc: data.loc,
          },
        },
      });
    } else {
      // Adding a new spot
      navigation.navigate("Tabs", {
        screen: "Saved",
        params: { newSpot: { title: data.title, loc: data.loc } },
      });
    }
  };

  // testing geolocation functionality, ignore this for now - Jaden
  const getLocation = async () => {
    let status = await Location.requestForegroundPermissionsAsync(); //use status for debugging
    let coords = await Location.getCurrentPositionAsync();

    console.log(coords);
  };

  // for the Save button in TimeModal
  const onSave = (checkedState, startTime, endTime, string) => {
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
    setModalVisible(false);
  };

  // For the remove "x" in the current screen
  const removeTime = (idx) => {
    let tmpArr = timeArr.filter((time) => time.idx !== idx);
    for (let i = idx; i < tmpArr.length; ++i) {
      tmpArr[i].idx = i;
    }
    setTimeArr(tmpArr);
  };

  return (
    // Make keyboard disappear when clicked in blank spot
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          // backgroundColor: modalVisible ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)", //todo this background shift is a little janky right now
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
              getLocation();
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
            name="loc"
          />
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
        </View>

        <View style={styles.timeAvailView}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Availability:</Text>

          {timeArr.map((time, i) => (
            <AvailDisplay
              key={generateID(time, i)}
              text={time.string}
              arrIdx={time.idx}
              removeTime={removeTime}
            />
          ))}

          {/* <View
            style={styles.scrollContainer}
            onLayout={(event) => {
              const { x, y, width, height } = event.nativeEvent.layout;
              if (height / screenHeight > scrollThreshold) {
                setScroll(true);
              } else {
                setScroll(true);
              }
            }}
          >
            <ScrollView
              scrollEnabled={scroll}
              contentContainerStyle={styles.scrollSec}
              style={{ backgroundColor: "red" }}
            >
              {timeArr.map((time, i) => (
                <AvailDisplay
                  key={generateID(time, i)}
                  text={time.string}
                  arrIdx={time.idx}
                  removeTime={removeTime}
                />
              ))}
            </ScrollView>
          </View> */}

          <TouchableOpacity onPress={() => setModalVisible(true)}>
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
          // transparent={true}
          hasBackdrop={true}
          backdropOpacity={10}
          backdropColor={"rgba(255, 0, 0, 0.8)"}
        >
          <TimeModal closeModal={closeModal} onSave={onSave} />
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
    paddingLeft: 65,
    marginTop: 20,
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
});
