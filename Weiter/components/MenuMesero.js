import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Button, Pressable } from 'react-native';
import MenuRow from './MenuRow';

// https://run.mocky.io/v3/66ce4cb9-218c-49d2-a668-746d067cd415


const CuentaCliente = props => {
    return (
        <View style={[
          styles.container,
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: 'column',
          },
        ]}>
          <View style={{flex: 1,  flexDirection: 'column', padding: 20, alignItems: 'center'}}>
            <Text style={[styles.smallText,{flex: 1}]} >Mesa 1</Text>
            <Text style={[styles.text,{flex: 2}]} >Menu</Text>
          </View>
          <View style={{flex: 4, }}>
            <MenuRow nombre = "Hamburguesa" />
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
    },
    smallText: {
      fontWeight: 'bold',
      color: '#C8B8FF',
      fontFamily: 'Al Nile',
      fontSize: 20,
    },
    boton: {
      padding: 10,
      margin: 10,
      color: '#C8B8FF',
      backgroundColor: '#D9D9D9',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  
export default CuentaCliente;