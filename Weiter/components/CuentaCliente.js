import React, { useState }  from 'react';
import {StyleSheet, Text, View, Button, Pressable } from 'react-native';
import OrderRow from './OrderRow';
import ModalPropina from './ModalPropina';

const CuentaCliente = props => {
  const [isModalOpen, setIsModalOpen, porcentajePropina] = useState(false);

    return (
        <View style={[
          styles.container,
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: 'column',
          },
        ]}>
          <View style={{flex: 1,  flexDirection: 'row', padding: 20}}>
            <Text style={[styles.text,{flex: 1}]} >Orden</Text>
            <View style = {{flexDirection: 'column', flex: 1,}}>
              <Text style = {styles.smallText} >Fecha</Text>
              <Text style = {styles.smallText}>Mesero</Text>
            </View>
          </View>
          <View style={{flex: 1, }}>
            <OrderRow cantidad = {1} nombre = "Hamburguesa" costo = {150} />
            <OrderRow cantidad = {1} nombre = "Hamburguesa" costo = {150} />
            <OrderRow cantidad = {1} nombre = "Hamburguesa" costo = {150} />
    
          </View>
          <View style={{flex: 1,}}>
            <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
              <Text style={{flex: 1}} >Subtotal:</Text>
              <Text style={{flex: 1, textAlign: 'right'}} >$1500</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
              <Text style={{flex: 1}} >IVA:</Text>
              <Text style={{flex: 1, textAlign: 'right'}} >$20</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
              <Text style={{flex: 1}} >Propina:</Text>
              <Text style={{flex: 1, textAlign: 'right'}} >0</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding: 20,}}>
              <Text style={{flex: 1}} >Total:</Text>
              <Text style={{flex: 1,textAlign: 'right'}} >$1540</Text>
            </View>
          </View>
          <View style={{flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center',}}>
            <Pressable style = {styles.boton} onPress={() => setIsModalOpen(!isModalOpen)}>
              <Text style = {styles.smallText}>AGREGAR PROPINA</Text>
            </Pressable>
            <ModalPropina isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} porcentajePropina={0}></ModalPropina>
            <Pressable style = {styles.boton}>
              <Text style = {styles.smallText}>PAGAR</Text>
            </Pressable>
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