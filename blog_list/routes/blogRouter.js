import { Router } from "express";
import { getAllBlogs, postNewBlog, deleteBlogById } from "../controllers/blogs.js";

const blogRouter = Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/", postNewBlog);
blogRouter.delete("/:id", deleteBlogById);

export default blogRouter;
