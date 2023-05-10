import React, { useState } from 'react';
import {Text, Modal, View, Button, Pressable, StyleSheet, SafeAreaView, OrderRow } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function ModalPropina({isModalOpen, setIsModalOpen, porcentajePropina}) {
    const [selectedValue, setSelectedValue] = useState("0%");

    const handleSubmit = () => {
        setIsModalOpen(!setIsModalOpen)
        porcentajePropina = selectedValue
    }

    return(
        <>
            <Modal visible={isModalOpen} transparent={true} animationType='fade'>
                <View style={styles.modalContainer}>
                    <View style={styles.modalStyle}>
                        <Text style={styles.text} > PROPINA </Text>
                        <Picker selectedValue={selectedValue}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                >
                            <Picker.Item label="0%" value="0" />
                            <Picker.Item label="10%" value="10" />
                            <Picker.Item label="15%" value="15" />
                            <Picker.Item label="20%" value="20" />
                        </Picker>
                        <Pressable style = {styles.boton} onPress={handleSubmit}>
                            <Text style={styles.textBoton}>Guardar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = {
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    text: {
        color: '#C8B8FF',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    modalStyle: {
        backgroundColor: 'white',
        margin: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        padding: 10,
    },
    boton: {
        padding: 10,
        margin: 10,
        color: '#C8B8FF',
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBoton: {
        fontWeight: 'bold',
        color: '#C8B8FF',
        fontFamily: 'Al Nile',
        fontSize: 20,
      },
}