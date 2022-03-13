import { Button, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import useColorScheme from '../hooks/useColorScheme';
import React, { useState, useEffect } from 'react';

// 


export default function TabOneScreen({ navigation }: RootTabScreenProps<'Login'>) {
  const colorScheme = useColorScheme()
  // const tabTextColor = colorScheme === 'dark' ? styles.darkText : styles.lightText;

  const [text, onChangeText] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

 useEffect(() => {
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

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.whole}
      keyboardVerticalOffset={90}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>

          <View style={styles.logoSection}>
            <Text style={styles.title}>Logo/Image</Text>
          </View>

          <View style={styles.tab}>

            <View style={styles.tabTitleSection}>
              <Text style={[styles.tabTitle]}>Free Parking</Text>
              <Text style={[styles.tabSubtext]}>Never pay for parking again</Text>
            </View>

            <View style={styles.inputSection}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                placeholder='Email'
                value={text}
                keyboardType='email-address'
              /> 

            {/* {!isKeyboardVisible && ( */} 
              <Pressable 
                style={styles.inputButton}
                onPressOut={() =>{
                  console.log(text)
                }}>
                <Text style={{fontSize: 17}}>Find Parking</Text>
              </Pressable>
            {/* )} */}
            </View>
 

          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  whole: {
    flex: 1
  },
  logoSection: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  tab: {
    backgroundColor: '#3a3b3c',
    flex: 4,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'space-evenly',
    alignItems: "center"
  },
  tabTitleSection: {
    backgroundColor: '#3a3b3c',
    alignItems: 'center',
    marginTop: 20,
    bottom: '5%'
  },
  tabTitle:{
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 10,
  },
  tabSubtext: {
    fontSize: 16,
  },
  inputSection: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#3a3b3c',
    height: '50%',
    justifyContent: 'space-evenly',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: 10,
    margin: 0,
  },
  inputButton: {
    backgroundColor: 'grey',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8

  }
});
