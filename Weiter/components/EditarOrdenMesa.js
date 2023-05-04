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
    tableData: [
        ['Hamburguesas con papa', <Button title="" color='#C8B8FF'>Editar</Button>],
        ['Hot dog especial', <Button title="" color='#F9553A'>Eliminar</Button>],
        ['Burrito de carne con queso', <Button title="" color='#03ea60'>Abrir Mesa</Button>],
    ],
};

const EditarOrdenMesa = () => {
    const [data, setData] = useState(tableData);
    return (
        <>
        <View style={styles.containerView}>
        <Text style={styles.textTitle}>Menú</Text>
        </View>
        <View style={styles.container}>
            <Table>
                <Rows data={data.tableData} textStyle={styles.text} />
            </Table>
            <Button title="Guardar" color='#C8B8FF'></Button>
        </View>
        </>
    )
}

export default EditarOrdenMesa
