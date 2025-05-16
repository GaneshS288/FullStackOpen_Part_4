import Blog from "../models/blog.js";

async function getAllBlogs(req, res) {
    let allBlogs = await Blog.find({});
    allBlogs = allBlogs.map((blog) => blog.toJSON());

    res.json(allBlogs);
}

async function postNewBlog(req, res) {
    const newBlog = new Blog(req.body);
    const saveResult = await newBlog.save();

    res.json(saveResult.toJSON());
}

export { getAllBlogs, postNewBlog };
