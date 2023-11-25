import mongoose from "mongoose" 


var companySchema = new mongoose.Schema({
   companyName: {
    type: String,
    required: true,
  },
  AdminName: {
    type: String,
    required: true,
  },
  GSTNo: {
    type: Number,
    required: true,
  },
  businessAddress:{
    type:String
  },
  businessPhoneNumber:{
    type:Number
  },
  adminPhoneNumber:{
    type:Number
  },
  profileImg:{
    type:Array
  },
  companyLogo:{
    type:Array
  }
});

export default mongoose.model("Company", companySchema);