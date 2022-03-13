import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';

export default function Button(props) {
    return (
        <SafeAreaView>
            <Pressable style={styles.button}>
                <Text style={{fontSize: 24, color: 'white'}}
                    onPressOut={props.func}
                >{props.title}</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2f5052',
        width: 330,
        height: 64,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',

    }
    
})

