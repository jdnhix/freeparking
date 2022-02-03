import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Login'>) {
  return (
    <View style={styles.whole}>

      <View style={styles.container}>
        <Text style={styles.title}>Sample</Text>

      </View>

      <View style={styles.tab}>
        <Text>Hellooo</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  whole: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  tab: {
    backgroundColor: '#ebecf0',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: "center"
  }
});
