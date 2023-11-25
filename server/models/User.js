import mongoose from "mongoose";
import crypto from "crypto"

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true,unique:true},
    phoneNo:{type:String},
    pincode:{type:String},
    password: {type: String, required: true},
    role: {type: String, default: "customer"},
    address:{type:String},
    cart: {type: Array, default: []},
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {type: String},
    token:{type:String}
  },
  {timestamps: true}
);

userSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resettoken;
};

export default mongoose.model("User", userSchema);
