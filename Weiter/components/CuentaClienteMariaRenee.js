import {StyleSheet, Text, View, Button, Pressable } from 'react-native';
import OrderRow from './OrderRow';
import React, {useState} from 'react';


const CuentaCliente = props => {

  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = '';
  if (timesPressed => 0) {
    textLog = timesPressed + '';
  } else if (timesPressed > 0) {
    textLog = '';
  }

  let textLogMinus = '';
  if (timesPressed => 1) {
    textLog = timesPressed + '';
  } else if (timesPressed > 0) {
    textLog = '';
  }

  

    return (
      <View style={styles.container}>
      <Pressable
        onPress={() => {
          setTimesPressed(current => current + 1);
        }}
       >
        {({pressed}) => (
          <Text style={styles.botonCounter}>{pressed ? '+1' : '+'}</Text>
        )}
      </Pressable>
      <View style={styles.logBox}>
        <Text testID="pressable_press_console">{textLog}</Text>
      </View>

      <Pressable
        onPress={() => {
          setTimesPressed(current => current - 1);
        }}
       >
        {({pressed}) => (
          <Text style={styles.botonCounter}>{pressed ? '-1' : '-'}</Text>
        )}
      </Pressable>
      <View style={styles.logBox}>
        <Text testID="pressable_press_console">{textLogMinus}</Text>
      </View>










    </View>

    
  );
      
};




const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    text: {
      fontWeight: 'bold',
      color: '#C8B8FF',
      fontFamily: 'Al Nile',
      fontSize: 40,
      textAlign: 'center',
    },
    smallText: {
      fontWeight: 'bold',
      color: '#C8B8FF',
      fontFamily: 'Al Nile',
      fontSize: 20,
      textAlign: 'center'
    },
    boton: {
      padding: 10,
      margin: 10,
      color: '#C8B8FF',
      backgroundColor: '#D9D9D9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    botonCounter: {
      padding: 10,
      margin: 10,
      color: '#C8B8FF',
      fontSize: 20,
      alignItems: 'left',
    },
    logBox: {
      padding: 10,
      margin: 10,
      fontSize: 20,
      alignItems: 'left',
    },

  });
  
export default CuentaCliente;