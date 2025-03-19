import mongoose from "mongoose";

const shippingSchema=mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'users'
        },

        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true},
      
},
{timestamps:true})

const ShippingAddress = mongoose.model('shippingAddress',shippingSchema)
export default ShippingAddress