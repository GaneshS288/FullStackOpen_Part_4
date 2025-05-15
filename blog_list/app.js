import express from "express";
import blogRouter from "./routes/blogRouter.js";
import { errorHandler } from "./util/middleware.js";
import { request as requestLogger } from "./util/logger.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api/blogs", blogRouter);

app.use(errorHandler);

export default app;

