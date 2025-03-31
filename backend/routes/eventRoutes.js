import express from 'express'
import asyncHandler from 'express-async-handler'
import { fetchAllEvents, fetchEventsById } from '../controllers/eventControllers.js'

const router=express.Router()

//@desc fetch all events
//@routes /api/events/
//@access public
router.get('/',fetchAllEvents)
//@desc fetch events by id
//@routes /api/events/:id
//@access public
router.get('/:id',fetchEventsById)


export default router