import express from "express";
import {
  createRecord,
  deleteRecord,
  filterRecords,
  getRecords,
  getTempDeletedRecords,
  restoreRecord,
  searchRecords,
  softDelete,
  updateRecord,
} from "../controllers/records.js";
import verifyJwt from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const recordRouter = express.Router();

/**
 * @swagger
 * /api/v1/records:
 *   get:
 *     summary: Get all records (admin/analyst)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of records
 */

recordRouter.get(
  "/records",
  verifyJwt,
  authorizeRoles("admin", "analyst"),
  getRecords,
);

recordRouter.get(
  "/records/search",
  verifyJwt,
  authorizeRoles("admin", "analyst"),
  searchRecords,
);
/**
 * @swagger
 * /api/v1/records/search:
 *   get:
 *     summary: Search records by query across fields (admin/analyst)
 *     tags:
 *       - Records
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query (matches category, description, type, amount)
 *     responses:
 *       200:
 *         description: Search results
 */
recordRouter.get(
  "/records/filter",
  verifyJwt,
  authorizeRoles("admin", "analyst"),
  filterRecords,
);
/**
 * @swagger
 * /api/v1/records/filter:
 *   get:
 *     summary: Filter records by type/category/date (admin/analyst)
 *     tags:
 *       - Records
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: income or expense
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date in ISO format (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Filtered records
 */

/**
 * @swagger
 * /api/v1/records:
 *   post:
 *     summary: Create a financial record (admin only)
 *     tags:
 *       - Records
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - type
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record created
 *       400:
 *         description: Invalid input
 */
recordRouter.post("/records", verifyJwt, authorizeRoles("admin"), createRecord);

recordRouter.put(
  "/records/:id",
  verifyJwt,
  authorizeRoles("admin"),
  updateRecord,
);
/**
 * @swagger
 * /api/v1/records/{id}:
 *   put:
 *     summary: Update a financial record (admin only)
 *     tags:
 *       - Records
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
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record updated
 *       404:
 *         description: Record not found
 */

recordRouter.patch(
  "/records/:id/soft-delete",
  verifyJwt,
  authorizeRoles("admin"),
  softDelete,
);
/**
 * @swagger
 * /api/v1/records/{id}/soft-delete:
 *   patch:
 *     summary: Soft-delete a record (mark as deleted) (admin only)
 *     tags:
 *       - Records
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record soft-deleted
 */

recordRouter.get(
  "/records/trash",
  verifyJwt,
  authorizeRoles("admin"),
  getTempDeletedRecords,
);
/**
 * @swagger
 * /api/v1/records/trash:
 *   get:
 *     summary: Get temporarily deleted records (admin only)
 *     tags:
 *       - Records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of soft-deleted records
 */

recordRouter.patch(
  "/records/:id/restore",
  verifyJwt,
  authorizeRoles("admin"),
  restoreRecord,
);
/**
 * @swagger
 * /api/v1/records/{id}/restore:
 *   patch:
 *     summary: Restore a soft-deleted record (admin only)
 *     tags:
 *       - Records
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record restored
 */

recordRouter.delete(
  "/records/:id",
  verifyJwt,
  authorizeRoles("admin"),
  deleteRecord,
);
/**
 * @swagger
 * /api/v1/records/{id}:
 *   delete:
 *     summary: Permanently delete a record (admin only)
 *     tags:
 *       - Records
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record permanently deleted
 */

export default recordRouter;
