const functions = require('firebase-functions');
const express = require("express")
const cors = require("cors");
const { RepeatOneSharp } = require('@material-ui/icons');
const stripe = require("stripe")('sk_test_51IssDVGiAVe4jN7I7rEiBkHYEFwj8ZkHtEasqrc07ge04Uxj2u71ERXHiJuqPjxzJmM4CgjoFOeNwZxd3Z0U31Ay00uBPzxwLx')

//<-------API-------->

// - App config
const app = express()

//Middlewares
app.use(cors({origin: true}))
app.use(express.json())

//Api routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async(request, response) => {
    const total = request.query.total;
    console.log("payment request received: ", total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
    })
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//Listen command
exports.api = functions.https.onRequest(app)

//Example  endpoint
//http://localhost:5001/clone-89dfa/us-central1/api)

