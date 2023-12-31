import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import generateRefreshToken from "../config/refreshToken.js";
import generateToken from "../config/jwtToken.js";
import {validateMongoDbId} from "../utils/validateMongoDbId.js";
import sendEmail from "./emailCtrl.js";
import crypto from "crypto"
import { log } from "console";


const registerUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const {phoneNo} = req.body;


  const findUser = await User.findOne({phoneNo});

  if (!findUser) {
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try {
      const newUser1 = {
        name: req.body.name,
        email: req.body.email,
        phoneNo:req.body.phoneNo,
        password: hashPassword,
      };

      const savedUser = await User.create(newUser1);
      
      if (savedUser) {
        const token=generateToken(savedUser?._id)
        console.log(token);
        const updateuser ={
          _id: savedUser?._id,
        name: savedUser?.name,
        email: savedUser?.email,
        phoneNo:savedUser?.phoneNo,
        cartData:savedUser?.cartData,
        token: token
        }  
        
        await User.findByIdAndUpdate(
          savedUser.id,
        {
          token: token,
        },
        {new: true}
        )

        

        res.status(201).json(updateuser)
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.json({
      error:"User Already Exists"
    })
    throw new Error("User Already Exists");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const {phoneNo, password} = req.body;
  // check if user exists or not
  const findUser = await User.findOne({phoneNo});
  console.log(findUser);
  if (findUser) {
    const ismatch = await bcrypt.compare(password, findUser.password);
    if (ismatch) {

      const token = await generateToken(findUser?._id);
      const isAdmin= findUser.role === "admin"
      if (isAdmin) {
        res.json({
          admin:true,
          url:"http://localhost:5173",
          token:token
        })
      
      }else{

        const updateuser = await User.findByIdAndUpdate(
          findUser.id,
          {
            token: token,
          },
          {new: true}
          );
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
          });
          res.json({
            _id: findUser?._id,
            admin:false,
            name: findUser?.name,
            email: findUser?.email,
            cartData:findUser?.cartData,
            token: token,
          });
        }
    }else{
      res.json({
        error:"Invalid Credentials"
      })
     throw new Error("Invalid Credentials");

    }
  } else {
    throw new Error("Invalid Credentials");
  }
});

// Get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const getUser = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getUserbyToken= asyncHandler(async (req, res) => {
  const {token} = req.params;
  console.log(token);

  try {
    const getaUser = await User.find({token});
    res.json(
      getaUser
    );
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a user

const deleteUser = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json(
      deleteaUser
    );
  } catch (error) {
    throw new Error(error);
  }
});

// Update a user

const updatedUser = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  // validateMongoDbId(_id);
  const findUser = await User.findOne({_id});
  if (req.body.name === "") {
    req.body.name=findUser.name 
  }
  if (req.body.phoneNo === "") {
    req.body.phoneNo=findUser.phoneNo 
  }
  if (req.body.address === "") {
    req.body.address=findUser.address 
  }

  if (req.body.pincode === "") {
    req.body.address=findUser.pincode 
  }

  if(req.body.password === ""){
    req.body.password=findUser.password
  }else{
    const salt = await bcrypt.genSalt(12);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
    

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name: req?.body?.name,
        email: req?.body?.email,
        password:req?.body?.password,
        cart: req?.body?.cart,
        pincode:req?.body?.pincode,
        phoneNo:req?.body?.phoneNo,
        address:req?.body?.address
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) {
    throw new Error("No Refresh Token in Cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({refreshToken});

  if (!user) {
    throw new Error(" No Refresh token present in db or not matched");
  }
  jwt.verify(refreshToken, "myjwtsecret", (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({accessToken});
  });
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No Refresh Token in Cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({refreshToken});
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:8080/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user)
  }
});



const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});


const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCartData=asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  

  try {
    const updatedCart = await User.findByIdAndUpdate(
      _id,
      {
        cartData: [{
          cart:req?.body?.cart,
          total_Price:req?.body?.total_price
        }
        ],
      },
      {
        new: true,
      }
    );
    console.log(updatedCart);
    res.json(updatedCart);
  } catch (error) {
    throw new Error(error);
  }
});

export {
  registerUser,
  loginUser,
  getallUser,
  getUserbyToken,
  getUser,
  deleteUser,
  updatedUser,
  handleRefreshToken,
  logout,
  forgotPasswordToken,
  resetPassword,
  updatePassword,
  getWishlist,
  saveAddress,
  updateCartData
};
