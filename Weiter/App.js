import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Mesas from './components/Mesas';
import EditarOrdenMesa from './components/EditarOrdenMesa';


export default function App() {
  return (
    <>
      {/* Aquí pongo el componente para poder render it */}
      <Mesas></Mesas>
      {/* <EditarOrdenMesa></EditarOrdenMesa> */}
    </>
  );
}


