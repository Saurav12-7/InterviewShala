const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51OXnvtSI8r8bgNcfLXrbd2WBOMMQRCgO7zIg0ZgDUTFHDmfDgV42AiyVvcqPWQSICvSHyOYzbBwuYvxPO80CU25W00Nuj56AJM");
const { v4: uuidv4 } = require('uuid');

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
    res.send("IT works at LearcodeOnline");
});

app.post("/payment", (req, res) => {
    const { product, token } = req.body; 
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);

    const idempotencyKey = uuidv4(); 
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        return stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`, 
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, { idempotencyKey });
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
});

// listen
app.listen(8282, () => console.log("Listening at port 8282"));
