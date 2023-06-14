import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ref, get, child } from 'firebase/database'
import { firebaseDB } from '../firebaseConfig';


const CuentasAgrupadasClientes = ({navi}) => {
    const navigation = useNavigation();
    const [cuentas, setCuentas] = useState([]);
    const cuentasRef = useRef({});
    cuentasRef.current = cuentas;
    
    //Cargar mesas
    if(cuentas.length == 0){
        get(child(ref(firebaseDB),'restaurante1/mesas/')).then((snapshot) => {
            if (snapshot.exists()) {
              // setCuentas(snapshot.val().toJ)
              // cuentasRef.current = snapshot.val()
              // console.log(cuentasRef.current)

              console.log(snapshot.val());
              const prueba = snapshot.toJSON();
              const ids = Object.keys(prueba)
              console.log(prueba);
              console.log(ids)
              setCuentas(ids);

              
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
            <Text style={[styles.text,]} >Elige el número de tu mesa</Text>
            {/* {consoloe} */}
            {cuentas.map((cuenta, i)=>{
              return(
                <Pressable style = {styles.boton} onPress={() => navigation.navigate('cuentaCliente',i+1)}>
                    <Text style = {styles.smallText}>Mesa {i+1}</Text>
                </Pressable>
              );})}


            
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
  
export default CuentasAgrupadasClientes;