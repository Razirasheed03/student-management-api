import { Router } from "express";
import { registerAdmin, login } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema } from "../types/auth.validation";

const router = Router();

router.post("/register-admin", registerAdmin);
router.post("/login", validate(loginSchema), login);

export default router;