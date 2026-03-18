import mongoose from "mongoose";
import "dotenv/config";

const MONGOO_URI = process.env.MONGOO_URI;

async function connectDB() {
    try {
        await mongoose.connect(MONGOO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDB;