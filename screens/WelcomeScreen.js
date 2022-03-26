import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import CustomButton from "../components/Button";

export default function WelcomeScreen({ navigation }) {
  const testFunction = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView>
      <View style={{ display: "flex", alignItems: "center" }}>
        <View style={styles.titleTextView}>
          <Text style={[styles.titleText, styles.centerTextAlign]}>
            Discover and save parking places near you
          </Text>
          <Text style={[styles.centerTextAlign, styles.subText]}>
            You can save your favorite parking spots around you or at the
            destination
          </Text>
        </View>

        <View style={styles.imageView}>
          <Image
            style={{ top: "10%" }}
            source={require("../assets/logo.png")}
          />
        </View>

        <View style={styles.buttonView}>
          <CustomButton title="Continue" callback={testFunction} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleTextView: {
    width: "85%",
    height: "40%",
    display: "flex",
    justifyContent: "space-evenly",
    textAlign: "center",
    top: "10%",
  },
  imageView: {
    height: "30%",
    top: "25%",
    justifyContent: "center",
  },
  buttonView: {
    top: "60%",
    justifyContent: "center",
  },
  centerTextAlign: {
    textAlign: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  subText: {
    fontSize: 20,
  },
});
