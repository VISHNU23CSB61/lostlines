const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const router = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ======================================
// REGISTER USER
// POST /auth/register
// ======================================

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check all fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        if (name.trim().length < 2) {
            return res.status(400).json({
                message: "Name must be at least 2 characters"
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User Registered Successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Registration failed. Please try again."
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

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password"
            });
        }

        // Check email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
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
            message: "Login failed. Please try again."
        });
    }
});

module.exports = router;