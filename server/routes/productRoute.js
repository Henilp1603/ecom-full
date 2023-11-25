import express from "express"
import { addToWishlist, createProduct, deleteProduct, getAllProduct, getaProduct, rating, updateProduct } from "../controllers/productCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { productImgResize, uploadPhoto } from "../middlewares/uploadImgaes.js";
import { uploadImages } from "../controllers/uploadImgCtrl.js";



const router=express.Router();

router.put("/upload-img/:id",uploadPhoto.array("images",10),uploadImages)
router.post("/create-product",uploadPhoto.array("images",10),createProduct)
router.get("/get-product/:id",getaProduct)
router.get("/all-product",getAllProduct)
router.put("/update-product/:id",uploadPhoto.array("images",10),updateProduct)
router.delete("/delete-product/:id",deleteProduct)

router.put("/wishlist",authMiddleware,addToWishlist)
router.put("/ratings",authMiddleware,rating)


export default router
