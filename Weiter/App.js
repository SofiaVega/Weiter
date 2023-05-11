import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import Mesas from './components/Mesas';
import EditarOrdenMesa from './components/EditarOrdenMesa';
import CuentaCliente from './components/CuentaCliente';
import MenuMesero from './components/MenuMesero';

export default function App() {
  return (
    <>
      {/* Aquí pongo el componente para poder render it */}
      <Mesas></Mesas>
      {/* <EditarOrdenMesa></EditarOrdenMesa> */}
      {/* <CuentaCliente></CuentaCliente> */}
    </>
  );
}

