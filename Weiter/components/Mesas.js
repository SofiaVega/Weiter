import React, { useState } from 'react';
import { Button, StyleSheet, View, Text, Pressable } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { useNavigation } from "@react-navigation/native";
import { ref, get, child, update } from 'firebase/database'
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
  const handleClick = () => {
    setActive(!active);
    setData(data);
    
  };
    
  const resetCuentaMesa = (mesaId) => {
    console.log("Se borra la cuenta")
    update(child(ref(firebaseDB),'restaurante1/mesas/' + mesaId + '/'), {
      itemsMenu: '',
    });
  };

  var tableData = {
    tableHead: ['No.', 'Estado', 'Acción'],
    tableData: [
        ['1', 'Abierta', <Button title="Editar" onPress={() => navigation.navigate('MenuMesero')} color='#C8B8FF' visible={false}>Editar</Button>],
        ['2', 'Pagada', <Button title="Eliminar" onPress={() => {resetCuentaMesa(1);}} color='#F9553A'>Cerrar Mesa</Button>],
        ['3', 'Cerrada', <Button onPress={handleClick} title="Abrir Mesa" color={active ? "black" : "#03ea60"}></Button>],
    ],
  };

  const [data, setData] = useState(tableData);
  const starCountRef = ref(firebaseDB, 'mesa/mesaId');
  console.log("aver ")
  // console.log(starCountRef)
  get(child(ref(firebaseDB),'mesas/mesa01')).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  return (

    <>
    <View style={styles.containerView}>
    <Text style={styles.textTitle}>Restaurante</Text>
    {/* <Text> Value: {starCountRef}</Text> */}
    </View>
      <View style={styles.container}>
          <Table>
              <Row data={data.tableHead} style={styles.head} textStyle={styles.headText} />
              <Rows data={data.tableData} textStyle={styles.text} />
          </Table>
      </View>
    </>
  )
}


export default Mesas
