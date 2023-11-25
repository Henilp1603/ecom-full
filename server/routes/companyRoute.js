import express from "express"
import { createCompanyDetail, getAllCompany, updateCompanyDetail } from "../controllers/companyCtrl.js";
import { uploadPhoto } from "../middlewares/uploadImgaes.js";





const router=express.Router();

router.post("/create-company",uploadPhoto.array("images",10),createCompanyDetail)
router.get("/all-company",getAllCompany)
router.put("/update-company/:id",uploadPhoto.array("images",10),updateCompanyDetail)


export default router
