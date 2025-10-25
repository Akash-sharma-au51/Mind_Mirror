import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        maxLength:24,
        minLength:12
    }
})

export default mongoose.model("User", userSchema)


