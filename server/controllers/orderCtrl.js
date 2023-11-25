import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";


const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;


    try {
      // console.log(req.body)
      const {cart,total_price}=req.body

      const products=cart.map((item)=>{
        return {
          product:item.id,
          productPrice:item.price,
          count:item.quantity
        }
      })

      // console.log(products)
      const newOrder = await Order.create({
        products,
        totalPrice:total_price,
        orderby:_id
      });
      res.json(newOrder);
    } catch (error) {
      throw new Error(error);
    }
});

const getallOrder = asyncHandler(async (req, res) => {
    try {
      const getOrders = await Order.find().populate("products.product").populate("orderby","name email")
      res.json(getOrders);
    } catch (error) {
      throw new Error(error);
    }
});

const updateOrder = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
      
      const updateOrder = await Order.findByIdAndUpdate(id , {
        orderStatus:req.body.status
      }, {
        new: true,
      });
      res.json(updateOrder);
    } catch (error) {
      throw new Error(error);
    }
});


const getOrder = asyncHandler(async (req, res) => {
    const {id} = req.params;
    
    try {
      const getaOrder = await Order.findById(id).populate("products.product").populate("orderby","name email")
      res.json(getaOrder)
    } catch (error) {
      throw new Error(error);
    }
});

const getOrderByUserId=asyncHandler(async (req, res) => {
  const {id} = req.params;
  
  try {
    const getaOrder = await Order.find({orderby:id}).populate("products.product").populate("orderby","name email")
    res.json(getaOrder)
  } catch (error) {
    throw new Error(error);
  }
});


const deleteOrder = asyncHandler(async (req, res) => {
    const {id} = req.params;
   
    try {
      const deleteOrder = await Order.findByIdAndDelete(id);
      res.json(deleteOrder);
    } catch (error) {
      throw new Error(error);
    }
});


const totalSales=asyncHandler(async(req,res)=>{
    const totalsales=await Order.aggregate(
        [
            {$group:{_id:null,totalsales:{$sum:"$totalPrice"}}}
        ]
    )

    res.send({totalSales:totalsales.pop().totalsales})
})


const totalOrder=asyncHandler(async(req,res)=>{
    const orderCount=await Order.countDocuments()

    res.send({totalOrder:orderCount})
})


export {createOrder,getallOrder,getOrder,totalSales,totalOrder,updateOrder,deleteOrder,getOrderByUserId}