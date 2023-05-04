import React, { useState } from 'react';
import { Button, StyleSheet, View, Text, Pressable } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

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
})

const tableData = {
    tableHead: ['No.', 'Estado', 'Acción'],
    tableData: [
        ['1', 'Abierta', <Button title="Editar" color='#C8B8FF'>Editar</Button>],
        ['2', 'Pagada', <Button title="Eliminar" color='#F9553A'>Eliminar</Button>],
        ['3', 'Cerrada', <Button title="Abrir Mesa" color='#03ea60'>Abrir Mesa</Button>],
    ],
};

const Mesas = () => {
    const [data, setData] = useState(tableData);
    return (
      <>
      <View style={styles.containerView}>
      <Text style={styles.textTitle}>Restaurante</Text>
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