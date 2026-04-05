import express from "express";
import verifyJwt from "../middlewares/authMiddleware.js";
import { getSummary } from "../controllers/dashboardSummary.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/dashboard/summary", verifyJwt, getSummary);

export default dashboardRouter;