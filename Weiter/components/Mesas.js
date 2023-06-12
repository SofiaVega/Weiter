import React, { useState, useEffect } from 'react';
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
  const [tableData, setTableData] = useState({
    tableHead: ['No.', 'Estado', 'Acción'],
    tableData: [],
  });
  const handleClick = () => {
    setActive(!active);
    setData(data);
    
  };
  
  const [rows, setRows] = useState([])
  const onAbrirMesa = () => {
    //pasar el id del children (row) para editar solo esa

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
  console.log("aver ")

  // console.log(starCountRef)
  console.log(tableIds)
  console.log(rows)
  if (tableData.tableData.length == 0){
    setTableData({
      tableHead: ['No.', 'Estado', 'Acción'],
      tableData: rows,
    })
  }
  if (tableIds.length == 0){
    console.log("data from firebase")
    setTableData({
      tableHead: ['No.', 'Estado', 'Acción'],
      tableData: rows,
    })
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
          console.log(ids[i]);
          new_rows.push(
            [ids[i], 'Cerrada', <Button onPress={handleClick} title="Abrir Mesa" color={active ? "black" : "#03ea60"}></Button>]);
        }
        setRows(new_rows);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
    }, [tableIds, rows, tableData]);
  
  // const starCountRef = ref(firebaseDB, 'mesa/mesaId');

  return (

    <>
    <View style={styles.containerView}>
    <Text style={styles.textTitle}>Restaurante</Text>
    {/* <Text> Value: {starCountRef}</Text> */}
    </View>
      <View style={styles.container}>
          <Table>
              <Row data={tableData.tableHead} style={styles.head} textStyle={styles.headText} />
              <Rows data={tableData.tableData} textStyle={styles.text} />
          </Table>
      </View>
    </>
  )
}


export default Mesas
