const mongoose=require("mongoose");
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
        },
        profileImage: {
            type: String,
            default:"https://ui-avatars.com/api/?background=2563eb&color=fff&name=User"
        },

        bio: {
            type: String,
            default: "LostLines User"
        }
    },
    {
        timestamps:true,
    }
);


module.exports=mongoose.model("User",userSchema);