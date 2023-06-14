import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import StripeApp from "../src/StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";

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

const PagoStrippe = ({route}) => {
    return (

        <StripeProvider publishableKey="pk_live_51NHcToHeDagzFAimyQJrSSjwsms6l8NMgSRkH3Be3TYlxdy5a5bJwXMTxjiQh8KZS6ryUovhcbIggEtSaMeESY6O00rpayVJej">
        <StripeApp mesa= {route.params} />
        </StripeProvider>
  
    )
}

export default PagoStrippe