import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../components/Colors";
import DayCheckbox from "./DayCheckbox";
import DateTimePicker from "@react-native-community/datetimepicker";

const DAYS = ["M", "T", "W", "R", "F", "S", "U"];

export default function TimeModal() {
  const [checkedState, setCheckedState] = React.useState(
    new Array(DAYS.length).fill(false)
  );

  const [startTime, setStartTime] = React.useState(new Date(0, 0, 0));
  const [endTime, setEndTime] = React.useState(new Date(0, 0, 0));

  const onChangeStartTime = (event, time) => {
    setStartTime(time);
    // console.log(startTime);
  };

  const onChangeEndTime = (event, time) => {
    setEndTime(time);
    // console.log(endTime);
  };

  const handleOnChangeDay = (position) => {
    const updatedCheckedState = checkedState.map((day, index) =>
      index === position ? !day : day
    );

    setCheckedState(updatedCheckedState);
  };

  return (
    <View style={styles.modal}>
      <Text style={styles.text}>Time Slot</Text>
      <View style={styles.checkboxRow}>
        {DAYS.map((letter, index) => {
          return (
            <DayCheckbox
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
});
