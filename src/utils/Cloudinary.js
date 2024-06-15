import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_APY_SECRET,
});

const uploadOnCloudinary = async (localFilePath) =>{
    try{
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"  
        });
        console.log("File is uploaded on Cloudinary "+response.url);
        return response;
    }
    catch(err){
        fs.unlinkSync(localFilePath);
        console.error(err);
        return null;
    }
}

export {uploadOnCloudinary};