import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    options: [{ type: String, required: true }],
    traitHints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trait" }]
})

const Question = mongoose.model("Question", questionSchema);

export default Question;


