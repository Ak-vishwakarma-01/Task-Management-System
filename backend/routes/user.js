import express from "express"
import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from 'nodemailer';
import cors from 'cors'

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
});

router.post("/log-in", async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Validate input
        if (!identifier || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check for user by username or email
        const existingUser1 = await User.findOne({ username: identifier });
        const existingUser2 = await User.findOne({ email: identifier });

        // If user not found
        if (!existingUser1 && !existingUser2) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const user = existingUser1 || existingUser2;

        // Compare the raw password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = jwt.sign(
                { id: user._id, username: user.username },
                "akvTM",
                { expiresIn: "20s" } 
            );
            return res.status(200).json({ id: user._id, token });
        } else {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



router.post("/update-password", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User Not Found" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        existingUser.password = hashPass; // Update the password in the user object
        await existingUser.save(); // Save the updated user

        return res.status(200).json({ message: "Password Updated Successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



   router.post("/check-email", async(req,res)=>{
    try{
        const {email} = req.body;
        const existingUser = await User.findOne({email: email});
        if(!existingUser){
            return res.status(300).json({message:"User Name Not Found"});
        }
        return res.status(200).json({message:"User Found Successfully"});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

   const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'omf000111@gmail.com',
        pass: 'wlds gkbo lpdr otnm', 
    },
 });

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random OTP

    const mailOptions = {
        from: 'omf000111@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'OTP sent successfully', otp });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send OTP' });
    }
});

export default router;