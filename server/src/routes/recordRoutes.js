import express from "express";
import {
  createRecord,
  deleteRecord,
  getRecords,
  getTempDeletedRecords,
  restoreRecord,
  softDelete,
  updateRecord,
} from "../controllers/records.js";
import verifyJwt from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const recordRouter = express.Router();

recordRouter.get("/records", verifyJwt, authorizeRoles("admin", "analyst"), getRecords);

recordRouter.post("/records", verifyJwt, authorizeRoles("admin"), createRecord);

recordRouter.put(
  "/records/:id",
  verifyJwt,
  authorizeRoles("admin"),
  updateRecord,
);

recordRouter.patch(
  "/records/:id/soft-delete",
  verifyJwt,
  authorizeRoles("admin"),
  softDelete,
);

recordRouter.get(
  "/records/trash",
  verifyJwt,
  authorizeRoles("admin"),
  getTempDeletedRecords,
);

recordRouter.patch(
  "/records/:id/restore",
  verifyJwt,
  authorizeRoles("admin"),
  restoreRecord,
);

recordRouter.delete(
  "/records/:id",
  verifyJwt,
  authorizeRoles("admin"),
  deleteRecord,
);

export default recordRouter;
