const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// CREATE
router.post("/", async (req, resp) => {
    try {
        const newStudent = await Student.create(req.body);
        resp.status(201).json(newStudent);
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});

// READ - all
router.get("/", async (req, resp) => {
    try {
        const students = await Student.find();
        resp.status(200).json(students);
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});

// READ - by email
router.get("/email/:email", async (req, resp) => {
    try {
        const student = await Student.findOne({ email: req.params.email });
        if (!student) {
            return resp.status(404).json({ message: "Student not found" });
        }
        resp.status(200).json(student);
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});

// READ - by ID
router.get("/:id", async (req, resp) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return resp.status(404).json({ message: "Student not found" });
        }
        resp.status(200).json(student);
    } catch (error) {
        resp.status(400).json({ message: "Invalid student ID" });
    }
});

// UPDATE
router.put("/:id", async (req, resp) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) {
            return resp.status(404).json({ message: "Student not found" });
        }
        resp.status(200).json(student);
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
});

// DELETE
router.delete("/:id", async (req, resp) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return resp.status(404).json({ message: "Student not found" });
        }
        resp.status(200).json({ message: "Student deleted successfully", student });
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
});

module.exports = router;