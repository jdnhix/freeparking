import { StyleSheet, Pressable } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Entypo } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => console.log("Burger menu pressed")}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Entypo
          name="camera"
          size={60}
          color="black"
          style={{ marginBottom: 30 }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
