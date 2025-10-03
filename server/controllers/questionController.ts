import Question from '../models/questionModel'
import { Request,Response } from "express";


const createQuestion = async(req:Request,res:Response)=>{
    const {text, options, traitHints} = req.body
    try {
        if (!text||!options||options.length===0) {
            return res.status(400).json({
                message:"all feilds are required",
            })
            
        }

        const newQuestion  = new Question({
            text,
            options,
            traitHints
        })

        await newQuestion.save()
        res.status(200).json({
            message:"question created",
            data:newQuestion
        })
        
    } catch (error:any) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
        
    }



}