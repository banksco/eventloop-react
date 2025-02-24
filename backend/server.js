import express from 'express'
import dotenv from 'dotenv'
import events from './data/Events.js'
import connectDB from './config/db.js';

const app = express()
dotenv.config()
connectDB()

app.get('/api/events',(req,res)=>{
    res.json(events)
})

app.get('/api/events/:id',(req,res)=>{
    const event=events.find(p=> p.id===req.params.id)
    res.json(event)
})

app.get('/api/events/category/:categ',(req,res)=>{
     const event =events.filter(e=>e.category===req.params.categ)
     res.json(event)
})



app.listen(7000,console.log('in server.js'))
