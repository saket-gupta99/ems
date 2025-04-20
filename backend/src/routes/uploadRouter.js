const express = require("express");
const { upload } = require("../middlewares/multerMiddleware");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const fs = require("fs");
const path = require("path");
const userAuth = require("../middlewares/auth");

const uploadRouter = express.Router();

uploadRouter.post(
  "/upload",
  upload.single("file"),
  userAuth,
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    // ✅ Updated allowedTypes (PDF removed)
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];

    const fileType = req.file.mimetype;

    // ✅ Special case: block PDFs with custom message
    if (fileType === "application/pdf") {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: "PDF uploads are not allowed",
      });
    }

    if (!allowedTypes.includes(fileType)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        error: "File type not allowed",
      });
    }

    if (req.file.size > 2 * 1024 * 1024) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        error: "File exceeds 2MB limit",
      });
    }

    const isImage = fileType.startsWith("image/");
    const timestamp = Date.now();
    const originalName = req.file.originalname;
    const fileBaseName = path
      .basename(originalName, path.extname(originalName))
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    const uploadOptions = {
      folder: isImage ? "images" : "documents",
      public_id: `${fileBaseName}-${timestamp}`,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      ...(isImage
        ? {
            resource_type: "image",
            quality: "auto:good",
            format: "webp",
          }
        : {
            resource_type: "raw",
          }),
    };

    try {
      const cloudinaryResponse = await uploadOnCloudinary(
        req.file.path,
        uploadOptions
      );

      if (!cloudinaryResponse?.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      const fileUrl = cloudinaryResponse.secure_url;

      const { documentType, description, isPhoto } = req.body;

      if (isPhoto === "true" || isPhoto === true) {
        req.user.general.photoUrl = fileUrl;
      } else {
        if (!documentType) {
          return res.status(400).json({
            success: false,
            error: "Document type is required",
          });
        }

        const docCount = req.user.attachments.filter(
          (doc) => doc.documentType === documentType
        ).length;

        if (docCount >= 5) {
          return res.status(400).json({
            success: false,
            error: `Maximum 5 documents allowed for ${documentType}`,
          });
        }

        req.user.attachments.push({
          documentType,
          attachmentUrl: fileUrl,
          publicId: cloudinaryResponse.public_id,
          description: description || "",
          fileName: originalName,
          fileType: fileType,
        });
      }

      await req.user.save();

      return res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        fileUrl: fileUrl,
        publicId: cloudinaryResponse.public_id,
      });
    } catch (error) {
      console.error("Upload Error:", error.message);

      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(500).json({
        success: false,
        error: "File upload failed",
        details: error.message,
      });
    }
  }
);

module.exports = uploadRouter;
