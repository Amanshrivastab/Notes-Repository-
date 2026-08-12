const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Profile accessed successfully",
        user: req.user
    });
});

module.exports = router;