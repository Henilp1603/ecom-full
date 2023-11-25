import mongoose from "mongoose";


var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },

    MRP: {
      type: Number,
      required: true,
    },
    discountedPrice:[
      {
        size:{type:String},
        price:{type:Number}
      }
    ],
    category: {
      type: Array,
    },
    colorsAndImg:[
      {
        color:{type:String},
        image:{type:Array}
      }
    ],
    quantity: {
      type: Number,
      default:1
    },
    totalQuantity:{
      type:Number
    },
    sold: {
      type: Number,
      default: 0,
    },
    tags: String,
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model("Product", productSchema);
