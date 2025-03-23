import asyncHandler from "express-async-handler";
import PaymentMethod from "../models/paymentMethodModel.js";

export const addPaymentMethod = asyncHandler(async (req, res) => {
  const { paymentMethod } = req.body;

  const addedPaymentMethod = new PaymentMethod({
    user: req.user._id,
    paymentMethod,
  });

  const createdPaymentMethod= await addedPaymentMethod.save();
  res.status(201).json(createdPaymentMethod)

});
