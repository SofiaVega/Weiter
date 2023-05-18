import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

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

const ConfirmacionPagoCliente = () => {
    return (
        <>
            <View style={styles.textContainer}>
                <Text style={styles.texto}>¡ Su pago se ha procesado de forma exitosa !</Text>

                <Image source={require("../assets/greencheck.png")} style={styles.greencheck} />
            </View>
        </>
    )
}

export default ConfirmacionPagoCliente