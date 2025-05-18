import * as logger from "./logger.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

function errorHandler(error, req, res, next) {
    logger.error(error.message);

    if (error.name === "CastError") {
        return res.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
    } else if (
        error.name === "MongoServerError" &&
        error.message.includes("E11000 duplicate key error")
    ) {
        return res
            .status(400)
            .json({ error: "expected `username` to be unique" });
    } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
            error: "invalid token",
        });
    } else if (error.name === "TokenExpiredError") {
        return res.status(401).json({
            error: "token expired",
        });
    }

    next(error);
}

function tokenExtractor(req, res, next) {
    const authorization = req.get("authorization");

    if (authorization && authorization.startsWith("Bearer ")) {
        req.token = authorization.replace("Bearer ", "");
    } else {
        req.token = null;
    }
    next();
}

async function userExtractor(req, res, next) {
    const decodedToken = jwt.verify(req.token, JWT_SECRET);

    if (!decodedToken.id) {
        return res.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
        return res.status(400).json({ error: "UserId missing or not valid" });
    }

    req.user = user;
    next();
}

export { errorHandler, tokenExtractor, userExtractor };
