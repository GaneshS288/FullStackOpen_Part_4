import { Router } from "express";
import { postUser, getAllUsers } from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", postUser);

export default userRouter;