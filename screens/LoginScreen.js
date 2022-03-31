import * as React from 'react';
import { View, Text, Keyboard, StyleSheet, SafeAreaView, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import CustomButton from "../components/Button"
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "../components/Colors";

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/


export default function LoginScreen ({navigation}) {

    // const [email, onChangeEmail] = React.useState("test");
    // const [password, onChangePassword] = React.useState("");
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);


    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          email: "",
          password:  "",
        },
      });

    const onLogin = () => {
        console.log("attempted to login")
        navigation.navigate('Tabs')
    }

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.center}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/logo.png')}
                    />
                    <Text style={styles.text}>Please enter your username and password to proceed</Text>

                    <View style={{position: 'absolute', alignItems: 'center', top: "75%"}}>
                        {((errors.email && errors.email.type === "required") ||
                            (errors.password && errors.password.type === "required")) && (
                            <Text style={styles.errorMsg}>Both fields are required.</Text>
                        )}
                        {((errors.email && errors.email.type === "pattern")) && (
                            <Text style={styles.errorMsg}>
                            Format error: incorrect email pattern.
                            </Text>
                        )}
                    </View>


                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: true,
                            pattern: emailRegex, //todo uncomment this for prod
                        }}
                        render={({field: { onChange, value } }) => (
                            <TextInput
                            style={[styles.input, {top: "23%"}]}
                            onChangeText={onChange}
                            placeholder='Email'
                            value={value}
                            keyboardType='email-address'
                            /> 
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: true,
                        }}
                        render={({field: { onChange, value } }) => (
                            <TextInput
                            style={[styles.input, {top: "23%"}]}
                            onChangeText={onChange}
                            placeholder='Password'
                            value={value}
                            keyboardType='default'
                        /> 
                        )}
                    />

                    {/* {!isKeyboardVisible && (  */}
                        <View style= {{top: '40%'}}>
                            <View >
                                <CustomButton title='Login' callback={handleSubmit(onLogin)} height={50}/>    
                            </View>
                            <View style={{top: '10%'}}>
                                <CustomButton title='Signup' height= {50} />    
                            </View>
                        </View>  
                    {/* )} */}
                    
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );

}


const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        top: 20
    },
    text: {
        width: '80%',
        maxWidth: 330,
        top: '5%',
        fontWeight: "500",
        fontSize: 21,
        textAlign: 'center'
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
        top: '5%',
      },


});
