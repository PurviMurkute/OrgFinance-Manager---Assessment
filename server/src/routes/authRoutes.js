import express from "express";

const authRouter = express.Router();

import { RegisterUser, LoginUser } from "../controllers/auth.js";

authRouter.post("/auth/register", RegisterUser);
authRouter.post("/auth/login", LoginUser);

export default authRouter;