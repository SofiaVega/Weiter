import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
import { ref, get, child, update } from 'firebase/database'
import { firebaseDB } from '../firebaseConfig';

//ADD localhost address of your server
//const API_URL = "https://weiter.onrender.com";
const API_URL = "https://47fd-131-178-102-168.ngrok-free.app";

const StripeApp = props => {
  console.log("llego a strip app")
  console.log(props)
  console.log(props.mesa)
  console.log(props.cantidad)

  const param = props.mesa;
  const paymentAmount = props.cantidad

  const pagarCuenta = () => {
    console.log("cuenta pagada")
    console.log(param)
    update(child(ref(firebaseDB),'restaurante1/mesas/' + param + '/'), {
      estado: 'cerrada',
      itemsMenu: '',
    });
    navigationPayment.navigate('ConfirmacionPago')

  }

  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const navigationPayment =useNavigation();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent/${paymentAmount}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Completa los datos de manera correcta");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("El pago no se pudo procesar");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
            

            Alert.alert('Pago exitoso', 'Gracias', [
                {
                  text: 'OK',
                  onPress: () => pagarCuenta(),
                },
              ]);

        } else if (paymentIntent) {
            alert("Payment Successful");
            console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Pagar" disabled={loading} />
    </View>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});