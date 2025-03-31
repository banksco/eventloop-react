// In your order controller or a separate payment controller
import Stripe from "stripe";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Store your secret key securely

// Endpoint to handle Stripe payment after receiving paymentMethod.id from frontend
export const processStripePayment = asyncHandler(async (req, res) => {
  try {
    const { orderId, paymentMethodId } = req.body;

    // 1. Fetch the order details from your database based on orderId
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.isPaid) {
      return res.status(400).json({ message: "Order is already paid" });
    }

    const amount = Math.round(order.totalPrice * 100); // Stripe uses cents
    const currency = "USD"; // Or your desired currency

    console.log("user" + req.user);
    const user = await User.findById(req.user);

    // 2. Create or retrieve the Stripe Customer
    let customer;
    if (user.stripeCustomerId) {
      customer = await stripe.customers.retrieve(user.stripeCustomerId);
    } else {
      customer = await stripe.customers.create({
        name: user.name,
        email: user.email,
      });
      user.stripeCustomerId = customer.id;
      await user.save();
    }

    // 3. Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customer.id,
      payment_method: paymentMethodId,
      confirm: true, // Confirm the PaymentIntent immediately
      off_session: false, // Indicates if the customer is present for the payment
      receipt_email: user.email,
      metadata: { orderId },
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    console.log("Stripe Payment Intent Created:", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      // 4. Update your database to mark the order as paid
      order.isPaid = true;
      order.paidAt = Date.now();
      // order.paymentMethod = 'Stripe';
      (order.paymentResult = {
        id: paymentIntent.id,
        status: paymentIntent.status,
        update_time: Date.now(),
        email_address: user.email,
      }),
        await order.save();

      res
        .status(200)
        .json({
          message: "Payment successful",
          paymentIntentId: paymentIntent.id,
        });
    } else if (
      paymentIntent.status === "requires_action" ||
      paymentIntent.status === "requires_payment_method"
    ) {
      res
        .status(200)
        .json({
          message: "Payment requires action",
          paymentIntentClientSecret: paymentIntent.client_secret,
        });
    } else {
      console.error("Stripe Payment Intent Failed:", paymentIntent);
      res
        .status(400)
        .json({
          message: "Payment failed",
          error: paymentIntent.last_payment_error?.message,
        });
    }
  } catch (error) {
    console.error("Error processing Stripe payment:", error);
    res
      .status(500)
      .json({ message: "Failed to process payment", error: error.message });
  }
});
