import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import Mesas from './components/Mesas';
import EditarOrdenMesa from './components/EditarOrdenMesa';
import CuentaCliente from './components/CuentaCliente';
import MenuMesero from './components/MenuMesero';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConfirmacionPagoCliente from './components/ConfirmacionPagoCliente';
import { firebaseDB } from './firebaseConfig';
import { ref } from 'firebase/database'
import CuentasAgrupadasClientes from './components/CuentasAgrupadasClientes';


const Stack = createNativeStackNavigator();


export default function App() {
  const starCountRef = ref(firebaseDB, 'mesa/mesaId');

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Mesero */}
          {/* <Stack.Screen name="editarOrdenMesa" component={EditarOrdenMesa} /> */}
          {/* <Stack.Screen name="mesas" component={Mesas} /> */}
          <Stack.Screen name="cuentasAgrupadasClientes" component={CuentasAgrupadasClientes} /> 
          <Stack.Screen name="cuentaCliente" component={CuentaCliente} /> 
          {/* <Stack.Screen name="mesas" component={Mesas} /> */}
          
          <Stack.Screen name="menuMesero" component={MenuMesero} />

          {/* Cliente */}
          {/* <Stack.Screen name="cuentaCliente" component={CuentaCliente} />  */}
          <Stack.Screen name="confirmacionPago" component={ConfirmacionPagoCliente} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

