import express from 'express'
import { authUser, getProfileInfo, registerNewUser } from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'
import { addShipAddress, getShipAddress } from '../controllers/shippingController.js'

const router = express.Router()

// @desc    Auth user and generate token 
// @route   POST/api/users/login
// @access  public

router.post('/login', authUser)


//@desc save shiiping address
//@route POST /api/users/saveAddress
//@access Private
router.route('/saveAddress').post(protect,addShipAddress)


//@desc register new user
//@route /api/users/register
//@access public
router.post('/register',registerNewUser)

router.route('/getAddress').get(protect,getShipAddress)

router.route('/getProfileInfo').get(protect,getProfileInfo)

export default router