import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async(req, res, next) => {
    let token
    // check for auth key does it start with Bearer
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
     // if both conditions are met then proceed to try catch block
         try{
             //Validation of Token
             token = req.headers.authorization.split(' ')[1] 
             const decoded = jwt.verify(token, process.env.JWT_SECRET)
             // verify user exsits
             req.user =  await User.findById(decoded.id).select('-password')
             // goes to order API
             next()
 
          } catch(error){
          // unauthorized 
          res.status(401)
          throw new Error('Not authorized, invalid token')
         }    
     }
     // No Token Error
     if(!token){
         res.status(401)
         throw new Error('Not authorized, no token')
     }
 
 })
 export {protect}