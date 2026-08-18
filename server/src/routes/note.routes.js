const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Note = require("../models/Note");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const upload = require("../middleware/upload.middleware");
const {uploadFile } = require("../utils/googleDrive");

// ========================================
// CREATE NOTE
// POST /api/notes
// Admin only
// ========================================

router.post(
    "/notes",
    authMiddleware,
    adminMiddleware,
    upload.single("file"),
    async (req, res) => {
        try{
            console.log("Body");
            console.log(req.body);

            console.log("File");
            console.log(req.file);

            console.log("AUTH USER:");
            console.log(req.user);

            console.log("===============")
            // check the file
             if(!req.file){
                 return res.status(400).json({
                     message:"file is required"
                 });
             }

             // upload file to google drive 
             const driveFile = await uploadFile(req.file);

             //create note in mongodb
             const newNote = await Note.create({
                title:req.body.title,

                description:req.body.description,

                subject:req.body.subject,

                semester:req.body.semester,

                branch:req.body.branch,

                uploadedBy:req.user.user,

                file:{
                    driveFileId:driveFile.id,

                    originalName:req.file.originalname,

                    mimeType:req.file.mimetype,

                    size:req.file.size
                }
             });

             // send response 
             res.status(200).json({
                message:"Note created successfully",
                note:newNote
             });
         }catch(error){
            console.error("==============");
            console.error("CREATE NOTE ERROR");
            console.error(error),
            console.error("================");
            res.status(500).json({
                message:error.message
            });
         }
    }
);


// ========================================
// GET ALL NOTES
// GET /api/notes
// Authenticated users
// ========================================

router.get(
    "/notes",
    authMiddleware,
    async (req, res) => {
        try{
            const notes = await Note.find().select("-file.driveFileId").sort({ createdAt: -1 });
             
            res.status(200).json({
                message:"Notes fetched successfully",
                count: notes.length,
                notes: notes
            });
        }catch(error){
            console.error("GET ALL NOTES ERROR: ");
            console.error(error);
            res.status(500).json({
                message:"Failed to fetch notes",
                error:error.message
            });
        }
    }
);


// ========================================
// GET SINGLE NOTE
// GET /api/notes/:id
// Authenticated users
// ========================================

router.get(
    "/notes/:id",
    authMiddleware,
    async (req, res) => {
        try{
             // check the object id format 
             if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                return res.status(400).json({
                    message:"Invalid note ID"
                });
             }
             //find note 
             const note = await Note.findById(req.params.id);

             //Note doesnot exist
             if(!note){
                return res.status(404).json({
                    message:"Note not found "
                });

             }
             res.status(200).json({
                message:"Note fetched successfully",
                note:note
             });
        }catch(error){
            console.error("GET SINGLE NOTE ERROR");
            console.error(error);
            res.status(500).json({
                message:"Failed to fetch note",
                error:error.message
            });
        }
    }
);


// ========================================
// UPDATE NOTE
// PUT /api/notes/:id
// Admin only
// ========================================

router.put(
    "/notes/:id",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const updatedNote = await Note.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!updatedNote) {
                return res.status(404).json({
                    message: "Note not found"
                });
            }

            res.status(200).json(updatedNote);

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);


// ========================================
// DELETE NOTE
// DELETE /api/notes/:id
// Admin only
// ========================================

router.delete(
    "/notes/:id",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const deletedNote = await Note.findByIdAndDelete(
                req.params.id
            );

            if (!deletedNote) {
                return res.status(404).json({
                    message: "Note not found"
                });
            }

            res.status(200).json({
                message: "Note deleted successfully",
                note: deletedNote
            });

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);



router.post(
    "/multer",
    authMiddleware,
    adminMiddleware,
    upload.single('pdf'),
    async (req, res) => {
        try {
             console.log("================================");
            console.log("BODY:");
            console.log(req.body);

            console.log("FILE:");
            console.log(req.file);
             console.log("================================");
            res.status(200).json({
                message: "Multer test successful",
                body: req.body,
                file: req.file,
                fileReceived: !!req.file
            
            });

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);



module.exports = router;