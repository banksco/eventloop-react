import asyncHandler from "express-async-handler";
import PaymentMethod from "../models/paymentMethodModel.js";

export const addPaymentMethod = asyncHandler(async (req, res) => {
  const { paymentmethod } = req.body;

  const addPaymentMethod = new PaymentMethod({
    user: req.user._id,
    paymentMethod,
  });

  const createdAddress= await addPaymentMethod.save();
  res.status(201).json(createdPaymentMethod)

});
