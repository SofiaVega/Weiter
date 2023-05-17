import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import Mesas from './components/Mesas';
import EditarOrdenMesa from './components/EditarOrdenMesa';
import CuentaCliente from './components/CuentaCliente';
import MenuMesero from './components/MenuMesero';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="mesas" component={Mesas} />
          <Stack.Screen name="editarOrdenMesa" component={EditarOrdenMesa} />
          <Stack.Screen name="cuentaCliente" component={CuentaCliente} />
          <Stack.Screen name="menuMesero" component={MenuMesero} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

