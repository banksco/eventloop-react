import asyncHandler from "express-async-handler";
import PaymentMethod from "../models/paymentMethodModel.js";

export const addPaymentMethod = asyncHandler(async (req, res) => {
  const  { paymentMethod } = req.body;

  if (!paymentMethod) {
    res.status(400).json({ message: 'Payment method is required' });
    return;
  }

  const addedPaymentMethod = new PaymentMethod({
    user: req.user._id,
    paymentMethod,
  });

  try {
    const createdPaymentMethod = await addedPaymentMethod.save();
    res.status(201).json(createdPaymentMethod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving payment method' });
  }
});