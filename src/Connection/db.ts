import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
export const connect=async () => {
    return await mongoose.connect(process.env.DB); 
}