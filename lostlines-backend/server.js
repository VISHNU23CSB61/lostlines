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

// CORS: every origin is allowed during development so the Vite frontend
// (http://localhost:5173) keeps working. In production, restrict origins by
// setting CORS_ORIGINS in the environment (comma-separated list).
const corsOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map(origin => origin.trim())
    .filter(Boolean);

app.use(
    cors(
        corsOrigins.length
            ? { origin: corsOrigins }
            : {}
    )
);
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
        const name = (req.body.name || "").trim();
        const location = (req.body.location || "").trim();

        if (!name || !location) {
            return res.status(400).json({ message: "Name and location are required" });
        }

        const item = new Item({
            name,
            location,
            status: req.body.status || "Lost",
            owner: req.user.id
        });

        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: "Invalid item data" });
    }
});

// ==============================
// RECOVER ITEM
// ==============================
app.put("/items/recover/:id", authMiddleware, async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ message: "Invalid item ID" });
        }

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
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ message: "Invalid item ID" });
        }

        const name = (req.body.name || "").trim();
        const location = (req.body.location || "").trim();

        if (!name || !location) {
            return res.status(400).json({ message: "Name and location are required" });
        }

        const updatedItem = await Item.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user.id
            },
            {
                name,
                location,
                status: req.body.status
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: "Invalid item data" });
    }
});

// ==============================
// DELETE ITEM
// ==============================
app.delete("/items/:id", authMiddleware, async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ message: "Invalid item ID" });
        }

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
// HELPER — validate Mongo ObjectId
// ==============================
function isValidId(id) {
    return mongoose.isValidObjectId(id);
}

// ==============================
// 404 — Unknown routes
// ==============================
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// ==============================
// Global error handler (no internal details leaked)
// ==============================
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error" });
});

// ==============================
// MONGODB CONNECTION + SERVER
// ==============================
// Fail fast: only start accepting requests after MongoDB connects.
// If the database cannot be reached, log the reason and exit with a
// non-zero code so the production host never serves a "healthy" but
// broken API.
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => {
            console.log(`Server Running on Port ${PORT}`);
        });
    })
    .catch(error => {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    });