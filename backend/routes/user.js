import express from "express"
import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const router = express.Router(); 

router.post("/sign-in",async(req,res)=>{
    try{
    const {username, email, password} = req.body;
    const existingUser = await User.findOne({username: username}); 
    const existingEmail = await User.findOne({email: email});
    if(existingUser){
        return res.status(300).json({message:"Username already exists"});
    }else if(username.length < 4){
        return res.status(400).json({message:"Username should have atleast 4 character"});
    }
        
    if(existingEmail){
        return res.status(300).json({message:"Email already exists"});
    }

    const hashPass = await bcrypt.hash(password,10);

    const newUser = new User({
        username: username,
        email : email,
        password: hashPass,
    })

    await newUser.save();

    return res.status(200).json({message:"Sign In successfully"});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
})

router.post("/log-in", async(req,res)=>{
    try{
        const {username, email, password} = req.body;
        const existingUser = await User.findOne({username: username});
        if(!existingUser){
            return res.status(300).json({message:"Invalid Credentials"});
        }
        bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data){
                const authClaims = [{name:username},{jti:jwt.sign({},"akvTM")}];
                const token = jwt.sign({authClaims},"akvTM",{expiresIn:"2d"});
                res.status(200).json({id:existingUser._id, token: token});
            }else{
                return res.status(400).json({message:"Invalid Credentials"})
            }
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
    
})

export default router;