import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { COLORS } from "../components/Colors";
import { MaterialIcons } from '@expo/vector-icons'; 
import { useAuth } from "../providers/AuthProvider";
import { useSpots } from "../providers/SpotsProvider";


export default function SettingsScreen({navigation}) {
    const { signOut } = useAuth();
    const { closeRealm } = useSpots();

    const onPressSignOut = () => {
        console.log("Attempting signout");
        closeRealm();
        signOut();
        navigation.navigate("Welcome");
    }

    return (
        <View style={{ flex: 1}}>
            <View style={styles.titleBar}>
                <MaterialIcons name="arrow-back-ios" size={24} color={COLORS.green_theme}  style={{flex: 1}} onPress={() => navigation.pop()}/>
                <Text style={styles.pageTitle}>Account</Text>
            </View>
            
            <View style={{marginTop: 20, marginLeft: 20}}>

                <TouchableOpacity activeOpacity={.4} style={styles.option}>
                    <Text style={[styles.optionText, {color: COLORS.green_theme}]} onPress={onPressSignOut}>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={.4} style={styles.option}>
                    <Text style={[styles.optionText, {color: COLORS.yellow_theme}]}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={.4} style={styles.option}>
                    <Text style={[styles.optionText, {color: COLORS.red_theme}]}>Delete Account</Text>
                </TouchableOpacity>

            </View>

            
            
         </View>
    );
}


const styles = StyleSheet.create({
    titleBar: {
        alignItems: 'center', 
        marginTop: '14%', 
        height: 50, 
        flexDirection: 'row',
        marginHorizontal: 20
    },
    pageTitle: {
        fontSize: 20,
        color: COLORS.green_theme,
        fontWeight: "500",
        position: 'absolute',
        left: '40%'
        
    },
    option: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginHorizontal: 30
    },
    optionText: {
        flex: 6, 
        fontSize: 18,

    }


});

