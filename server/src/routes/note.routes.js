const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Note = require("../models/Note");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const upload = require("../middleware/upload.middleware");
const {
    uploadFile,
    drive,
    deleteFile
} = require("../utils/googleDrive");

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
// UPDATE NOTE  by mongodb file id
// PUT /api/notes/:id
// Admin only
// ========================================

router.put(
    "/notes/:id",
    authMiddleware,
    adminMiddleware,
    upload.single("file"),
    async (req, res) => {
       try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                message:" Invalalid Note Id "
            });
        }

        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({
                message:"Note Not Found"
            });
        }
        const {
          title,
          description,
          subject,
          semester,
          branch
        } = req.body || {};

        if (title !== undefined) {
            note.title = title;
        }

        if (description !== undefined) {
          note.description = description;
        }

        if (subject !== undefined) {
            note.subject = subject;
        }

        if (semester !== undefined) {
            note.semester = semester;
        }

        if (branch !== undefined) {
              note.branch = branch;
        }

        // update for file 
        if(req.file){
            const oldDriveFileId = await note.file?.driveFileId;
           

            console.log("================================");
            console.log("OLD DRIVE FILE ID:");
            console.log(oldDriveFileId);
            console.log("================================");

            const newFile = await uploadFile(req.file);
            console.log("================================");
            console.log("NEW DRIVE FILE ID:");
            console.log(newFile.id);
            console.log("================================");

            if(!newFile || !newFile.id){
                return res.status(500).json({
                    message:"New file upload fail"
                });
            }
            // update mongodb wih nw file data 
            note.file = {
                driveFileId: newFile.id,
                originalName: req.file.originalname,
                mimeType:req.file.mimetype,
                size:req.file.size
            }

            await note.save();
            //delete old drive file 
            if(oldDriveFileId){
                try{
                    await deleteFile(oldDriveFileId); 
                    console.log("================================");
                    console.log("OLD FILE DELETED:");
                    console.log(oldDriveFileId);
                    console.log("================================");  
                }catch(deleteError){
                    console.error("OLD DRIVE FILE DELETE ERROR:");
                    console.error(deleteError);
                }
            }
        }else{

             // 4. Save changes to MongoDB
            await note.save();


        }
        
            // 5. Send updated note
            res.status(200).json({
                message: "Note metadata updated successfully",
                note: note
            });

       }catch (error) {

            console.error("UPDATE NOTE ERROR:");
            console.error(error);

            res.status(500).json({
                message: "Failed to update note",
                error: error.message
            });
        }
    }
);


// ========================================
// DELETE NOTE   by using mongodb note id 
// DELETE /api/notes/:id
// Admin only
// ========================================

router.delete(
    "/notes/:id",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try{

            // validate the note id frist 
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                return res.status(400).json({
                    message:"Invalid Note Id "
                });
            }

            // find note in mongodb 
            const note = await Note.findById(req.params.id);
            if(!note){
                return res.status(404).json({
                    message:"Note not found "
                });
            }

            // find note in drive feild id 
            const driveFileId = note.file?.driveFileId;

            //delete from drive 
            if(driveFileId){
                await deleteFile(driveFileId);
            }

            // delete  note in mongodb
            await Note.findByIdAndDelete(req.params.id);
            //send success response 
            res.status(200).json({
                message:"Note and File Delete Successfully"
            });
        }catch(error){
            console.error(" NOTE DELETE ERROR");
            console.error(error);
            res.status.json({
                message:"Failed to Delete ",
                error:error.message 
            });
        }
    }
);


// ========================================
// GET NOTE FILE
// GET /api/notes/:id/file
// Authenticated users
// ========================================

router.get(
    "/notes/:id/file",
    authMiddleware,
    async (req, res) => {
        try{

            // validate the client id 
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                return res.status(400).json({
                    message:"Invalid Note Id "
                });
            }

            // find the note in mongodb
            const note = await Note.findById(req.params.id);
            if(!note){
                return res.status(404).json({
                    message:"Note not found "
                });
            }

            // get google drive note id 
            const driveFileId = note.file.driveFileId;
            if(!driveFileId){
                return res.status(404).json({
                    message:"Note not found for this note"
                });
            }

            //get actual file for google drive 
            const response = await drive.files.get(
                {
                    fileId:driveFileId,
                    alt:"media"
                },
                {
                    responseType:"stream"
                }
            );

            //type of file for browser
            res.setHeader(
                "Content-Type",
                note.file.mimeType
            );

            // tell the browser to display the note 
            res.setHeader(
                "Content-Disposition",
                `inline; filename="${note.file.originalName}"`
            );

            //stream file to  brower 
            response.data.pipe(res);
        }catch(error){
            console.error("GET NOTE FILE ERROR ");
            console.error(error);
            res.status(500).json({
                message:"fail to fetch the note file ",
                error:error.message
            });
        }
    }
);


module.exports = router;