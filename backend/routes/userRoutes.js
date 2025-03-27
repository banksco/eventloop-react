import express from 'express'
import { authUser, registerNewUser } from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'
import { addShipAddress, getShipAddress } from '../controllers/shippingController.js'
import { addPaymentMethod } from '../controllers/paymentMethodController.js'
import { getProfileInfo } from '../controllers/userControllers.js'
const router = express.Router()

// @desc    Auth user and generate token 
// @route   POST/api/users/login
// @access  public

router.post('/login', authUser)


//@desc save shiiping address
//@route POST /api/users/saveAddress
//@access Private
router.route('/saveAddress').post(protect,addShipAddress)


//@desc save payment method
//@route POST /api/users/savePaymentMethod
//@access Private
router.route('/savePaymentMethod').post(protect,addPaymentMethod)

//@desc register new user
//@route /api/users/register
//@access public
router.post('/register',registerNewUser)

router.route('/getAddress').get(protect,getShipAddress)

router.route('/getProfileInfo').get(protect,getProfileInfo)

export default router