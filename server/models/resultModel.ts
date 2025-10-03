import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    dominanttriats:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Trait",
            required: true,

        }
    ],
    summary:{
        type: String,
        required: true,
        minlength: 100,
        maxlength: 500,
    }
},{timestamps:true});

export default mongoose.model("Result", resultSchema);