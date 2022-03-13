import { StyleSheet, Pressable } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Entypo } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import useColorScheme from '../hooks/useColorScheme';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme()

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
          color={colorScheme === 'dark' ? "white" : "black"}
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
