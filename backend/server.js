import express from 'express'
import dotenv from 'dotenv'
import eventRoutes from './routes/eventRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';
import { protect } from './middleware/authMiddleware.js'

const app = express()
dotenv.config()
connectDB()

app.use(express.json())
app.use('/api/events',eventRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders',orderRoutes)


//PayPal API
app.route('/api/config/paypal').get(protect, (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID))

/* error Middle ware code */
app.use(errorHandler)
app.listen(7000,console.log('in server.js'))
