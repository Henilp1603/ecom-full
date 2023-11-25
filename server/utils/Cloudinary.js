import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dogkgmmwh', 
  api_key: '438545533165413', 
  api_secret: 'nYefN1AOdwJt6drjAxgVPTULcHE' 
});


// const cloudinaryUploadImg=async(fileToUpload)=>{
//     return  cloudinary.uploader.upload(fileToUpload,function(error,result){console.log(result)})
    
// }

const cloudinaryUploadImg = async (fileToUploads) => {
    return await cloudinary.uploader.upload(fileToUploads, { unique_filename: true, folder: "Products" }, (error,result) => {if (error) {
      console.log(error);
    }else{
      return result.secure_url
    }} );
};

export {cloudinaryUploadImg}