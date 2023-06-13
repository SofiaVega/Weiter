import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, View, Text, Pressable } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { useNavigation } from "@react-navigation/native";
import { ref, get, child, database, update } from 'firebase/database'
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
    const mesaId = row_id + 1;
    console.log(rowsRef.current)
    update(child(ref(firebaseDB),'restaurante1/mesas/' + mesaId + '/'), {
      estado: 'abierta',
      itemsMenu: '',
    });
    const aux_arr = rowsRef.current
    aux_arr[row_id] = [row_id+1, 'Abierta', <Button title="Editar" onPress={() => navigation.navigate('menuMesero')} color='#C8B8FF' visible={false}>Editar</Button>]
    setRows([...aux_arr])

  }
  const onEliminar = (row_id) => {
    //pasar el id del children (row) para editar solo esa
    // change table data to state and create new array to modify it
    //var aux_arr = rows;
    //aux_arr[row_id] = ['2', 'Cerrada', <Button onPress={handleClick} title="Abrir Mesa" color={active ? "black" : "#03ea60"}></Button>];
    //setRows(aux_arr);
  };

  const resetCuentaMesa = (mesaId) => {
    console.log("Se borra la cuenta")
    update(child(ref(firebaseDB),'restaurante1/mesas/' + mesaId + '/'), {
      estado: 'cerrada',
      itemsMenu: '',
    });
    const aux_arr = rowsRef.current
    aux_arr[mesaId-1] = [mesaId, 'Cerrada', <Button onPress={handleClick} title="Abrir Mesa" color={active ? "black" : "#03ea60"}></Button>];
    setRows([...aux_arr])
  };
  //empezar todas como eliminar
  //leer ids del realtime firebase
  /*
  tableData: [
        ['1', 'Abierta', <Button title="Editar" onPress={() => navigation.navigate('menuMesero')} color='#C8B8FF' visible={false}>Editar</Button>],
        ['2', 'Pagada', <Button title="Eliminar" onPress={() => {resetCuentaMesa(1);}} color='#F9553A'>Cerrar Mesa</Button>],
        ['3', 'Cerrada', <Button onPress={handleClick} title="Abrir Mesa" color={active ? "black" : "#03ea60"}></Button>],
    ],
  */

  
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
                [ids[i], 'Pagada', <Button title="Eliminar" onPress={() => {resetCuentaMesa(ids[i]);}} color='#F9553A'>Cerrar Mesa</Button>]
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
