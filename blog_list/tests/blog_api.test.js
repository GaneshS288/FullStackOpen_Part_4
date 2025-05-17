import { describe, beforeEach, test, after } from "node:test";
import { strictEqual, deepStrictEqual } from "node:assert";
import supertest from "supertest";
import app from "../app.js";
import Blog, { mongoose } from "../models/blog.js";
import User from "../models/user.js";
import { testBlogsData } from "./testHelper.js";

const api = supertest(app);

describe("Viewing blogs", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(testBlogsData);
    });

    test("retruns the correct number of blogs", async () => {
        const res = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        strictEqual(res.body.length, 6);
    });

    test("returned blogs have id property", async () => {
        const { body } = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const hasIdInEveryBlog = body.every((blog) => blog.id);

        strictEqual(hasIdInEveryBlog, true);
    });
});

describe("Adding a blog", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(testBlogsData);
    });

    test("successfully adds blog", async () => {
        const dummyBlog = {
            title: "This is a test blog",
            author: "Ganesh",
            url: "http://notARealURL.com",
            likes: 12,
        };

        await api
            .post("/api/blogs")
            .send(dummyBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const { body } = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const uploadedBlog = body.find(
            (blog) => blog.title === dummyBlog.title
        );
        delete uploadedBlog.id;

        deepStrictEqual(uploadedBlog, dummyBlog);
    });

    test("if like property is missing in post request it defaults to 0", async () => {
        const dummyBlog = {
            title: "This is a test blog",
            author: "Ganesh",
            url: "http://notARealURL.com",
        };

        await api
            .post("/api/blogs")
            .send(dummyBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const { body } = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const uploadedBlog = body.find(
            (blog) => blog.title === dummyBlog.title
        );

        strictEqual(uploadedBlog.likes, 0);
    });

    test("if url or title property is missing from the post request 400 status is returned", async () => {
        const dummyBlog = {
            title: "This is a test blog",
            author: "Ganesh",
        };

        await api
            .post("/api/blogs")
            .send(dummyBlog)
            .expect(400)
            .expect("Content-Type", /application\/json/);
    });
});

describe("Deleting a blog", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(testBlogsData);
    });

    test("returns 204 status on successfull deletion and deletes blog", async () => {
        const responseBeforeDelete = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const blogId = responseBeforeDelete.body[0].id;

        await api.delete(`/api/blogs/${blogId}`).expect(204);

        const responseAfterDelete = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        strictEqual(
            responseAfterDelete.body.length,
            responseBeforeDelete.body.length - 1
        );
    });

    test("returns 404 status when the blog with id doesn't exist", async () => {
        const blogId = "68244dc6c0d680d3c9815448";
        await api.delete(`/api/blogs/${blogId}`).expect(404);
    });
});

describe("Updating a blog", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(testBlogsData);
    });

    test("sucessfully updates a blog", async () => {
        const responseBeforeUpdate = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const blogId = responseBeforeUpdate.body[0].id;

        const updateData = {
            title: "how to test software",
            author: "ganesh",
            url: "https://someRandomUrl.com",
            likes: 20,
        };

        const { body: updatedBlog } = await api
            .put(`/api/blogs/${blogId}`)
            .send(updateData)
            .expect(200);
        delete updatedBlog.id;

        deepStrictEqual(updatedBlog, updateData);
    });

    test("retruns 404 if blog with id doesn't exist", async () => {
        const blogId = "68244dc6c0d680d3c9815448";

        const updateData = {
            title: "how to test software",
            author: "ganesh",
            url: "https://someRandomUrl.com",
            likes: 20,
        };

        await api.put(`/api/blogs/${blogId}`).send(updateData).expect(404);
    });

    test("returns 400 if a field is missing in request body", async () => {
        const responseBeforeUpdate = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const blogId = responseBeforeUpdate.body[0].id;

        const updateData = {
            title: "how to test software",
            author: "ganesh",
        };

        await api.put(`/api/blogs/${blogId}`).send(updateData).expect(400);
    });
});

describe("Creating users", () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    test("succesfully creates user", async () => {
        const user = {
            username: "ganesh",
            name: "Ganesh",
            password: "puny",
        };

        const res = await api
            .post("/api/users")
            .send(user)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const createdUser = await User.findById(res.body.id);

        strictEqual(createdUser.username, "ganesh");
    });

    test("Fails with 400 when password is less than 3 characters", async () => {
        const user = {
            username: "ganesh",
            name: "Ganesh",
            password: "pu",
        };

        const res = await api
            .post("/api/users")
            .send(user)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        strictEqual(
            res.body.error,
            "password must be at least 3 characters long"
        );
    });
});

after(async () => {
    await mongoose.connection.close();
});
