import * as React from 'react';
import { View, Text, Keyboard, StyleSheet, SafeAreaView, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import CustomButton from "../components/Button"


export default function LoginScreen () {

    const [text, onChangeText] = React.useState("");
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

    React.useEffect(() => {
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
     }, []);



    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={300}
            style={{flex: 1}}
        >
            <SafeAreaView style={styles.center}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/logo.png')}
                    />
                    <Text style={styles.text}>Please enter your username and password to proceed</Text>

                    <TextInput
                        style={[styles.input, {top: "45%"}]}
                        onChangeText={onChangeText}
                        placeholder='Email'
                        value={text}
                        keyboardType='email-address'
                    /> 
                    <TextInput
                        style={[styles.input, {top: "47%"}]}
                        onChangeText={onChangeText}
                        placeholder='Password'
                        value={text}
                        keyboardType='default'
                    /> 

                    {!isKeyboardVisible && ( 
                        <View style= {{top: '60%'}}>
                            <View >
                                <CustomButton title='Login' height={50}/>    
                            </View>
                            <View style={{top: '10%'}}>
                                <CustomButton title='Signup' height= {50} />    
                            </View>
                        </View>  
                    )}


                    
            </SafeAreaView>
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
