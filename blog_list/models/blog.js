import mongoose from "mongoose";
import { MONGODB_URL } from "../util/config.js";
import { error as errorLogger } from "../util/logger.js";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        minLength: [3, "author name must be at least 3 letters long"],
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    likes: {
        type: Number,
        min: [0, "likes can't be less than 0"],
        required: true,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
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
    await mongoose.connect(MONGODB_URL);
    console.log("succesfully connected to mongodb");
} catch (error) {
    errorLogger(error);
}

export default Blog;
export { mongoose };
