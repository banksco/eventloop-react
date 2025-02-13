import express from 'express'
import events from './data/Events.js'

const app=express();

app.get('/api/events',(req,res)=>{
    res.json(events)
})

app.get('/api/event/:id',(req,res)=>{
    const event=events.find(p=> p.id===req.params.id)
    res.json(event)
})

app.get('/api/category/:categ',(req,res)=>{
     const event =events.filter(e=>e.category===req.params.categ)
     res.json(event)
})



app.listen(7000,console.log('in server.js'))
