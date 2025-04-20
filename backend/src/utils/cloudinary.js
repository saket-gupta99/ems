const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadOnCloudinary(localFilePath, options = {}) {
  try {
    if (!localFilePath) return null;

    // Important: Keep the options as provided by caller
    // Don't override resource_type if already specified
    const uploadOptions = {
      ...options, // Put caller's options first so they're not overridden
    };

    // console.log("Uploading to Cloudinary with options:", uploadOptions);

    const response = await cloudinary.uploader.upload(
      localFilePath,
      uploadOptions
    );

    // console.log("Cloudinary Response:", response);

    // Clean up local file after successful upload
    fs.unlinkSync(localFilePath);

    return response;
  } catch (err) {
    console.error("Error in uploadOnCloudinary:", err);
    // Clean up local file in case of error during upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
}

module.exports = { uploadOnCloudinary };
