import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    tasks:[
        {
            type:mongoose.Types.ObjectId,
            ref:"task",
        },
    ],
});


export default mongoose.model("User", userSchema); // Use PascalCase for the model name
