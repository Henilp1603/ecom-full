import Company from "../models/Company.js";
import asyncHandler from "express-async-handler";
import {validateMongoDbId} from "../utils/validateMongoDbId.js";
import {cloudinaryUploadImg} from "../utils/Cloudinary.js";
import fs from "fs";

const createCompanyDetail = asyncHandler(async (req, res) => {
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

  const companyData = {
    companyName: req.body.companyName,
    AdminName: req.body.AdminName,
    GSTNo: req.body.GSTNo,
    businessAddress: req.body.businessAddress,
    businessPhoneNumber: req.body.businessPhoneNumber,
    adminPhoneNumber: req.body.adminPhoneNumber,
    profileImg: [images[0]],
    companyLogo: [images[1]],
  };

  try {
    const newCompany = await Company.create(companyData);
    res.json(newCompany);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCompany = asyncHandler(async (req, res) => {
  try {
    const company = await Company.find();
    res.json(company);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCompanyDetail = asyncHandler(async (req, res) => {
  const {id} = req.params;
      console.log(req.body)
      console.log(req.files)
  try {
    if (req.files) {
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

      if (req.body.isProfileUpdate === "true" && req.body.isCompanyUpdate === "false") {
        const updateCompanyData = await Company.findByIdAndUpdate(
          id,
          {
            $set: {
              profileImg: [images[0]],
            },
          },
          {new: true}
        );
      }
      
      if (req.body.isCompanyUpdate === "true" && req.body.isProfileUpdate === "false") {
        const updateCompanyData = await Company.findByIdAndUpdate(
          id,
          {
            $set: {
              companyLogo: [images[0]],
            },
          },
          {new: true}
        );
      }

      if (req.body.isCompanyUpdate === "true" && req.body.isProfileUpdate === "true") {
        const updateCompanyData = await Company.findByIdAndUpdate(
          id,
          {
            $set: {
              profileImg: [images[0]],
              companyLogo: [images[1]],
            },
          },
          {new: true}
        );
      }
     
    }

    const savedCompanyData=await Company.findById(id)

    console.log(savedCompanyData);

    if (req.body.companyName === "") {
      req.body.companyName = savedCompanyData.companyName
    }

    if (req.body.AdminName === "") {
      req.body.AdminName = savedCompanyData.AdminName
    }

    if (req.body.GSTNo === "") {
      req.body.GSTNo = savedCompanyData.GSTNo
      
    }

    if (req.body.businessAddress === "") {
      req.body.businessAddress = savedCompanyData.businessAddress
      
    }

    if (req.body.businessPhoneNumber === "") {
      req.body.businessPhoneNumber = savedCompanyData.businessPhoneNumber
      
    }

    if (req.body.adminPhoneNumber === "") {
      req.body.adminPhoneNumber = savedCompanyData.adminPhoneNumber
      
    }

    

    const updateCompanyData = await Company.findByIdAndUpdate(id, {
      $set: {
        companyName: req.body?.companyName,
        AdminName: req.body?.AdminName,
        GSTNo: req.body?.GSTNo,
        businessAddress: req.body?.businessAddress,
        businessPhoneNumber: req.body?.businessPhoneNumber,
        adminPhoneNumber: req.body?.adminPhoneNumber,
      },
    },
    {new: true}
    );

   res.json(updateCompanyData)

    
  } catch (error) {}
});

export {createCompanyDetail, getAllCompany,updateCompanyDetail};
