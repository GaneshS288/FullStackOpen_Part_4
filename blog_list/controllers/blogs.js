import Blog from "../models/blog.js";

async function getAllBlogs(req, res, next) {
    try {
        let allBlogs = await Blog.find({});
        allBlogs = allBlogs.map((blog) => blog.toJSON());

        res.json(allBlogs);
    } catch (error) {
        next(error);
    }
}

async function postNewBlog(req, res, next) {
    try {
        const newBlog = new Blog(req.body);
        const saveResult = await newBlog.save();

        res.json(saveResult.toJSON());
    } catch (error) {
        next(error);
    }
}

export { getAllBlogs, postNewBlog };
