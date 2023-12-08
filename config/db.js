import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

async function run(){
    try {
        mongoose.connect(process.env.DATABASE);
        console.log('DB is connected');
    } catch (error) {
        console.log(error);
    }
}

run();