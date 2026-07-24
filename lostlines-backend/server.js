require("dotenv").config();
const userRoutes = require("./routes/user");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Item = require("./models/Item");
const authRoutes = require("./routes/auth");

const authMiddleware = require("./middleware/authMiddleware");
const app = express();

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

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
app.get("/items", authMiddleware, async (req, res) => {
    try {
        const items = await Item.find({
            owner: req.user.id
        }).sort({
            createdAt: -1
        });
        res.json(items);
    }

    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});
// =======================
// CREATE ITEM
// =======================
app.post("/items", authMiddleware, async (req,res)=>{
    try{
        const item = new Item({
            name:req.body.name,
            location:req.body.location,
            status:req.body.status,
            owner:req.user.id
        });
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    }

    catch(err){
        res.status(400).json({
            message:err.message
        });
    }
});

// =======================
// UPDATE ITEM
// =======================
app.put("/items/:id", authMiddleware, async (req,res)=>{
    try{
        const updatedItem = await Item.findOneAndUpdate(
            {
                _id:req.params.id,
                owner:req.user.id
            },
            req.body,
            {
                new:true,
                runValidators:true
            }
        );
        if(!updatedItem){
            return res.status(404).json({
                message:"Item Not Found"
            });

        }
        res.json(updatedItem);
    }

    catch(err){
        res.status(400).json({
            message:err.message
        });
    }
});

// =======================
// DELETE ITEM
// =======================
app.delete("/items/:id", authMiddleware, async (req,res)=>{
    try{
        const deletedItem = await Item.findOneAndDelete({
            _id:req.params.id,
            owner:req.user.id
        });
        if(!deletedItem){
            return res.status(404).json({
                message:"Item Not Found"
            });
        }
        res.json({
            message:"Item Deleted Successfully"
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
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