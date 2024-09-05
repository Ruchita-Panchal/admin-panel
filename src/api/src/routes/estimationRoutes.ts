import { Router } from "express";
import {
  getEstimations,
  createEstimation,
  getEstimationById,
  updateEstimation,
  deleteEstimation,
} from "../controllers/estimationController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getEstimations);

router.post("/", authenticateToken, createEstimation);

router.get("/:id", authenticateToken, getEstimationById);

router.put("/:id", authenticateToken, updateEstimation);

router.delete("/:id", authenticateToken, deleteEstimation);

export default router;
