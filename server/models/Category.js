import mongoose from "mongoose";


var categorySchema = new mongoose.Schema(
  {

    category: {
      type: String,
    }
   
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model("Category", categorySchema);
