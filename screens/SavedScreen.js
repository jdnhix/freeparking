import * as React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import CameraScreen from '../screens/CameraScreen'

export default function SavedScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Saved Spots Screen</Text>
            </View>

            <Button
              title="Go to Camera Screen"
              onPress={() =>
              navigation.navigate('CameraScreen')
            }/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });