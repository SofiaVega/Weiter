import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_live_51NHcToHeDagzFAimyQJrSSjwsms6l8NMgSRkH3Be3TYlxdy5a5bJwXMTxjiQh8KZS6ryUovhcbIggEtSaMeESY6O00rpayVJej";
const SECRET_KEY = "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";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000, //lowest denomination of particular currency
        currency: "mxn",
        payment_method_types: ["card"], //by default
      });
  
      const clientSecret = paymentIntent.client_secret;
  
      res.json({
        clientSecret: clientSecret,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });