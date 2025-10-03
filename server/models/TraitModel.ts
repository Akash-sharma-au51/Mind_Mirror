import mongoose from "mongoose";

const traitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    embedding: {
        type: [Number],
        default: [],
        required: true,
    }
})

const Trait = mongoose.model("Trait", traitSchema);

export default Trait;

