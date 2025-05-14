import "dotenv/config";
import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("succesfully connected")
} catch (error) {
    console.log(error);
}

