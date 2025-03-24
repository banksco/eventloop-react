import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
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


const registerNewUser =asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    const existUser= await User.findOne({email})
if(existUser){
    res.status(400)
    throw new Error('User Already Exists')
}


const user= await User.create({
    name,
    email,
   password: bcrypt.hashSync(password)
    
    
})

if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        password:user.password,
        token:generateToken(user._id)
    })
}
else{
    res.status(400)
    throw new Error('unable to add user data')
}

})


const getProfileInfo=asyncHandler(async(req,res)=>{
  console.log("Entered")
try{
  const id=req.user.id
  
  const user=await User.findById(id).select('-password')
  console.log("in backend"+user)
  const order=await Order.findOne({user:req.user.id}).sort({ _id: -1 }).limit(1)

 const shippingAddress=await ShippingAddress.findOne({user:req.user.id})

return res.json({
  user,
  order,
  shippingAddress}
)
}
catch(error){
  throw new Error(error.message)
}


})

export { authUser,registerNewUser,getProfileInfo };




