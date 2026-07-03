require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Item = require("./models/Item");

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// CONNECT TO MONGODB
// ===============================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:");
        console.log(error.message);
    });


// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.send("LostLines Backend Running");
});


// ===============================
// GET ALL ITEMS
// READ
// ===============================

app.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find().sort({
            createdAt: -1
        });

        res.json(items);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// ===============================
// ADD NEW ITEM
// CREATE
// ===============================

app.post("/api/items", async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name,
            location: req.body.location,
            status: req.body.status
        });

        const savedItem = await newItem.save();

        res.status(201).json(savedItem);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


// ===============================
// UPDATE ITEM
// UPDATE
// ===============================

app.put("/api/items/:id", async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
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
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.json(updatedItem);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


// ===============================
// DELETE ITEM
// DELETE
// ===============================

app.delete("/api/items/:id", async (req, res) => {
    try {
        const deletedItem =
            await Item.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.json({
            message: "Item deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});