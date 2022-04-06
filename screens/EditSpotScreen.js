import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { COLORS } from "../components/Colors";
import { useForm, Controller } from "react-hook-form";
import * as Location from "expo-location";
import Button from "../components/Button";
import TimeModal from "../components/TimeModal";
import Modal from "react-native-modal";

// TODO:
// 1. Time availability design (checkout modal)

export default function EditSpotScreen({ route, navigation }) {
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
    },
  });

  const onSubmit = (data) => {
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

  const [modalVisible, setModalVisible] = React.useState(false);

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

        {/* todo Check out DateTimePicker Expo */}

        <View style={styles.timeAvailView}>
          <Text style={{ fontSize: 20 }}>Availability:</Text>
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
          onBackdropPress={() => setModalVisible(false)}
          animationType={"fade"}
          // transparent={true}
          hasBackdrop={true}
          backdropOpacity={10}
          backdropColor={"rgba(255, 0, 0, 0.8)"}
        >
          <TimeModal />
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
});
