import { describe, beforeEach, test, after } from "node:test";
import { strictEqual, deepStrictEqual } from "node:assert";
import supertest from "supertest";
import app from "../app.js";
import Blog, { mongoose } from "../models/blog.js";
import { testBlogsData } from "./testHelper.js";

const api = supertest(app);

describe("Blog api", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(testBlogsData);
    });

    test("get request returns correct number of blogs", async () => {
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

    test("post requests can add blogs", async () => {
        const dummyBlog = {
            title : "This is a test blog",
            author : "Ganesh",
            url: "http://notARealURL.com",
            likes : 12,
        }

        await api.post("/api/blogs").send(dummyBlog).expect(201).expect("Content-Type", /application\/json/);

        const { body } = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

            const uploadedBlog = body.find((blog) => blog.title === dummyBlog.title);
            delete uploadedBlog.id;

            deepStrictEqual(uploadedBlog, dummyBlog);
    })

    test("if like property is missing in post request it defaults to 0", async () => {
        const dummyBlog = {
            title : "This is a test blog",
            author : "Ganesh",
            url: "http://notARealURL.com"
        }

        await api.post("/api/blogs").send(dummyBlog).expect(201).expect("Content-Type", /application\/json/);

        const { body } = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

            const uploadedBlog = body.find((blog) => blog.title === dummyBlog.title);

            strictEqual(uploadedBlog.likes, 0);
    })
});

after(async () => {
    await mongoose.connection.close();
});
