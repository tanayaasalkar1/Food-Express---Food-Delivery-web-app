import express from 'express'
import { addToCart } from '../controllers/cartController.js'
import { removefromCart } from '../controllers/cartController.js'
import { getCart } from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js'

const cartRouter = express.Router();   //using this router we can create multiple endpoint

// api endpoints
cartRouter.post('/add', authMiddleware, addToCart)
cartRouter.post('/remove', authMiddleware, removefromCart)
cartRouter.post('/get', authMiddleware, getCart)

export default cartRouter;