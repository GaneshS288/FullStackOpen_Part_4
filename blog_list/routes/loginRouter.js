import { Router } from "express";
import { loginUser } from "../controllers/login.js";

const loginRouter = Router();

loginRouter.post("/", loginUser);

export default loginRouter;