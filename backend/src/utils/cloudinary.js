//we're going to take file from frontend and then store it on local server than upload it on cloud with cloudinary
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

//Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file is uploaded successfully
    // console.log("file is uploaded on cloudinary ", response.url);

    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath); //remove the locally stored temporary file as the upload has failed
    return null;
  }
}

module.exports = { uploadOnCloudinary };
