import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import CustomButton from "../components/Button";
import { useAuth } from "../providers/AuthProvider";
import * as React from "react";
import { COLORS } from "../components/Colors";

const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export default function LoginScreen({ navigation }) {
  // const [email, onChangeEmail] = React.useState("test");
  // const [password, onChangePassword] = React.useState("");
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { user, signUp, signIn } = useAuth();
  //const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    if (user != null) {
      navigation.navigate("Tabs");
    }

    // const keyboardDidShowListener = Keyboard.addListener(
    //     'keyboardDidShow',
    //     () => {
    //     setKeyboardVisible(true);
    //     }
    // );
    // const keyboardDidHideListener = Keyboard.addListener(
    //     'keyboardDidHide',
    //     () => {
    //     setKeyboardVisible(false);
    //     }
    // );

    // return () => {
    //     keyboardDidHideListener.remove();
    //     keyboardDidShowListener.remove();
    // };
  }, [user]);

  const onPressSignIn = async () => {
    console.log("Trying sign in with user: " + email);
    try {
      await signIn(email, password);
    } catch (error) {
      const errorMessage = `Failed to sign in: ${error.message}`;
      console.error(errorMessage);
      Alert.alert(errorMessage);
    }
  };

  const onPressSignUp = async () => {
    console.log("Trying signup with user: " + email);
    try {
      await signUp(email, password);
      signIn(email, password);
    } catch (error) {
      const errorMessage = `Failed to sign up: ${error.message}`;
      console.error(errorMessage);
      Alert.alert(errorMessage);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.center}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.text}>
          Please enter your username and password to proceed
        </Text>

        <TextInput
          style={[styles.input, { top: "23%" }]}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
        />

        <TextInput
          style={[styles.input, { top: "23%" }]}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          value={password}
          keyboardType="default"
          secureTextEntry
        />

        {/* {!isKeyboardVisible && (  */}
        <View style={{ top: "40%" }}>
          <View>
            <CustomButton callback={onPressSignIn} title="Login" height={50} />
          </View>
          <View style={{ top: "10%" }}>
            <CustomButton
              callback={onPressSignUp}
              title="Sign up"
              height={50}
            />
          </View>
        </View>
        {/* )} */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    top: 20,
  },
  text: {
    width: "80%",
    maxWidth: 330,
    top: "5%",
    fontWeight: "500",
    fontSize: 21,
    textAlign: "center",
  },
  // input: {
  //     width: '80%',
  //     maxWidth: 273,
  //     height: 50,
  //     backgroundColor: '#c4c4c4',
  //     borderRadius: 10,
  //     padding: 10,
  //     margin: 0
  // },
  input: {
    fontSize: 20,
    color: COLORS.green_theme,
    borderBottomColor: COLORS.green_theme,
    borderBottomWidth: 2,
    width: "55%",
    height: 40,
    marginBottom: 20,
  },
  errorMsg: {
    color: COLORS.red_theme,
    fontWeight: "300",
    top: "5%",
  },
});
