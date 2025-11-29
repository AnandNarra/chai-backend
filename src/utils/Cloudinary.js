import {v2 as cloudinary} from "cloudinary"
import fs from "fs";

cloudinary.config({
    cloud_name : process.env.Cloudinary_Name,
    api_key: process.env.Cloudinary_Api_Key,
    api_secret: process.env.Cloudinary_Api_Secret
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type :"auto"
        })

        console.log("File is uploaded on Cloudinary " ,response.url);
        
        
    } catch (error) {
        
        fs.unlinkSync(localFilePath)

        return null
    }
}

export {uploadOnCloudinary}