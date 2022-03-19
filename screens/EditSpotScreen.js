import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../components/Colors";

export default function EditSpotScreen({ navigation }) {
  // Go back to the saved spots page.
  // Going to "Tabs" not "Saved" since it will be without the bottom bar
  const toSaved = () => {
    navigation.navigate("Tabs");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "lightblue" }}>
      <TouchableOpacity
        style={styles.backBtn}
        activeOpacity={0.8}
        onPressOut={toSaved}
      >
        <View>
          <AntDesign name="arrowleft" size={50} color={COLORS.red_theme} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    top: "7%",
    left: "7%",
  },
});
