import { Router } from "express";
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getProjects);

router.post("/", authenticateToken, createProject);

router.get("/:id", authenticateToken, getProjectById);

router.put("/:id", authenticateToken, updateProject);

router.delete("/:id", authenticateToken, deleteProject);

export default router;
