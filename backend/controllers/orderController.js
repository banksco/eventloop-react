import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //Stop empty cart from proceeding to checkout
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    // saving model to data base
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    // save data to MongoDb
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const findOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

const orderPaymentUpdate = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    (order.isPaid = true), (order.paidAt = Date.now());
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
  }
});

export { addOrderItems, findOrderById,orderPaymentUpdate };
