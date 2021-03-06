import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./components/Tabs";
import WelcomeScreen from "./screens/WelcomeScreen";
import Saved from "./screens/SavedScreen";
import EditSpot from "./screens/EditSpotScreen";
import LoginScreen from "./screens/LoginScreen";
import { MenuProvider } from "react-native-popup-menu";

import { Provider } from "react-redux";
import { createStore } from "redux";
import spotReducer from "./redux/SpotReducer";

// ...
const Stack = createNativeStackNavigator();
const store = createStore(spotReducer);

export default function App() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Tabs" component={Tabs} />
              <Stack.Screen name="Saved" component={Saved} />
              <Stack.Screen name="EditSpot" component={EditSpot} />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar />
        </SafeAreaProvider>
      </MenuProvider>
    </Provider>
  );
}
