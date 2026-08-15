const express = require("express");
const router = express.Router();

const Note = require("../models/Note");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const upload = require("../middleware/upload.middleware");

// ========================================
// CREATE NOTE
// POST /api/notes
// Admin only
// ========================================

router.post(
    "/notes",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const newNote = await Note.create({
                ...req.body,
                uploadedBy: req.user.id
            });

            res.status(201).json(newNote);

        } catch (error) {
            res.status(500).json({
                message: error.message
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
        try {
            const notes = await Note.find();

            res.status(200).json(notes);

        } catch (error) {
            res.status(500).json({
                message: error.message
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
        try {
            const note = await Note.findById(req.params.id);

            if (!note) {
                return res.status(404).json({
                    message: "Note not found"
                });
            }

            res.status(200).json(note);

        } catch (error) {
            res.status(500).json({
                message: error.message
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