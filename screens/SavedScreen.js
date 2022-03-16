import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../components/Colors";

function Spots(props) {
  const dummyFunc = () => {
    console.log("Dummy works");
  };

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "row",
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "lightblue",
        }}
      >
        <AntDesign name="staro" size={20} color={COLORS.red_theme} />
      </View>
      <View
        style={{ flex: 4, alignItems: "flex-start", justifyContent: "center" }}
      >
        <Text style={styles.spotTitle}>Vanderbilt</Text>
        <Text>2301 Vanderbilt Place</Text>
        <Text>M-F: 6PM - 6AM, S-U: All Day</Text>
      </View>
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPressOut={dummyFunc}
        >
          <Text style={styles.btnText}>Route</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "blue",
        }}
      >
        <Ionicons
          name="md-ellipsis-vertical"
          size={20}
          color={COLORS.yellow_theme}
        />
      </View>
    </View>
  );
}

export default function SavedScreen() {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <Spots style={styles.spot} />
      <Spots style={styles.spot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 35,
  },
  button: {
    backgroundColor: COLORS.green_theme,
    width: 80,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  btnText: {
    fontSize: 15,
    color: "white",
  },
  spot: {
    height: 200,
    backgroundColor: "blue",
  },
  spotTitle: {
    fontWeight: "600",
    fontSize: 20,
    color: COLORS.green_theme,
  },
});
