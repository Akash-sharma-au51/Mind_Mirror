import express from "express";
import type { Request, Response } from "express";
import User from "../models/userModel.ts"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


const registerUser = async(req:Request,res:Response)=>{
    const {username,email,password} = req.body
    try {
        if (!username||!email||!password) {
            return res.status(400).json({
                message:"all feilds are required",
                success:false
            })
            
        }
        const user = await User.findOne({email})

        //check if user exist 
        if (user) {
            return res.status(400).json({
                message:"user already exist pls login instead",
                success:false
            })
        }

        const salt = await bcrypt.genSalt(16)
        const hashedpassword = await bcrypt.hash(password,salt)

       const newuser = new User({
        username,
        email,
        password:hashedpassword
       })

       await newuser.save()

       const token = jwt.sign({id:newuser._id,email:newuser.email},process.env.JWT_SECRET,{expiresIn:"1d"})

       //success

       res.status(200).json({
        message:"user created successfully",
        success:true,
        token
       })


        
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false
        })
        
    }
}

const loginUser = async(req:Request,res:Response)=>{
    const{email,password} = req.body
    try {
        if (!email||!password) {
            return res.status(400).json({
                message:"all feilds are required",
                success:false
            })
            
        }
        const existuser = await User.findOne({email})

        if (!existuser) {
            return res.status(400).json({
                message:"user does not exist",
                success:false
            })
        }
        
        // Check password
        if (!existuser.password) {
            return res.status(400).json({
                message: "Password not set for user",
                success: false
            });
        }
        const isPasswordValid = await bcrypt.compare(password, existuser.password as string);
        
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "invalid password",
                success:false
            })
        }
        
        // Generate token
        const token = jwt.sign({id:existuser._id,email:existuser.email},process.env.JWT_SECRET,{expiresIn:"1d"})
        
        res.status(200).json({
            message:"login successful",
            success:true,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false
        })
    }
}

const logoutUser = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            message: "Logout successful",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export { registerUser, loginUser, logoutUser };
