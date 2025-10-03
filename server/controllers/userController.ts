import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

const registerUser = async(req:Request,res:Response)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
    res.status(201).json({
        user: {
            email: user.email,
            username: user.username
        },
        token
    });
}

const loginUser = async(req:Request,res:Response)=>{
    const {email,password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required",
            })
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
    res.status(200).json({
        user:{
            email:user.email,
            username:user.username
        },
        message:`welcome back ${user.username}`,
        token   
    })
}
catch(error){
    return res.status(500).json({
        message:"Internal server error",
        error:"error message"+error.message
    })
}
}

const logoutUser = async(req:Request,res:Response)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({
            message:"Logged out successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            message:"Internal server error",
        })
    }
}

export default { registerUser, loginUser, logoutUser };
