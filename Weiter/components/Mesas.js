import React, { useState } from 'react';
import { Button, StyleSheet, View, Text, Pressable } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, justifyContent: 'left', backgroundColor: '#ffffff' },
  head: { height: 50, backgroundColor: '#ffe0f0' },
  headText: { fontSize: 20, fontWeight: 'bold' , textAlign: 'center', color: 'black' },
  text: { margin: 10 },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
  }
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
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1, borderColor: 'gray' }}>
                <Row data={data.tableHead} style={styles.head} textStyle={styles.headText} />
                <Rows data={data.tableData} textStyle={styles.text} />
            </Table>
        </View>
    )
}

export default Mesas
