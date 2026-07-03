const mongoose =require("mongoose");
const itemSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },

    location:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:["Lost","found"],
        default:"Lost"
    }
},{
    timestamps:true
});


const Item= mongoose.model("Item",itemSchema);
module.exports=Item;
