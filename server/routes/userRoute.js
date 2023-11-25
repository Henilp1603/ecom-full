import express from "express"
import { deleteUser, forgotPasswordToken, getUser, getUserbyToken, getWishlist, getallUser, handleRefreshToken, loginUser, logout, registerUser, resetPassword, saveAddress, updatedUser } from "../controllers/userCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";





const router=express.Router();


router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

router.get("/refresh",handleRefreshToken)
router.get("/logout",logout)

router.get("/all-users",getallUser)
router.get("/:id",getUser)
router.get("/token/:token",getUserbyToken)
router.delete("/user-delete/:id",deleteUser)
router.put("/edit-user",authMiddleware,updatedUser)
router.get("/all-wishlist",getWishlist)
router.put("/save-address",saveAddress)






export default router
