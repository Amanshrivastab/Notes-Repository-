require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes")
const app = express();

app.use(express.json());
// data base connection
connectDB();


app.get("/", (req, resp) => {
    console.log("running on 5000");
    resp.send("This is first Express server");
});


app.use("/api/auth",authRoutes)

module.exports = app;