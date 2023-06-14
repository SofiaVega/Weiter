import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';


const MenuRow = props => {
    console.log(props)
    console.log(props.cantidad)
    const [timesPressed, setTimesPressed] = useState(0);

    useEffect(() => {
      setTimesPressed(props.cantidad)
    },[props])



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

    return <View style={[{flexDirection: 'row'}]}>
        <Text style={{flex: 3}} >{props.nombre}</Text>
        <View style={{flexDirection:'row'}}>
            <Pressable
                onPress={() => {
                setTimesPressed(current => current - 1);
                // console.log(timesPressed)
                props.parentCallback([props.nombre,timesPressed - 1]);
                }}
            >
                {({pressed}) => (
                <Text style={styles.botonCounter}>{pressed ? '-1' : '-'}</Text>
                )}
            </Pressable>
            <View style={styles.logBox}>
                <Text testID="pressable_press_console">{textLog}</Text>
            </View>
            <Pressable
                onPress={() => {
                setTimesPressed(current => current + 1);
                props.parentCallback([props.nombre,timesPressed + 1]);
                }}
            >
                {({pressed}) => (
                <Text style={styles.botonCounter}>{pressed ? '+1' : '+'}</Text>
                )}
            </Pressable>
        </View>
    </View>
};

const styles = StyleSheet.create({
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
  
export default MenuRow;