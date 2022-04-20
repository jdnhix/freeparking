import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './components/Tabs'
import LoginScreen from './screens/LoginScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import { AuthProvider } from './providers/AuthProvider';
import { SpotsProvider } from './providers/SpotsProvider'
import Saved from "./screens/SavedScreen";
import EditSpot from "./screens/EditSpotScreen";
import { MenuProvider } from "react-native-popup-menu";
import SavedScreen from './screens/SavedScreen';
import EditSpotScreen from './screens/EditSpotScreen';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Tabs">
                {() => {
                  return (
                    <SpotsProvider>
                      <Tabs/>
                    </SpotsProvider>
                  );
                }}
              </Stack.Screen>
              <Stack.Screen name="Saved">
                {() => {
                  return (
                    <SpotsProvider>
                      <Saved/>
                    </SpotsProvider>
                  );
                }}
              </Stack.Screen>
              <Stack.Screen name="EditSpot">
                {() => {
                  return (
                    <SpotsProvider>
                      <EditSpot/>
                    </SpotsProvider>
                  );
                }}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar />
        </SafeAreaProvider>
      </MenuProvider>
    </AuthProvider>
  );
}
