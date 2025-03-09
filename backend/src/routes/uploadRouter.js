const express = require("express");
const { upload } = require("../middlewares/multerMiddleware");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const fs = require("fs");
const userAuth = require("../middlewares/auth");
const { handleErrors } = require("../utils/helper");

const uploadRouter = express.Router();

uploadRouter.post(
  "/upload",
  upload.single("file"),
  userAuth,
  async (req, res) => {
    try {
      // Check if file is present
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Validate file type
      const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "Invalid file type!" });
      }

      // Validate file size
      if (req.file.size > 2 * 1024 * 1024) {
        fs.unlinkSync(req.file.path);
        return res
          .status(400)
          .json({ message: "File size exceeds 2MB limit!" });
      }

      // Upload file to Cloudinary with optimization
      let cloudinaryOptions = { resource_type: "auto" };
      if (req.file.mimetype.startsWith("image/")) {
        cloudinaryOptions = {
          resource_type: "image",
          format: "webp",
          quality: "80",
          width: 1000,
        };
      }

      let cloudinaryResponse;
      try {
        cloudinaryResponse = await uploadOnCloudinary(
          req.file.path,
          cloudinaryOptions
        );
      } catch (err) {
        console.error("Cloudinary Error:", err);
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);  // Delete file only if it exists
        }
        return res.status(500).json({ message: "Cloudinary service error!" });
      }

      if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);  // Delete file only if it exists
        }
        return res
          .status(500)
          .json({ message: "Failed to upload file on Cloudinary!" });
      }

      // Save the Cloudinary URL to DB
      const { documentType, description, isPhoto } = req.body;
      const fileName = req.file.originalname;

      if (isPhoto) {
        req.user.general.photoUrl = cloudinaryResponse.secure_url;
      } else {
        // Validate required fields
        if (!documentType) {
          fs.unlinkSync(req.file.path);
          return res.status(400).json({ message: "Missing required fields!" });
        }

        req.user.attachments.push({
          documentType,
          attachmentUrl: cloudinaryResponse.secure_url,
          publicId: cloudinaryResponse.public_id, // Store for future deletion
          description,
          fileName,
        });
      }

      await req.user.save();

      // Cleanup: Delete the local file after successful upload
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      // Send success response
      res.status(200).json({
        message: "File uploaded successfully",
        fileUrl: cloudinaryResponse.secure_url,
      });
    } catch (err) {
      console.error("Error uploading file:", err);
      handleErrors(err, res);
    }
  }
);

module.exports = uploadRouter;
