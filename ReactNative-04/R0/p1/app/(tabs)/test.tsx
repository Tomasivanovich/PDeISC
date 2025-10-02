import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ScrollView from '@/components/scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';


export default function HomeScreen() {
  return (
    <ScrollView
      headerBackgroundColor={{ light: '#5619feff', dark: '#06c1faff' }}
      headerImage={
        <Image
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Hola Mundo</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>Primera prueba de tabs con React Native</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    color: '#59f7ffff',
    flexDirection: 'column',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a4a4a4ff',
    marginLeft: '36%',
  }
});
