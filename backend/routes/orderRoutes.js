import express from 'express'
import { addOrderItems, findOrderById, orderPaymentUpdate } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
import { processStripePayment } from '../controllers/stripeController.js'
const router=express.Router()


//@desc add all cart items to order db
//@Route POST/api/orders/
//@access Protected
router.route('/').post(protect,addOrderItems)


//@desc find order by Id
//@Route GET/api/orders/:id
//@access Protected
router.route('/:id').get(protect,findOrderById)


//@desc update payment details for order
//@Route PUT/api/orders/:id/pay
//@access Protected
router.route('/:id/pay').put(protect,orderPaymentUpdate)

//@desc STRIPE API
//@Route POST/api/orders/:id/stripepay
//@access Protected
router.route('/:id/stripepay').post(protect, processStripePayment);



export default router