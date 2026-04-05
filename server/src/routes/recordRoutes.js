import express from "express";
import {
  createRecord,
  deleteRecord,
  getRecords,
} from "../controllers/records.js";
import verifyJwt from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const recordRouter = express.Router();

recordRouter.get("/records", verifyJwt, getRecords);

recordRouter.post("/records", verifyJwt, authorizeRoles("admin"), createRecord);

recordRouter.delete(
  "/records/:id",
  verifyJwt,
  authorizeRoles("admin"),
  deleteRecord,
);

export default recordRouter;
