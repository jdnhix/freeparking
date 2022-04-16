import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../components/Colors";
import DayCheckbox from "./DayCheckbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";

const DAYS = ["M", "T", "W", "R", "F", "S", "U"];

export default function TimeModal(props) {
  const [checkedState, setCheckedState] = React.useState(
    new Array(DAYS.length).fill(false)
  );

  const [startTime, setStartTime] = React.useState(new Date(0, 0, 0));
  const [endTime, setEndTime] = React.useState(new Date(0, 0, 0));

  const onChangeStartTime = (event, time) => {
    setStartTime(time);
    console.log(time.getTimezoneOffset() / 60);
    console.log(time);
  };

  const onChangeEndTime = (event, time) => {
    setEndTime(time);
    console.log(time);
  };

  const handleOnChangeDay = (position) => {
    const updatedCheckedState = checkedState.map((day, index) =>
      index === position ? !day : day
    );

    setCheckedState(updatedCheckedState);
  };

  return (
    <View style={styles.modal}>
      <View style={styles.modTopBar}>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text style={styles.text}>Time Slot</Text>
        </View>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "flex-end" }}
          onPressOut={props.closeModal}
        >
          <View style={{ justifyContent: "center", backgroundColor: "red" }}>
            <Entypo name="cross" size={35} color={COLORS.green_theme} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxRow}>
        {DAYS.map((letter, index) => {
          return (
            <DayCheckbox
              key={index}
              letter={letter}
              checked={checkedState[index]}
              onChange={() => handleOnChangeDay(index)}
            />
          );
        })}
      </View>

      <View style={[styles.timeSection, { marginTop: 15 }]}>
        <Text style={styles.text}>Start:</Text>
        <DateTimePicker
          style={{ width: 100 }}
          mode={"time"}
          value={startTime}
          onChange={onChangeStartTime}
        />
      </View>

      <View style={styles.timeSection}>
        <Text style={styles.text}>End:</Text>
        <DateTimePicker
          style={{ width: 100 }}
          mode={"time"}
          value={endTime}
          onChange={onChangeEndTime}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.addTimeText}>+ Add Another Time</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: 340,
    height: 250,
    backgroundColor: "white",
    position: "absolute",
    top: "25%",
    borderRadius: 20,
    flex: 1,
    padding: 25,
    paddingHorizontal: 40,
  },

  text: {
    color: COLORS.green_theme,
    fontSize: 22,
  },

  checkboxRow: {
    flexDirection: "row",
    marginTop: 15,
  },

  timeSection: {
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  addTimeText: {
    fontSize: 20,
    marginTop: 15,
    color: COLORS.green_theme,
    textDecorationLine: "underline",
  },

  modTopBar: {
    flexDirection: "row",
    flex: 1,
  },
});
