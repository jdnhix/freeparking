import * as React from 'react';
import { View, Text, Keyboard, StyleSheet, SafeAreaView, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import CustomButton from "../components/Button";
import { useAuth } from "../providers/AuthProvider";


export default function LoginScreen ({navigation}) {

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const {user, signUp, signIn} = useAuth();
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

    React.useEffect(() => {
        if (user != null) {
            navigation.navigate("Tabs");
        }

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
            setKeyboardVisible(true); 
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
            setKeyboardVisible(false);
            }
        );
   
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
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


    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={300}
            style={{flex: 1}}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.center}>
                        <Image
                            style={styles.logo}
                            source={require('../assets/logo.png')}
                        />
                        <Text style={styles.text}>Please enter your username and password to proceed</Text>

                        <TextInput
                            style={[styles.input, {top: "45%"}]}
                            onChangeText={onChangeEmail}
                            placeholder='Email'
                            value={email}
                            keyboardType='email-address'
                        /> 
                        <TextInput
                            style={[styles.input, {top: "47%"}]}
                            onChangeText={onChangePassword}
                            placeholder='Password'
                            value={password}
                            keyboardType='default'
                        /> 

                        {!isKeyboardVisible && ( 
                            <View style= {{top: '60%'}}>
                                <View >
                                    <CustomButton title='Login' height={50} />
                                    <CustomButton onPress={onPressSignIn} title="Login" />
                                </View>
                                <View style={{top: '5%'}}>
                                    <CustomButton title='Sign Up' height= {50} />   
                                    <CustomButton onPress={onPressSignUp} title="Sign Up" />
                                </View>
                            </View>  
                        )}
                        
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );

}


const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    logo: {
        top: 40
    },
    text: {
        width: '80%',
        maxWidth: 330,
        top: '25%',
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center'
    },
    input: {
        width: '80%',
        maxWidth: 273,
        height: 50,
        backgroundColor: '#c4c4c4',
        borderRadius: 10,
        padding: 10,
        margin: 0
    },
    loginButton:{
        
    },
    signupButton:{
        
    },


});
