import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Button, Pressable } from 'react-native';
import OrderRow from './OrderRow';
import ModalPropina from './ModalPropina';
import { ref, get, child } from 'firebase/database'
import { firebaseDB } from '../firebaseConfig';

// https://run.mocky.io/v3/66ce4cb9-218c-49d2-a668-746d067cd415

// const callApi = async () => {
//     await fetch(
//       `https://run.mocky.io/v3/66ce4cb9-218c-49d2-a668-746d067cd415`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((res) => {
//         console.log("RESSSS");
//         console.log(res);
//         if (res.hasOwnProperty("error")){
//             setErrorMessage(true);
//         }
//         // error message if res is not success
//     });
//   };

const CuentaCliente = ({route, navigation}) => {
  const [items, setItems] = useState([]);
  const [mesero, setMesero] = useState("");
  const [fecha, setFecha] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [propina, setPropina] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const param = route.params;
  const [isModalOpen, setIsModalOpen, porcentajePropina] = useState(false);
  var loadedItemsCuenta = false;

  //Cargar cuenta
  if(loadedItemsCuenta == false){
    get(child(ref(firebaseDB),'restaurante1/mesas/' + param + '/itemsMenu/')).then((snapshot) => {
        if (snapshot.exists()) {
          // setCuentas(snapshot.val())
          console.log("AVER");
          console.log(snapshot.val())

        } else {
          console.log("No data available here");
        }
    }).catch((error) => {
        console.error(error);
    });
    loadedItemsCuenta = true;
  }

    return (
        <View style={[
          styles.container,
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: 'column',
          },
        ]}>
          <View style={{flex: 1,  flexDirection: 'row', padding: 20}}>
            <Text style={[styles.text,{flex: 1}]} >Orden #{param}</Text>
            <View style = {{flexDirection: 'column', flex: 1,}}>
              <Text style = {styles.smallText}> Fecha {fecha}</Text>
              <Text style = {styles.smallText}>Mesero: {mesero}</Text>
            </View>
          </View>

          {/* Items ordenados de la cuenta */}
          <View style={{flex: 3, }}>
            {items.map((item)=>{
              return <OrderRow cantidad = {1} nombre = {item.nombre} costo = {item.precio} />
            })}
          </View>


          {/* Acumulados de la cuenta */}
          <View style={{flex: 1,}}>
            <View style={{flex: 1, flexDirection: 'row', padding: 2}}>
              <Text style={{flex: 1}} >Subtotal:</Text>
              <Text style={{flex: 1, textAlign: 'right'}} >${subtotal.toFixed(2)}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding: 2}}>
              <Text style={{flex: 1}} >IVA:</Text>
              <Text style={{flex: 1, textAlign: 'right'}} >${(total*0.16).toFixed(2)}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding: 2}}>
              <Text style={{flex: 1}} >Propina:</Text>
              <Text style={{flex: 1, textAlign: 'right'}} >${((total*1.16)*propina*0.01).toFixed(2)}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding: 2}}>
              <Text style={{flex: 1}} >Total:</Text>
              <Text style={{flex: 1,textAlign: 'right'}} >${((total*1.16) + (total*1.16)*propina*0.01).toFixed(2)}</Text>
            </View>
          </View>
          <View style={{flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center',}}>
            <Pressable style = {styles.boton} onPress={() => setIsModalOpen(!isModalOpen)}>
              <Text style = {styles.smallText}>AGREGAR PROPINA</Text>
            </Pressable>
            <ModalPropina isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} propina={propina} setPropina = {setPropina}></ModalPropina>
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