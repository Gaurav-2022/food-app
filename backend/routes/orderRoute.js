import express from 'express'
import authMiddleWare from '../middleware/auth.js'

import  {placeOrder, verifyOrder,userOrders, listOrders,updataStatus}  from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleWare,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post('/userOrders',authMiddleWare,userOrders)
orderRouter.get("/list",listOrders)
orderRouter.post('/status',updataStatus)
export default orderRouter;