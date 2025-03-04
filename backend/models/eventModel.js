import mongoose from 'mongoose';


const reviewSchema=mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String},
},{timestamps:true})


const eventSchema=mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
    title:{type:String,required:true},
    description:{type:String},
    date:{type:String,required:true},
    time:{type:String,required:true},
    location:{type:String,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
    tickets_available:{type:Boolean,required:true,default:false},
    ticket_price:{type:Number,required:true,default:0},
    countInStock: {
        type: Number,
        required: true,
        default:0
    },
    followers:{type:String},
    review:[reviewSchema]
},{timestamps:true})


const Event=mongoose.model('events',eventSchema)
export default Event