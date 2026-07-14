const express= require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const User=require("../models/User");
const router=express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check all fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }
        // Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({
            message: "User Registered Successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


// ======================================
// LOGIN USER
// POST /auth/login
// ======================================

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }
        // Create JWT Token
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );
        res.json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }

    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
module.exports = router;