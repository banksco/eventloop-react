import express from 'express'
import asyncHandler from 'express-async-handler'
import Event from '../models/eventModel.js'

const router=express.Router()


router.get('/',asyncHandler(async(req,res)=>{
    const events=await (Event.find({}))
    res.json(events)
}))

router.get('/:id',asyncHandler(async(req,res)=>{
    
   const event= await( Event.findById(req.params.id))
 
   if(event){
    res.json(event)
   }
   else{
    res.status(404).json({message:'Event Not Found'})
   }
}))

router.get('/category/:categ',asyncHandler(async(req,res)=>{
    const paramsCategory=req.params.categ
    const events=await Event.find({category:paramsCategory})

    if(events){
        res.json(events)
    }
    else{
        res.status(404).json({message:'Events Not Found'})
    }

}))
export default router