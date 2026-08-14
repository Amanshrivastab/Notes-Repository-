const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");


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


module.exports = router;