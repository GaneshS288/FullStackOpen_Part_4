import { describe, beforeEach, test, after } from "node:test";
import { strictEqual } from "node:assert";
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

    test("returned blogs have id parameter", async () => {
        const { body } = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const hasIdInEveryBlog = body.every((blog) => blog.id);

        strictEqual(hasIdInEveryBlog, true);
    });
});

after(async () => {
    await mongoose.connection.close();
});
