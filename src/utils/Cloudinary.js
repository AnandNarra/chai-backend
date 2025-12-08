import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("No local file path provided");
            return null;
        }

        console.log("Uploading file to Cloudinary:", localFilePath);

        // Check if file exists locally
        if (!fs.existsSync(localFilePath)) {
            console.log("Local file does not exist:", localFilePath);
            return null;
        }

        // Upload the file to Cloudinary
        const normalizedPath = localFilePath.replace(/\\/g, '/');
        const response = await cloudinary.uploader.upload(normalizedPath, {
            resource_type:'auto'
        });

        // File has been uploaded successfully
        console.log("File uploaded to Cloudinary successfully:", response.url);

        // Remove file from local storage after upload
        

        return response;

    } catch (error) {
        console.error("Cloudinary upload error:", error);

        // Remove the locally saved temporary file as the upload operation failed
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
}

export { uploadOnCloudinary };