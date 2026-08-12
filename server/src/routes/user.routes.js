const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const Note = require("../models/note");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Profile accessed successfully",
        user: req.user
    });
});

router.get("/admin-test",authMiddleware,adminMiddleware,(req,res)=>{
    res.status(200).json({
        message:"welcome Admin"
    });
});

router.post( "/notes",authMiddleware,adminMiddleware,async (req, res) => {
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

module.exports = router;