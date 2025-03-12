import express from 'express'
import { authUser } from '../controllers/userControllers.js'

const router = express.Router()

// @desc    Auth user and generate token 
// @route   POST/api/users/login
// @access  public

router.post('/login', authUser)

export default router