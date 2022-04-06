import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  useEffect,
} from "react-native";
import { COLORS } from "../components/Colors";
import DayCheckbox from "./DayCheckbox";

const DAYS = ["M", "T", "W", "R", "F", "S", "U"];

export default function TimeModal() {
  const [checkedState, setCheckedState] = React.useState(
    new Array(DAYS.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((day, index) =>
      index === position ? !day : day
    );

    console.log(updatedCheckedState);
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
              onChange={() => handleOnChange(index)}
            />
          );
        })}

        {/* <DayCheckbox letter="M" />
        <DayCheckbox letter="T" />
        <DayCheckbox letter="W" />
        <DayCheckbox letter="R" />
        <DayCheckbox letter="F" />
        <DayCheckbox letter="S" />
        <DayCheckbox letter="U" /> */}
      </View>
      <View style={styles.timeSection}>
        <Text style={styles.text}>Start: 2:00 PM</Text>
        <Text style={styles.text}>End: 3:00 PM</Text>
      </View>
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
    marginTop: 20,
  },
});
