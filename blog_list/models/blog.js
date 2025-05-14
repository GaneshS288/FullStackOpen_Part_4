import mongoose from "mongoose";
import { MONGODB_URL } from "../util/config.js";
import { error as errorLogger } from "../util/logger.js";

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Blog = mongoose.model("Blog", blogSchema);

try {
    mongoose.connect(MONGODB_URL);
    console.log("succesfully connected to mongodb");
} catch (error) {
    errorLogger(error);
}

export default Blog;
