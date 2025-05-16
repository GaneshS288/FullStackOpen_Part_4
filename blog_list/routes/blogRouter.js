import { Router } from "express";
import { getAllBlogs, postNewBlog, deleteBlogById, updateBlogById } from "../controllers/blogs.js";

const blogRouter = Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/", postNewBlog);
blogRouter.delete("/:id", deleteBlogById);
blogRouter.put("/:id", updateBlogById);

export default blogRouter;
