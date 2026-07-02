const mongoose =require("mongoose");
const itemSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    location:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Lost","found"].
        required:true
    }
},{
    timestamps:true
});
module.exports=
mongoose.model("Item",itemSchema);