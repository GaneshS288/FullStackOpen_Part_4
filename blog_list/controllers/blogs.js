import Blog from "../models/blog.js";
import User from "../models/user.js";

async function getAllBlogs(req, res) {
    let allBlogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
        id: 1,
    });
    allBlogs = allBlogs.map((blog) => blog.toJSON());

    res.json(allBlogs);
}

async function postNewBlog(req, res) {
    const user = req.user;

    const newBlog = new Blog({ ...req.body, user: user._id });
    const saveResult = await newBlog.save();
    user.blogs = user.blogs.concat(saveResult._id);
    await user.save();

    res.status(201).json(saveResult.toJSON());
}

async function deleteBlogById(req, res) {
    const { id } = req.params;

    const user = req.user;

    const userContainsBlogId = user.blogs.includes(id);

    if (!userContainsBlogId) {
        return res
            .status(403)
            .json({ error: "you are not authorized to delete this blog" });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
        return res.status(404).json({ error: "no such entry" });
    } else {
        return res.status(204).end();
    }
}

async function updateBlogById(req, res) {
    const { id } = req.params;
    const body = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
        res.status(404).json({ error: "this entry doesn't exist" });
    } else {
        blog.title = body.title;
        blog.author = body.author;
        blog.url = body.url;
        blog.likes = body.likes;

        const updatedBlog = await blog.save();

        res.json(updatedBlog);
    }
}

export { getAllBlogs, postNewBlog, deleteBlogById, updateBlogById };
