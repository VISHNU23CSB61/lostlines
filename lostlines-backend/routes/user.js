const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {

    try {

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
            message: err.message
        });

    }

});
// UPDATE PROFILE
router.put("/profile", authMiddleware, async (req, res) => {

    try {

        console.log("BODY:", req.body);
        console.log("USER:", req.user);

        const { name, email } = req.body;

        const user = await User.findById(req.user.id);

        console.log("FOUND USER:", user);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.name = name;
        user.email = email;

        await user.save();

        console.log("UPDATED USER:", user);

        res.json({
            message: "Profile Updated Successfully",
            user
        });

    } catch (err) {

        console.log("ERROR:", err);

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;