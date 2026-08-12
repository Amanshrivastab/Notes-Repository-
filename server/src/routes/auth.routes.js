const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const router = express.Router();

router.post("/register",async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

         const existingUser = await User.findOne({email});
         if(existingUser){
            return res.status(400).json({
                message:"User already exist "
            });
         }

         const hashedPassword = await bcrypt.hash(password,10);

         const user = await User.create({
            name,
            email,
            password:hashedPassword
         });

         res.status(201).json({
            message:"User registered successfully ",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
         });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"server error "
        });
    }

});
//*------------ login api -------------
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Find user
        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }

        // Compare password
        const comparison = await bcrypt.compare(
            password,
            findUser.password
        );

        if (!comparison) {
            return res.status(400).json({
                message: "Password is incorrect"
            });
        }
        const token=jwt.sign(
            {
                user:findUser._id,
                role:findUser.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user:{
                id: findUser._id,
                 name: findUser.name,
                 email: findUser.email,
                 role: findUser.role
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;