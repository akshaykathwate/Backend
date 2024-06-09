import mongoose from "mongoose";
import express from "express";
import { DB_Name } from "../constants.js";
 
const app = express();

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(
          `${process.env.MONGODB_URI}/${DB_Name}`
        );

        console.log(`mongodb connected !! db host : ${connectionInstance.connection.host}`);

        // console.log(connectionInstance);
    }catch(e){
        console.log("mongodb connection failed" + e);
        process.exit(1);
    };
};

export default connectDB;