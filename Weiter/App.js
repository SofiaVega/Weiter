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
import PagoStrippe from './components/PagoStrippe';
import { firebaseDB } from './firebaseConfig';
import { ref } from 'firebase/database';
import CuentasAgrupadasClientes from './components/CuentasAgrupadasClientes';
import StripeApp from "./src/StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";



const Stack = createNativeStackNavigator();


export default function App() {
  const starCountRef = ref(firebaseDB, 'mesa/mesaId');

  return (
    <>
      
    

      <NavigationContainer>
        <Stack.Navigator>
          {/* Mesero */}
          {/* <Stack.Screen name="editarOrdenMesa" component={EditarOrdenMesa} /> */}
           {/* <Stack.Screen name="Mesas" component={Mesas} />  */}
          <Stack.Screen name="CuentasAgrupadasClientes" component={CuentasAgrupadasClientes} /> 
          <Stack.Screen name="CuentaCliente" component={CuentaCliente} /> 
          {/* <Stack.Screen name="mesas" component={Mesas} /> */}
          
          <Stack.Screen name="MenuMesero" component={MenuMesero} />
          <Stack.Screen name="PagoStrippe" component={PagoStrippe} />
          {/* Cliente */}
          {/* <Stack.Screen name="CuentaCliente" component={CuentaCliente} />  */}
          <Stack.Screen name="ConfirmacionPago" component={ConfirmacionPagoCliente} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

