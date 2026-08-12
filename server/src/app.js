require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const Student = require("./models/Student");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

// Database connection
connectDB();

// ==================== HOME ====================

app.get("/", (req, resp) => {
    console.log("running on 5000");
    resp.send("This is first Express server");
});

// ==================== CREATE ====================

// Create a student
app.post("/api/student", async (req, resp) => {
    try {
        const newStudent = await Student.create(req.body);

        resp.status(201).json(newStudent);

    } catch (error) {
        resp.status(500).json({
            message: error.message
        });
    }
});

// ==================== READ ====================

// Get all students
app.get("/api/student", async (req, resp) => {
    try {
        const students = await Student.find();

        resp.status(200).json(students);

    } catch (error) {
        resp.status(500).json({
            message: error.message
        });
    }
});

// Get student by email
app.get("/api/student/email/:email", async (req, resp) => {
    try {
        const student = await Student.findOne({
            email: req.params.email
        });

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
});

// Get student by ID
app.get("/api/student/:id", async (req, resp) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return resp.status(404).json({
                message: "Student not found"
            });
        }

        resp.status(200).json(student);

    } catch (error) {
        resp.status(400).json({
            message: "Invalid student ID"
        });
    }
});

// ==================== UPDATE ====================

// Update student by ID
app.put("/api/student/:id", async (req, resp) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!student) {
            return resp.status(404).json({
                message: "Student not found"
            });
        }

        resp.status(200).json(student);

    } catch (error) {
        resp.status(400).json({
            message: error.message
        });
    }
});

// ==================== DELETE ====================

// Delete student by ID
app.delete("/api/student/:id", async (req, resp) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return resp.status(404).json({
                message: "Student not found"
            });
        }

        resp.status(200).json({
            message: "Student deleted successfully",
            student: student
        });

    } catch (error) {
        resp.status(400).json({
            message: error.message
        });
    }
});

// ==================== AUTH ROUTES ====================

app.use("/api/auth", authRoutes);
app.use("/api",userRoutes);

module.exports = app;