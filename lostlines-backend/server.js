require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Item = require("./models/Item");
const authRoutes = require("./routes/auth");

const app = express();

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

// =======================
// MongoDB Connection
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed");
    console.log(err.message);
  });

// =======================
// Home Route
// =======================
app.get("/", (req, res) => {
  res.send("LostLines Backend Running");
});

// =======================
// GET ALL ITEMS
// =======================
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// =======================
// CREATE ITEM
// =======================
app.post("/items", async (req, res) => {
  try {
    const item = new Item({
      name: req.body.name,
      location: req.body.location,
      status: req.body.status,
    });

    const savedItem = await item.save();

    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// =======================
// UPDATE ITEM
// =======================
app.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        location: req.body.location,
        status: req.body.status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// =======================
// DELETE ITEM
// =======================
app.delete("/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.json({
      message: "Item Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});