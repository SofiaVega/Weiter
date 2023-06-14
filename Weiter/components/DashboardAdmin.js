import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { firestoreDB } from '../firebaseConfig';
import { Table, Row, Rows } from 'react-native-table-component';

const styles = StyleSheet.create({
    texto: {
        color: '#C8B8FF',
        fontFamily: 'Al Nile',
        fontSize: 30,
        paddingBottom: 30,
    },
    textContainer: {
        padding: 30,
        flex: 1,
        justifyContent: 'center',
    },
    greencheck: {
        width: 100, 
        height: 100, 
        alignSelf: 'center',
    },
})

const DashboardAdmin = () => {

    const [infoPedido,setInfoPedido] = useState([]);
    const infoPedidoRef = useRef([]);
    infoPedidoRef.current = infoPedido;

    
    const displayInstances = async() => {
        if(infoPedido.length == 0){
            const querySnapshot = await getDocs(collection(firestoreDB, "registros"));
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log(`${doc.id} => ${data.country}`);
                console.log(`${doc.id} => ${data.name}`);
                console.log(`${doc.id} => ${data.date}`);

                // infoPedido.push([data.date, data.name]);
                setInfoPedido([data.date, data.name])

                for (const pedido in data.pedidos) {
                console.log(`${doc.id} => ${pedido}: ${data.pedidos[pedido]}`);
                }
                console.log(`${doc.id} => ${data.propina}`);
                console.log(`${doc.id} => ${data.total}`);
                console.log(`${doc.id} => ${doc.data()}`);
            });
        }

        console.log(infoPedido)
        console.log(infoPedidoRef.current)

        return (
            <>
                <Text style={styles.texto}>Dashboard Admin</Text>
    
                <Table>
                  <Row data={['Fecha', 'Mesa']} style={styles.head} textStyle={styles.headText} />
                  {/* <Rows data={infoPedidoRef.current}  /> */}
                </Table>
            </>
        )
    }
    
    return (
        <>
            <Text style={styles.texto}>Dashboard Admin</Text>

            {displayInstances()}
        </>
    )
    
}


export default DashboardAdmin