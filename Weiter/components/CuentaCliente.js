import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, Text, View, Button, Pressable } from 'react-native';
import OrderRow from './OrderRow';
import ModalPropina from './ModalPropina';
import { ref, get, child, update } from 'firebase/database'
import { firebaseDB } from '../firebaseConfig';
import { firestoreDB } from '../firebaseConfig';
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const CuentaCliente = ({route, navigation}) => {
  const [items, setItems] = useState([]);
  const itemsRef = useRef({});
  itemsRef.current = items;
  const [mesero, setMesero] = useState("");
  const [fecha, setFecha] = useState("");
  const [propina, setPropina] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const param = route.params;
  const [isModalOpen, setIsModalOpen, porcentajePropina] = useState(false);
  const [info,setInfo] = useState([]);
  const infoRef = useRef({});
  infoRef.current = info;
  const [subtotal,setSubtotal] = useState(0);
  const subtotalRef = useRef({});
  subtotalRef.current = subtotal;
  const navigationStrippe = useNavigation();

  const pagarCuenta = async() => {
    
    const pedidos = {};
    const tot = (subtotal + (subtotal*0.16) + (subtotal*propina*0.01));
    const fechaActual = new Date();
    const regRef = collection(firestoreDB, "registros");
    const id = param+fechaActual;
    

    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const item = items[key];
        const nombre = item.nombre;
        const cantidad = item.cantidad;
    
        pedidos[nombre] = cantidad;
      }
    };
    await setDoc(doc(regRef, id), {
      name: `mesa${param}`, pedidos: pedidos, date: fechaActual, country: "Mexico", total: tot, propina: propina});

    //console.log("items",items);
    /*
    update(child(ref(firebaseDB),'restaurante1/mesas/' + param + '/'), {
      estado: 'cerrada',
      itemsMenu: '',
    });*/

    navigationStrippe.navigate('PagoStrippe', param)
  }
  //Cargar cuenta
  if(items.length == 0){
    get(child(ref(firebaseDB),'restaurante1/mesas/' + param + '/itemsMenu/')).then((snapshot) => {
      if (snapshot.exists()) {

        setItems(snapshot.val())

        for(let k in snapshot.val()){
          info.push([snapshot.val()[k].nombre,snapshot.val()[k].cantidad,snapshot.val()[k].precio])
          subtotalRef.current += (snapshot.val()[k].cantidad * snapshot.val()[k].precio)
        }
        setSubtotal(subtotalRef.current)

      } else {
        console.log("No data available here");
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
          <View style={{flex: 1,  flexDirection: 'row', padding: 20}}>
            <Text style={[styles.text,{flex: 1}]} >Orden #{param}</Text>
            <View style = {{flexDirection: 'column', flex: 1,}}>
              <Text style = {styles.smallText}> Fecha {fecha}</Text>
              <Text style = {styles.smallText}>Mesero: {mesero}</Text>
            </View>
          </View>

          <View style={{flex: 3, }}>
            {infoRef.current.map((item) => {
              return <OrderRow cantidad = {item[1]} nombre = {item[0]} costo = {item[2]}/>
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
              <Text style={{flex: 1, textAlign: 'right'}} >${(subtotal*0.16).toFixed(2)}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding: 2}}>
              <Text style={{flex: 1}} >Propina:</Text>
              <Text style={{flex: 1, textAlign: 'right'}} >${(subtotal*propina*0.01).toFixed(2)}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding: 2}}>
              <Text style={{flex: 1}} >Total:</Text>
              <Text style={{flex: 1,textAlign: 'right'}} >${ (subtotal + (subtotal*0.16) + (subtotal*propina*0.01)).toFixed(2)}</Text>
            </View>
          </View>
          <View style={{flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center',}}>
            <Pressable style = {styles.boton} onPress={() => setIsModalOpen(!isModalOpen)}>
              <Text style = {styles.smallText}>AGREGAR PROPINA</Text>
            </Pressable>
            <ModalPropina isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} propina={propina} setPropina = {setPropina}></ModalPropina>
            {/* <Pressable onPress={() => {navigationStrippe.navigate('PagoStrippe')}} style = {styles.boton}> */}
            <Pressable style = {styles.boton} onPress = {pagarCuenta}>
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