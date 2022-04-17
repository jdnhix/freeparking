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

  const [err, setErr] = React.useState("");

  const [startTime, setStartTime] = React.useState(new Date(0, 0, 0));
  const [endTime, setEndTime] = React.useState(new Date(0, 0, 0));

  const onChangeStartTime = (event, time) => {
    const tmp = new Date(0, 0, 0);
    time < endTime || endTime.getTime() === tmp.getTime()
      ? (setStartTime(time), setErr(""))
      : (setStartTime(endTime), setErr("Start must be earlier then End"));
  };

  const onChangeEndTime = (event, time) => {
    const tmp = new Date(0, 0, 0);
    time > startTime || startTime.getTime() === tmp.getTime()
      ? (setEndTime(time), setErr(""))
      : (setEndTime(startTime), setErr("End must be later than Start"));
  };

  const handleOnChangeDay = (position) => {
    setErr("");
    const updatedCheckedState = checkedState.map((day, index) =>
      index === position ? !day : day
    );
    setCheckedState(updatedCheckedState);
  };

  // Turn the selected days and time to a string
  const parseTime = () => {
    let count = checkedState[0] ? 1 : 0;
    let res = "";
    for (let i = 1; i < DAYS.length; ++i) {
      if (checkedState[i]) {
        ++count;
      } else {
        if (count <= 2) {
          for (let j = 0; j < count; ++j) {
            res += DAYS[i - count + j] + ",";
          }
        } else {
          res += DAYS[i - count] + "-" + DAYS[i - 1] + ",";
        }
        count = 0;
      }
    }
    if (count > 0) {
      if (count <= 2) {
        for (let j = 0; j < count; ++j) {
          res += DAYS[DAYS.length - count + j] + ",";
        }
      } else {
        res += DAYS[DAYS.length - count] + "-" + DAYS[DAYS.length - 1];
      }
    }
    if (res.charAt(res.length - 1) === ",") {
      res = res.slice(0, -1);
    }
    res +=
      ": " +
      startTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
    res +=
      " - " +
      endTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });

    return res;
  };

  const onSave = () => {
    if (!checkedState.includes(true)) {
      if (err === "") {
        setErr("Please select the available days");
      }
    } else if (err === "") {
      const string = parseTime();
      props.onSave(checkedState, startTime, endTime, string);
    }
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
          <View style={{ justifyContent: "center" }}>
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
      {err === "" ? <></> : <Text style={styles.errMsg}>{err}</Text>}
      <TouchableOpacity onPressOut={onSave}>
        <Text style={styles.addTimeText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "90%",
    height: "30%",
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

  errMsg: {
    fontSize: 15,
    color: COLORS.red_theme,
  },
});
