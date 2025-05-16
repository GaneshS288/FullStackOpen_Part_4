import Blog from "../models/blog.js";

async function getAllBlogs(req, res) {
    let allBlogs = await Blog.find({});
    allBlogs = allBlogs.map((blog) => blog.toJSON());

    res.json(allBlogs);
}

async function postNewBlog(req, res) {
    const newBlog = new Blog(req.body);
    const saveResult = await newBlog.save();

    res.status(201).json(saveResult.toJSON());
}

async function deleteBlogById(req, res) {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
        return res.status(404).json({ error: "no such entry" });
    } else {
        return res.status(204).end();
    }
}

export { getAllBlogs, postNewBlog, deleteBlogById };
