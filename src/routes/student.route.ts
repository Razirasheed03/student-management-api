import { Router } from "express";
import { createStudent } from "../controllers/student.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createStudentSchema } from "../types/student.validation";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requireRole("admin"),
  validate(createStudentSchema),
  createStudent
);

export default router;