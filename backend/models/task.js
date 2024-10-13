import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true, 
    },
    desc: {
        type: String,
        required: true,
    },
    important:{
        type:Boolean,
        default:false,
    },
    complete:{
        type:Boolean,
        default:false,
    },
},{timestamps:true}
);


export default mongoose.model("task", TaskSchema); // Use PascalCase for the model name
