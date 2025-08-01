import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Initialize Stripe with your secret key
const stripe = new Stripe("sk_test_51Rp0b75zlD1FAnOGUGjHptj622xDQX1acOglk8y0E4rnMXmwi60nrfxiakhfML9hMAYtpitfwaajAHvYtnzTgnH600BD0RnbcL");

// Create Stripe Checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { product, productType = "interview" } = req.body;
    
    console.log("Creating checkout session for:", product, "Type:", productType);

    // Determine success URL based on product type
    let successUrl = "http://localhost:5173/calendar-booking"; // Default for interviews
    let cancelUrl = "http://localhost:5173/interview-product-cart"; // Default for interviews
    
    if (productType === "test") {
      successUrl = "http://localhost:5173/quiz-redirect";
      cancelUrl = "http://localhost:5173/mocktest";
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name,
              description: product.description || "Mock test/interview service",
            },
            unit_amount: product.price * 100, // Convert to paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

// Process payment (for react-stripe-checkout compatibility) - keeping for backward compatibility
router.post("/payment", async (req, res) => {
  try {
    const { product, token } = req.body;
    
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);

    const idempotencyKey = uuidv4();

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const charge = await stripe.charges.create({
      amount: product.price * 100,
      currency: 'inr',
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchase of ${product.name}`,
      shipping: {
        name: token.card.name,
        address: {
          country: token.card.address_country
        }
      }
    }, { idempotencyKey });

    res.status(200).json(charge);
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router; 