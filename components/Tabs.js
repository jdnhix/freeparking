import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SavedScreen from '../screens/SavedScreen'



const Tab = createMaterialBottomTabNavigator();

export default function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            activeColor='#2f5052'
            barStyle={{ backgroundColor: '#f4f4f4', borderRadius: 1, borderColor: 'red'}}
            shifting={true} //todo maybe disable this
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name='home' color={color} size={26}></MaterialCommunityIcons>
                    ),
                }}
            />
           <Tab.Screen
                name='Saved'
                component={SavedScreen}
                options={{
                    tabBarLabel: 'Saved',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name='bookmark' color={color} size={26}></MaterialCommunityIcons>
                    ),
                }}
            />
            <Tab.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name='cog' color={color} size={26}></MaterialCommunityIcons>
                    ),
                }}
            />

        </Tab.Navigator>

    );
}