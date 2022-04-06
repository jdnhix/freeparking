import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "./Colors";

export default function DayCheckbox({ checked, onChange, letter }) {
  function onPress() {
    onChange(!checked);
  }

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onPress}
    >
      <Text>{letter}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.yellow_theme,
    backgroundColor: "transparent",
    marginRight: 9,
  },

  checkboxChecked: {
    backgroundColor: COLORS.yellow_theme,
  },
});
