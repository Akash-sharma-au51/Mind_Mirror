import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Question",
        required: true,
    },
    answer:{
        type: String,
        required: true,
    },
    embedding: {
        type: [Number],
        default: [],
        required: true,
    }
})

const Response = mongoose.model("Response", responseSchema);

export default Response;
