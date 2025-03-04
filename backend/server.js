import express from 'express'
import dotenv from 'dotenv'
import eventRoutes from './routes/eventRoutes.js'
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';

const app = express()
dotenv.config()
connectDB()

app.use('/api/events',eventRoutes)



/* error Middle ware code */
app.use(errorHandler)
app.listen(7000,console.log('in server.js'))
