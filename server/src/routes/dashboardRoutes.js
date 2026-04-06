import express from "express";
import verifyJwt from "../middlewares/authMiddleware.js";
import { getSummary } from "../controllers/dashboardSummary.js";

const dashboardRouter = express.Router();

/**
 * @swagger
 * /api/v1/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary (totals and recent activity) (admin/analyst/viewer)
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary
 */
dashboardRouter.get("/dashboard/summary", verifyJwt, getSummary);

export default dashboardRouter;