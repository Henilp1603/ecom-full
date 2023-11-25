import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import Category from "../models/Category.js";

const createCategory=asyncHandler(async (req, res) => {
    try {
      const newCategory = await Category.create(req.body);
      res.json(newCategory);
    } catch (error) {
      throw new Error(error);
    }
});

const getaCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
      validateMongoDbId(id);
  
      const findCategory = await Category.findById(id);
      res.json(findCategory);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deleteCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
      validateMongoDbId(id);
      const deleteCategory = await Category.findByIdAndDelete(id);
      res.json(deleteCategory);
    } catch (error) {
      throw new Error(error);
    }
  });

  const getAllCategory=asyncHandler(async (req, res) => {
    
    try {
        let category=[]
      const findCategory = await Category.find();
      findCategory.map((item)=>{
        return category.push(item.category)
      })
      res.json(findCategory);
    } catch (error) {
      throw new Error(error);
    }
  });

export {
    createCategory,
    getaCategory,
    deleteCategory,
    getAllCategory
    
};