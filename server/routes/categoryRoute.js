import express from "express"
import { createCategory, deleteCategory, getAllCategory, getaCategory } from "../controllers/categoryCtrl.js";






const router=express.Router();

router.post("/add-category",createCategory)
router.get("/one-category/:id",getaCategory)
router.get("/all-category",getAllCategory)
router.delete("/delete-category/:id",deleteCategory)



export default router
