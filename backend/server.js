import express from 'express'
import dotenv from 'dotenv'
import eventRoutes from './routes/eventRoutes.js'
import connectDB from './config/db.js';

const app = express()
dotenv.config()
connectDB()

app.use('/api/events',eventRoutes)




app.listen(7000,console.log('in server.js'))
