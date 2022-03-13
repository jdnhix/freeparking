import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './components/Tabs'
import WelcomeScreen from './screens/WelcomeScreen'


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            name="Tabs"
            component={Tabs}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar/>
    </SafeAreaProvider>
  );
}