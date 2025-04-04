import mongoose, { mongo } from 'mongoose'
 
 const orderSchema = mongoose.Schema({
   user: {
     type: mongoose.Schema.Types.ObjectId,
     required: true,
     ref: 'users'
   },
   orderItems: [{
     title: {type: String, required: true},
     qty: {type: Number, required: true},
     image: {type: String, required: true},
     ticket_price: {type: Number, required: true},
     id: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'events'
     }
   }],
   shippingAddress: {
     type:mongoose.Schema.Types.ObjectId,
     ref:'shippingAddress'
   },
   paymentMethod: {
     type: mongoose.Schema.Types.ObjectId,
     ref:'paymentMethod'
   },
   paymentResult: {
     id: {type: String},
     status: {type: String},
     update_time: {type: String},
     email_address: {type: String}
   },
   itemsPrice: {
     type: Number,
     required: true,
     default: 0.0
   },
   taxPrice: {
     type: Number,
     required: true,
     default: 0.0
   },
   shippingPrice: {
     type: Number,
     required: true,
     default: 0.0
   },
   totalPrice: {
     type: Number,
     required: true,
     default: 0.0
   },
   isPaid: {
     type: Boolean,
     required: true,
     default: false
   },
   paidAt: {
     type: Date
   },
   isDelivered: {
    type: Boolean,
     required: true,
     default: false
   },
   deliveredAt: {
     type: Date
   },    
 },
 {
   timestamps: true
 })
 
 const Order = mongoose.model('orders', orderSchema)
 
 export default Order