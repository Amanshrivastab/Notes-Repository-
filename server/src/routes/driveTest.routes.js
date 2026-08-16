const express = require("express");
const multer = require("multer");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const { uploadFile } = require("../utils/googleDrive");

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.post(
    "/upload",
    authMiddleware,
    adminMiddleware,
    upload.single("file"),
    async (req, res) => {
        try {
            console.log("File:");
            console.log(req.file);

            if (!req.file) {
                return res.status(400).json({
                    message: "File is not received"
                });
            }

            const driveFile = await uploadFile(req.file);

            res.status(200).json({
                message: "File uploaded successfully",
                file: {
                    id: driveFile.id,
                    name: driveFile.name,
                    mimetype: driveFile.mimeType,
                    size: driveFile.size,
                    originalname: req.file.originalname
                }
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Google Drive upload failed",
                error: error.message
            });
        }
    }
);

module.exports = router;