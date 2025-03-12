import express from 'express'
import dotenv from 'dotenv'
import eventRoutes from './routes/eventRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';

const app = express()
dotenv.config()
connectDB()

app.use(express.json())
app.use('/api/events',eventRoutes)
app.use('/api/users', userRoutes)



/* error Middle ware code */
app.use(errorHandler)
app.listen(7000,console.log('in server.js'))
