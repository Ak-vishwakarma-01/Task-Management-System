import express from "express"
const router = express.Router();

import Task from "../models/task.js"
import User from "../models/user.js"
import authenticateToken from "./auth.js"
import user from "../models/user.js";

router.post("/create-task",authenticateToken ,async(req,res)=>{
    try{
        const {title,desc} = req.body;
        const {id} = req.headers;
        const newTask = new Task({title:title , desc:desc});
        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, {$push: {tasks:taskId}});
        res.status(200).json({message:"Task Created"});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

router.get("/get-all-tasks",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate({path: "tasks",options:{sort:{createdAt:-1}}});
        res.status(200).json({data:userData});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

router.delete("/delete-task/:id",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId,{$pull:{tasks:id}});
        
        res.status(200).json({message:"Task Deleteed successfully"});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

router.put("/update-task/:id",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.params;
        const {title,desc} = req.body;
        await Task.findByIdAndUpdate(id,{title:title,desc:desc})
        res.status(200).json({message:"Task Updated successfully"});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

router.put("/update-imp-task/:id",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const impTask = TaskData.important;
        await Task.findByIdAndUpdate(id,{important:!impTask})
        res.status(200).json({message:"Task Updated successfully"});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

router.put("/update-complete-task/:id",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const completeTask = TaskData.complete;
        await Task.findByIdAndUpdate(id,{complete:!completeTask})
        res.status(200).json({message:"Task Updated successfully"});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

router.get("/get-imp-tasks",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const Data = await User.findById(id).populate({
            path: "tasks",
            match:{important:true},
            options:{sort:{createdAt:-1}}
        }); 
        const impTaskData = Data.tasks;
        res.status(200).json({data:impTaskData});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

router.get("/get-complete-tasks",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const Data = await User.findById(id).populate({
            path: "tasks",
            match:{complete:true},
            options:{sort:{createdAt:-1}}
        }); 
        const CompleteTaskData = Data.tasks;
        res.status(200).json({data:CompleteTaskData});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

router.get("/get-incomplete-tasks",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const Data = await User.findById(id).populate({
            path: "tasks",
            match:{complete:false},
            options:{sort:{createdAt:-1}}
        }); 
        const InCompleteTaskData = Data.tasks;
        res.status(200).json({data:InCompleteTaskData});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

export default router;