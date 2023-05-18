import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Orden() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <View style={{flex: 1, backgroundColor: 'red'}} />
      <View style={{flex: 3, backgroundColor: 'darkorange'}} />
      <View style={{flex: 1, backgroundColor: 'green'}} />
      <View style={{flex: 1, backgroundColor: 'red'}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
