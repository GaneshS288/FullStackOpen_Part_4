import express from "express";
import blogRouter from "./routes/blogRouter.js";
import { errorHandler, tokenExtractor, userExtractor } from "./util/middleware.js";
import { request as requestLogger } from "./util/logger.js";
import userRouter from "./routes/userRouter.js";
import loginRouter from "./routes/loginRouter.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api/blogs", tokenExtractor, userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(errorHandler);

export default app;

