import express from 'express'
import { authUser } from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'
import { addShipAddress } from '../controllers/shippingController.js'

const router = express.Router()

// @desc    Auth user and generate token 
// @route   POST/api/users/login
// @access  public

router.post('/login', authUser)


//@desc save shiiping address
//@route POST /api/users/saveAddress
//@access Private
router.route('/saveAddress').post(protect,addShipAddress)

export default router