import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { ref, get, child, set, push, update } from 'firebase/database'
import { firebaseDB } from '../firebaseConfig';
import MenuRow from './MenuRow';

const MenuMesero = props => {
    const [nItems, setNItems] = useState([]);
    const numeroMesa = 1;

    //Cargar menu a pantalla
    if(nItems.length == 0){
      get(child(ref(firebaseDB),'restaurante1/menu/menus')).then((snapshot) => {
        if (snapshot.exists()) {
  
          const prueba = snapshot.toJSON();
          const data = JSON.parse(prueba);
          setNItems(data.items);
          console.log("AQUIIIIII")
        } else {
          console.log("No data available here");
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    const getPrecio = (nombreItem) => {
      for(let k in nItems){
        if(nItems[k].nombre == nombreItem){
          return nItems[k].precio
        }
      }
    }

    
    // Actualizar cantidad de los items en la cuenta de la mesa
    const handleCallback = (childData) => {
      const nombreItem = childData[0];
      const numeroItem = childData[1];
      const precioItem = getPrecio(nombreItem);
      var flag = false;

      get(child(ref(firebaseDB),'restaurante1/mesas/'+ numeroMesa + '/itemsMenu')).then((snapshot) => {

        if (snapshot.exists()) {
          const listaItems = snapshot.val();
          
          //Checar por si es el primero a insertar
          if (listaItems == ""){
            push(child(ref(firebaseDB),'restaurante1/mesas/' + numeroMesa + '/itemsMenu/'), {
              nombre: nombreItem,
              cantidad: numeroItem,
              precio: precioItem,
            });

          }else{
            flag = false;
            for (let k in listaItems) {

              if (listaItems[k].nombre == nombreItem){
                // Actualiza la cantidad para un item que ya se pidió
                update(child(ref(firebaseDB),'restaurante1/mesas/' + numeroMesa + '/itemsMenu/' + k + '/'), {
                   cantidad: numeroItem,
                });
                flag = true;
                break;

              }
            }

            if (flag == false){
              //Inserta un nuevo item a la cuenta
              push(child(ref(firebaseDB),'restaurante1/mesas/' + numeroMesa + '/itemsMenu/'), {
                nombre: nombreItem,
                cantidad: numeroItem,
                precio: precioItem,
              });
            }

            flag = false;

          }
        } else {
          console.log("No hay datos disponibles");
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
  
export default MenuMesero;