import express from "express";
import verifyJwt from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {
  fetchAllUsers,
  updateUserRole,
  updateUserStatus,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/users", verifyJwt, authorizeRoles("admin"), fetchAllUsers);

userRouter.patch(
  "/users/:id/role",
  verifyJwt,
  authorizeRoles("admin"),
  updateUserRole,
);

userRouter.patch(
  "/users/:id/status",
  verifyJwt,
  authorizeRoles("admin"),
  updateUserStatus,
);

export default userRouter;
