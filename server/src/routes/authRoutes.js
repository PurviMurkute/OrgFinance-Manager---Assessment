import express from "express";

const authRouter = express.Router();

import { RegisterUser, LoginUser } from "../controllers/user.js";

authRouter.post("/auth/register", RegisterUser);
authRouter.post("/auth/login", LoginUser);

export default authRouter;