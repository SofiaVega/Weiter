import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Mesas from './components/Mesas';


export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Restaurante</Text>
        <StatusBar style="auto" />
      </View>
      <Mesas></Mesas>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#C8B8FF',
    fontFamily: 'Al Nile',
    fontSize: 40,
  },
});

