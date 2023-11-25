import Product from "../models/Product.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import {validateMongoDbId} from "../utils/validateMongoDbId.js";
import User from "../models/User.js";
import {cloudinaryUploadImg} from "../utils/Cloudinary.js";
import fs from "fs";

const createProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const slug = slugify(req.body.title);
   

    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const {path} = file;
      const newpath = await uploader(path);
      urls.push(newpath.url);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    const colors=JSON.parse(req.body.colors)
    
    let c=[]
    colors.map((item)=>{
      return c.push(item)
    })

    const colorAndImg = images.map((i, index) => {
      return {color: c[index], image: i};
    });

    const disCouPri = JSON.parse(req.body.discountedPrice);
    const product = {
      title: req.body.title,
      slug: slug,
      description: req.body.description,
      MRP: req.body.MRP,
      colorsAndImg: colorAndImg,
      discountedPrice: disCouPri,
      category: req.body.category,
    };

   
    const newProduct = await Product.create(product);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id);
  try {
   
    const slug = slugify(req.body.title);

    
    if (req.files) {
      const uploader = (path) => cloudinaryUploadImg(path, "images");
      const urls = [];
      const files = req?.files;

    for (const file of files) {
      const {path} = file;
      
      const newpath = await uploader(path);
      
      urls.push(newpath.url);
      fs.unlinkSync(path);
    }
     const Newimages = urls.map((file) => {
      return file;
     });
     
    const colors=JSON.parse(req.body.colors)
    
     let c=[]
     colors.map((item)=>{
      return c.push(item)
    })

     let immg=[]
     
     if (req.body.image) {
       immg.push(req.body.image)
     }
    
     Newimages.map((img)=>immg.push(img))
     
     console.log(immg)

     const colorAndImg = immg.map((i, index) => {
      return {color:c[index], image: i};
    });

    

    

     const updateProduct = await Product.findByIdAndUpdate(id, {
        $set: {
          
          colorsAndImg: colorAndImg,

        },
      },
      {new: true}
      );

  }
    

    if (req?.body?.discountedPrice) {
    const disCouPri = JSON.parse(req?.body?.discountedPrice);
      const updateProduct=await Product.findByIdAndUpdate(id,{
        $set:{
          discountedPrice: disCouPri,
        }
      },
      {new:true})
    }
    
    if (req.body.category) {
      const updateProduct=await Product.findByIdAndUpdate(id,{
        $set:{
          category: req.body?.category,
        }
      },
      {new:true})
    }

    const updateProduct = await Product.findByIdAndUpdate(id, {
      $set: {
        title: req.body?.title,
        slug: slug,
        description: req.body?.description,
        MRP: req.body?.MRP,
      },
    },
    {new: true}
    );
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  const {id} = req.params;
  try {
    validateMongoDbId(id);

    const findProduct = await Product.findById(id).populate("ratings.postedby");
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const {id} = req.params;
  try {
    validateMongoDbId(id);
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = {...req.query};
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  const {prodId} = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: {wishlist: prodId},
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: {wishlist: prodId},
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  const {star, prodId, comment} = req.body;
  console.log(prodId);
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: {$elemMatch: alreadyRated},
        },
        {
          $set: {"ratings.$.star": star, "ratings.$.comment": comment},
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      {new: true}
    ).populate("ratings.postedby");
    // await finalproduct.populate("ratings.postedby");
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});

export {
  createProduct,
  getaProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  addToWishlist,
  rating,
};
