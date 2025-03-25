import asyncHandler from "express-async-handler";
import PaymentMethod from "../models/paymentMethodModel.js";

export const addPaymentMethod = asyncHandler(async (req, res) => {
  console.log("in backend"+req.body.paymentMethod)

  const addedPaymentMethod = new PaymentMethod({
    user: req.user._id,
    PayPal,
    Stripe,

  });

  const createdPaymentMethod= await addedPaymentMethod.save();
  res.status(201).json(createdPaymentMethod)

});
