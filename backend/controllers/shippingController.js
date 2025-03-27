import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import ShippingAddress from "../models/shippingModel.js";

export const addShipAddress = asyncHandler(async (req, res) => {
  const { address, city, postalCode, country } = req.body;

  const addedaddress = new ShippingAddress({
    user: req.user._id,
    address,
    city,
    postalCode,
    country,
  });

  const createdAddress= await addedaddress.save();
  res.status(201).json(createdAddress)

});

export const getShipAddress=asyncHandler(async(req,res)=>{
  try{
  const id=req.user._id
  const user=await User.findById(id)
  const shippingAddress=await ShippingAddress.findOne({user:user._id})
  res.status(201).json(shippingAddress)}
  catch(error){
    throw new error("no shipping address")
  }
})
