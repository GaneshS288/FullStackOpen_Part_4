import { Router } from "express";
import { getAllBlogs, postNewBlog } from "../controllers/blogs.js";

const blogRouter = Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/", postNewBlog);

export default blogRouter;
