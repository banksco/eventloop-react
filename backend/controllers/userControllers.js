import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

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

export { authUser,registerNewUser };
