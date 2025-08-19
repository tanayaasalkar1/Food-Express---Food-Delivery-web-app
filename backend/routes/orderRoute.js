import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder, userOrders, verifyPayment, listOrders, updateStatus } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.post("/verify_payment",  verifyPayment)
orderRouter.post("/user_orders",  authMiddleware, userOrders)
orderRouter.get("/list_orders", listOrders)
orderRouter.post("/status", updateStatus)

export default orderRouter