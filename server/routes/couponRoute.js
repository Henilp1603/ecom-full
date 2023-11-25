import express from "express"
import { createCoupon, getAllCoupons, getCoupon } from "../controllers/couponCtrl";



const router=express.Router();


router.post("/create-coupon",createCoupon)
router.get("/get-coupon",getCoupon)
router.get("/all-coupon",getAllCoupons)



export default router
