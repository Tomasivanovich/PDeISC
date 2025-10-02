import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ViewBoxes from './components/ViewBoxes';
import TextInANest from './components/text';
import DisplayAnImage from './components/Image';
import TextInputExample from './components/TextInput';
import Press from './components/Pressable';
import List from './components/List';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView >
      <Text>Open up App.tsx to start working on your app!</Text>
      <ViewBoxes />
      <TextInANest />
      <StatusBar style="auto" />
      <DisplayAnImage />
      <TextInputExample />
      <Press />
      <List />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
