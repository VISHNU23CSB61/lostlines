require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const authMiddleware = require("./Middleware/authMiddleware");
const Item = require("./models/Item");

const app = express();

// ==============================
// MIDDLEWARE
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// ROUTES
// ==============================
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// ==============================
// HOME
// ==============================
app.get("/", (req, res) => {
    res.send("LostLines Backend Running");
});

// ==============================
// GET ALL ITEMS (user-owned only)
// ==============================
app.get("/items", authMiddleware, async (req, res) => {
    try {
        const items = await Item.find({ owner: req.user.id });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ==============================
// CREATE ITEM
// ==============================
app.post("/items", authMiddleware, async (req, res) => {
    try {
        const item = new Item({
            name: req.body.name,
            location: req.body.location,
            status: req.body.status,
            owner: req.user.id
        });

        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ==============================
// RECOVER ITEM
// ==============================
app.put("/items/recover/:id", authMiddleware, async (req, res) => {
    try {
        const item = await Item.findOne({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        item.status = "Recovered";
        await item.save();

        res.status(200).json({
            message: "Item recovered successfully",
            item
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ==============================
// UPDATE ITEM
// ==============================
app.put("/items/:id", authMiddleware, async (req, res) => {
    try {
        const updatedItem = await Item.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user.id
            },
            {
                name: req.body.name,
                location: req.body.location,
                status: req.body.status
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ==============================
// DELETE ITEM
// ==============================
app.delete("/items/:id", authMiddleware, async (req, res) => {
    try {
        const deletedItem = await Item.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({
            message: "Item deleted successfully",
            item: deletedItem
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ==============================
// MONGODB CONNECTION
// ==============================
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch(error => {
        console.error("MongoDB Connection Failed:", error.message);
    });

// ==============================
// SERVER
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});