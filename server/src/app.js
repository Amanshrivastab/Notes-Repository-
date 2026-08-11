require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const Student = require("./models/Student");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

// Database connection
connectDB();

app.get("/", (req, resp) => {
    console.log("running on 5000");
    resp.send("This is first Express server");
});

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

app.use("/api/auth", authRoutes);

module.exports = app;