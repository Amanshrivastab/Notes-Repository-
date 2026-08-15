const express  = require("express");
const multer = require("multer");

const {uploadFile} = require("../utils/googleDrive");
const router =  express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.post("/upload", upload.single("file"),async(req,res)=>{
    try{
        console.log("File: ");
        console.log(req.file);

        if(!req.file){
            return res.status(400).json({
                messsage:"file is not recieved",
            });
        }

        const driveFile = await uploadFile(req.file);

        res.status(200).json({
            message:"file upload successfully ",
            file: {
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size
            }
        });

    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"google drive upload failed",
            error:error.message
        });
    }
});

module.exports =router;