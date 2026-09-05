require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const noteRoutes = require("./routes/note.routes");
const studentRoutes = require("./routes/student.routes");
const driveTestRoutes = require("./routes/driveTest.routes");

const app = express();

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
));

app.use(express.json());

connectDB();

app.get("/", (req, resp) => {
    resp.send("This is first Express server");
});

// ==================== ROUTES ====================
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api", userRoutes);
app.use("/api", noteRoutes);
app.use("/api/drive-test", driveTestRoutes);

module.exports = app;