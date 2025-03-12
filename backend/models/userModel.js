import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minLength:5},
    isAdmin:{type:Boolean,required:true,default:false},
},{timestamps:true})

// matching entered pw with account pw
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User=mongoose.model('users',userSchema)
export default User