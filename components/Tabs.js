import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SavedScreen from "../screens/SavedScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={SettingsScreen} />
      <Stack.Screen name="Account" component={AccountSettingsScreen} />
    </Stack.Navigator>
  );
};

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#2f5052"
      barStyle={{
        backgroundColor: "#f4f4f4",
        borderRadius: 1,
        borderColor: "red",
      }}
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={26}
            ></MaterialCommunityIcons>
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bookmark"
              color={color}
              size={26}
            ></MaterialCommunityIcons>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cog"
              color={color}
              size={26}
            ></MaterialCommunityIcons>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
