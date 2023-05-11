import React from 'react';
import {StyleSheet, Text, View} from 'react-native';



const OrderRow = props => {
    return <View style={[{padding: 10, flexDirection: 'row'}]}>
        <Text style={{flex: 1}} >{props.cantidad}</Text>
        <Text style={{flex: 3}} >{props.nombre}</Text>
        <Text style={{flex: 1, textAlign: 'right'}} >{props.costo}</Text>
    </View>
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
});
  
export default OrderRow;