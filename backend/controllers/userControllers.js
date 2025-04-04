import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Order from "../models/orderModel.js";
import ShippingAddress from "../models/shippingModel.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
});

const registerNewUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password),
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("unable to add user data");
  }
});

const getProfileInfo = asyncHandler(async (req, res) => {
  console.log("Entered");
  try {
    const id = req.user.id;

    const user = await User.findById(id).select("-password");
    //const order=await Order.findOne({user:req.user.id}).sort({ _id: -1 }).limit(3)
    const order = await Order.find({ user: req.user.id })
      .sort({ _id: -1 })
      .limit(3);
    const shippingAddress = await ShippingAddress.findOne({
      user: req.user.id,
    });

    return res.json({
      user,
      order,
      shippingAddress,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

const updateProfileInfo=asyncHandler(async (req, res) => {
  const { name, email, shippingAddress } = req.body;

  try {
    const user = await User.findById(req.user.id)

    if (name) user.name = name;
    if (email) user.email = email;
    if (shippingAddress) user.shippingAddress = shippingAddress;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

export { authUser,registerNewUser,getProfileInfo, updateProfileInfo };

