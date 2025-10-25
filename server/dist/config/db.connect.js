import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        if (!uri) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to database:", error);
    }
};
export default connectDB;
//# sourceMappingURL=db.connect.js.map