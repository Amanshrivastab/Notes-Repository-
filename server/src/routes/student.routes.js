const express = require("express");
const router = express.Router();
const User = require("../models/user");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// GET - all students/users
router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    async (req, resp) => {
        try {
            const students = await User
                .find({ role: "user" })
                .select("-password");

            resp.status(200).json(students);
        } catch (error) {
            resp.status(500).json({
                message: error.message
            });
        }
    }
);

// GET - student/user by email
router.get(
    "/email/:email",
    authMiddleware,
    adminMiddleware,
    async (req, resp) => {
        try {
            const student = await User
                .findOne({
                    email: req.params.email,
                    role: "user"
                })
                .select("-password");

            if (!student) {
                return resp.status(404).json({
                    message: "Student not found"
                });
            }

            resp.status(200).json(student);
        } catch (error) {
            resp.status(500).json({
                message: error.message
            });
        }
    }
);

// DELETE - student/user
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    async (req, resp) => {
        try {
            const student = await User.findOneAndDelete({
                _id: req.params.id,
                role: "user"
            }).select("-password");

            if (!student) {
                return resp.status(404).json({
                    message: "Student not found"
                });
            }

            resp.status(200).json({
                message: "Student deleted successfully",
                student
            });
        } catch (error) {
            resp.status(400).json({
                message: error.message
            });
        }
    }
);

module.exports = router;