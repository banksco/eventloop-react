import mongoose from "mongoose";

const paymentMethodSchema= mongoose.Schema({

    user:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'users'
            },

            PayPal: {type: String},
            Stripe: {type: String},
},
{timestamps:true})

const PaymentMethod = mongoose.model('paymentMethod', paymentMethodSchema)
export default PaymentMethod