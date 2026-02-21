import { Router } from "express";
import { assignTask, getMyTasks, updateTaskStatus } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { assignTaskSchema, updateTaskStatusSchema } from "../types/task.validation";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requireRole("admin"),
  validate(assignTaskSchema),
  assignTask
);
router.get(
  "/my",
  authMiddleware,
  requireRole("student"),
  getMyTasks
);
router.patch(
  "/:taskId",
  authMiddleware,
  requireRole("student"),
  validate(updateTaskStatusSchema),
  updateTaskStatus
);
export default router;