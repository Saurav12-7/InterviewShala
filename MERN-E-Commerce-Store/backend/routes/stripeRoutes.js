import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Initialize Stripe with environment variable or fallback for development
let stripe;
try {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_51Rp0b75zlD1FAnOGUGjHptj622xDQX1acOglk8y0E4rnMXmwi60nrfxiakhfML9hMAYtpitfwaajAHvYtnzTgnH600BD0RnbcL";
  stripe = new Stripe(stripeSecretKey);
  console.log("Stripe initialized successfully");
} catch (error) {
  console.error("Stripe initialization error:", error.message);
  // Create a mock stripe object to prevent crashes
  stripe = {
    checkout: {
      sessions: {
        create: async () => ({ url: "http://localhost:5173/payment-error" })
      }
    },
    customers: {
      create: async () => ({ id: "mock_customer" })
    },
    charges: {
      create: async () => ({ id: "mock_charge" })
    }
  };
}

// Create Stripe Checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { product, productType = "interview" } = req.body;
    
    console.log("Creating checkout session for:", product, "Type:", productType);

    // Use environment variables for URLs
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    let successUrl = `${baseUrl}/calendar-booking`; // Default for interviews
    let cancelUrl = `${baseUrl}/interview-product-cart`; // Default for interviews
    
    if (productType === "test") {
      successUrl = `${baseUrl}/quiz-redirect`;
      cancelUrl = `${baseUrl}/mocktest`;
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
    // Return a fallback response instead of crashing
    res.status(500).json({ 
      error: "Payment service temporarily unavailable",
      fallback: true,
      message: "Please try again later or contact support"
    });
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
    // Return a fallback response instead of crashing
    res.status(500).json({ 
      error: "Payment processing failed",
      fallback: true,
      message: "Please try again later or contact support"
    });
  }
});

export default router; 