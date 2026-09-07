const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidId(id) {
    return mongoose.isValidObjectId(id);
}

// GET /users/profile
router.get("/profile", authMiddleware, async (req, res) => {

    try {

        if (!isValidId(req.user.id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (err) {

        res.status(500).json({
            message: "Server error"
        });

    }

});

// UPDATE PROFILE
// PUT /users/profile
router.put("/profile", authMiddleware, async (req, res) => {

    try {

        if (!isValidId(req.user.id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const name = (req.body.name || "").trim();
        const email = (req.body.email || "").trim().toLowerCase();

        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address"
            });
        }

        // Prevent taking another user's email
        const existing = await User.findOne({
            email,
            _id: { $ne: req.user.id }
        });
        if (existing) {
            return res.status(400).json({
                message: "Email already in use"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "Profile Updated Successfully",
            user
        });

    } catch (err) {

        res.status(500).json({
            message: "Server error"
        });

    }

});

module.exports = router;