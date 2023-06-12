import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { ref, get, child, set, push } from 'firebase/database'
import { firebaseDB } from '../firebaseConfig';
import MenuRow from './MenuRow';

const CuentaCliente = props => {
    const [nItems, setNItems] = useState([]);
    const [cuenta, setCuenta] = useState([]);
    const numeroMesa = 1;
    const [isOrdered, setIsOrdered] = useState(false);

    get(child(ref(firebaseDB),'restaurante1/menu/menus')).then((snapshot) => {
      if (snapshot.exists()) {

        const prueba = snapshot.toJSON();
        const data = JSON.parse(prueba);
        setNItems(data.items);
      } else {
        console.log("No data available here");
      }
    }).catch((error) => {
      console.error(error);
    });


    const handleCallback = (childData) => {
      console.log(childData);
      const nombreItem = childData[0];
      const numeroItem = childData[1];
      
      get(child(ref(firebaseDB),'restaurante1/mesas/1/itemsMenu/nombre/' + nombreItem)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log("YA ESRA");

        } else {
          console.log("Se añade a la lista como nuevo");
          
          push(child(ref(firebaseDB),'restaurante1/mesas/' + numeroMesa + '/itemsMenu/'), {
            nombre: nombreItem,
            cantidad: numeroItem,
          });
        }
      }).catch((error) => {
        console.error(error);
      });
    }

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
            {nItems.map((item)=>{
              return <MenuRow nombre = {item.nombre} parentCallback ={handleCallback}  />
            })}
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