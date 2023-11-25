import express from "express"
import { createOrder, deleteOrder, getOrder, getallOrder, totalOrder, totalSales, updateOrder,getOrderByUserId } from "../controllers/orderCtrl.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";




const router=express.Router();

router.post("/create-order",authMiddleware,createOrder)
router.get("/all-order",getallOrder)
router.get("/get-order/:id",getOrder)
router.get("/get-user-orders/:id",getOrderByUserId)
router.put("/update-order/:id",updateOrder)
router.delete("/delete-order/:id",deleteOrder)

router.get("/total-sales",totalSales)
router.get("/total-order",totalOrder)

export default router
