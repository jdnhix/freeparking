import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../components/Colors";

export default function Button(props) {
  return (
    <SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPressOut={props.callback}
      >
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.green_theme,
    width: 275,
    height: 64,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  text: {
    fontSize: 24,
    color: "white",
  },
});
