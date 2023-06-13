import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, View, Text, Pressable } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { useNavigation } from "@react-navigation/native";
import { ref, get, child, database } from 'firebase/database'
import { firebaseDB } from '../firebaseConfig';

const styles = StyleSheet.create({
  container: { flex: 5, justifyContent: 'top', backgroundColor: '#ffffff' },
  head: { height: 50, backgroundColor: '#F3EBD7' },
  headText: { fontSize: 20, fontWeight: 'bold' , textAlign: 'center', color: 'black' },
  text: { margin: 30, fontSize: 20 },
  textTitle: {
    fontWeight: 'bold',
    color: '#C8B8FF',
    fontFamily: 'Al Nile',
    fontSize: 40,
  },
  containerView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#03ea60'
  }
})

const Mesas = () => {
  const navigation = useNavigation();
  const [active, setActive] = useState(false);
  const [tableIds, setTableIds] = useState([])
  const [rows, setRows] = useState()
  const rowsRef= useRef({});
  rowsRef.current = rows;
  const onAbrirMesa = (row_id) => {
    //pasar el id del children (row) para editar solo esa
    console.log("abrir mesa")
    console.log(rows)
    console.log(rowsRef.current)
    const aux_arr = rowsRef.current
    aux_arr[row_id] = [row_id+1, 'Abierta', <Button title="Editar" onPress={() => navigation.navigate('menuMesero')} color='#C8B8FF' visible={false}>Editar</Button>]
    setRows([...aux_arr])
    /*
    const nextRows = rows.map(obj => {
      console.log("holaa")
      console.log(obj)
      if (obj[0] === row_id) {
        // Increment the clicked counter
        return [row_id, 'Abierta', <Button title="Editar" onPress={() => navigation.navigate('menuMesero')} color='#C8B8FF' visible={false}>Editar</Button>];
      } else {
        // The rest haven't changed
        return obj;
      }
    });
    console.log("next rows")
    console.log(nextRows);
    setRows(nextRows);
    */

  }
  const onEliminar = (row_id) => {
    //pasar el id del children (row) para editar solo esa
    // change table data to state and create new array to modify it
    //var aux_arr = rows;
    //aux_arr[row_id] = ['2', 'Cerrada', <Button onPress={handleClick} title="Abrir Mesa" color={active ? "black" : "#03ea60"}></Button>];
    //setRows(aux_arr);
  };

  //empezar todas como eliminar
  //leer ids del realtime firebase

  
  useEffect(() => {
    console.log("hola")

  // console.log(starCountRef)
    console.log(tableIds)
    console.log("rows")
    console.log(rows)
    if (tableIds.length == 0){
      console.log("data from firebase")
      get(child(ref(firebaseDB),'restaurante1/mesas')).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const prueba = snapshot.toJSON();
          const ids = Object.keys(prueba)
          console.log(prueba);
          console.log(ids)
          setTableIds(ids);
          console.log(tableIds);
          var new_rows = [];
          for (let i = 0; i < ids.length; i++) {
            const estado = prueba[ids[i]]["estado"]
            if (estado == "cerrada"){
              new_rows.push(
                [ids[i], 'Cerrada', <Button onPress={()=>onAbrirMesa(i)} title="Abrir Mesa" color={active ? "black" : "#03ea60"}></Button>]);
            } else if (estado == "abierta") {
              new_rows.push(
                [ids[i], 'Abierta', <Button title="Editar" onPress={() => navigation.navigate('menuMesero')} color='#C8B8FF' visible={false}>Editar</Button>]
              )
            } else if (estado == "pagada") {
              new_rows.push(
                [ids[i], 'Abierta', <Button title="Editar" onPress={() => navigation.navigate('menuMesero')} color='#C8B8FF' visible={false}>Editar</Button>]
              )
            }
          }
          setRows([...new_rows]);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    console.log("rows")
    console.log(rows)
    }, [tableIds, rows]);
  
  // const starCountRef = ref(firebaseDB, 'mesa/mesaId');

  return (

    <>
    <View style={styles.containerView}>
    <Text style={styles.textTitle}>Restaurante</Text>
    {/* <Text> Value: {starCountRef}</Text> */}
    </View>
      <View style={styles.container}>
          <Table>
              <Row data={['No.', 'Estado', 'Acción']} style={styles.head} textStyle={styles.headText} />
              <Rows data={rows} textStyle={styles.text} />
          </Table>
      </View>
    </>
  )
}


export default Mesas
