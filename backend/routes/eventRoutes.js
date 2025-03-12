import express from 'express'
import { fetchAllEvents, fetchEventsById } from '../controllers/eventControllers'

const router=express.Router()

//@desc fetch all events
//@routes /api/events/
//@access public
router.get('/',fetchAllEvents)
//@desc fetch events by id
//@routes /api/events/:id
//@access public
router.get('/:id',fetchEventsById)

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