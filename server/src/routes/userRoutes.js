import express from "express";
import verifyJwt from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {
  fetchAllUsers,
  updateUserRole,
  updateUserStatus,
} from "../controllers/user.js";

const userRouter = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
userRouter.get("/users", verifyJwt, authorizeRoles("admin"), fetchAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}/role:
 *   patch:
 *     summary: Update a user's role (admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: Role to assign
 *     responses:
 *       200:
 *         description: Role updated
 */
userRouter.patch(
  "/users/:id/role",
  verifyJwt,
  authorizeRoles("admin"),
  updateUserRole,
);

/**
 * @swagger
 * /api/v1/users/{id}/status:
 *   patch:
 *     summary: Update a user's active status (admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Status updated
 */
userRouter.patch(
  "/users/:id/status",
  verifyJwt,
  authorizeRoles("admin"),
  updateUserStatus,
);

export default userRouter;
