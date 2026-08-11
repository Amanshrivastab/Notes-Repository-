const express = require('express');
const router = express.Router();

router.get("/test",(req,resp)=>{
    resp.json({
        message:"auth route is working"
    });
});

module.exports = router;