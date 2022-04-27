import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../components/Colors";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center", marginTop: "16%", height: 50 }}>
        <Text style={styles.pageTitle}>Settings</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.option}
        onPress={() => navigation.navigate("Account")}
      >
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={24}
          color={COLORS.green_theme}
          style={{ flex: 1 }}
        />
        <Text style={styles.optionText}>Account</Text>
        <MaterialIcons
          name="arrow-forward-ios"
          size={24}
          color={COLORS.green_theme}
          style={{ flex: 1 }}
        />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.4} style={styles.option}>
        <AntDesign
          name="lock"
          size={28}
          color={COLORS.green_theme}
          style={{ flex: 1, right: "5%" }}
        />
        <Text style={styles.optionText}>Security</Text>
        <MaterialIcons
          name="arrow-forward-ios"
          size={24}
          color={COLORS.green_theme}
          style={{ flex: 1 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 26,
    color: COLORS.green_theme,
    fontWeight: "500",
  },
  option: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    marginHorizontal: 30,
  },
  optionText: {
    flex: 6,
    fontSize: 20,
    color: COLORS.green_theme,
  },
});
