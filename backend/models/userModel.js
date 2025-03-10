import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minLength:5},
    isAdmin:{type:Boolean,required:true,default:false},
},{timestamps:true})

const User=mongoose.model('users',userSchema)
export default User