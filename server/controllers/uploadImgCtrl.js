import { cloudinaryUploadImg } from "../utils/Cloudinary.js";
import fs from "fs"
import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";



const uploadImages = asyncHandler(async (req, res) => {
    const {id}=req.params
    
    try {
      const uploader = (path) => cloudinaryUploadImg(path, "images")
      const urls = [];
      const files = req.files
     
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        urls.push(newpath.url)
        fs.unlinkSync(path)
      }
      const images = urls.map((file) => {
        return file;
      });
      const finalproduct=await Product.findByIdAndUpdate(id,{
        images:images
      },{
        new:true
      })
      res.json(finalproduct);
    } catch (error) {
      throw new Error(error);
    }
});

export {uploadImages}