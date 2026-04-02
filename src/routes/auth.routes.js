import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().trim().email("Email invalide"),
  password: z.string().min(6, "Mot de passe min 6 caractères"),
  role: z.enum(["ADMIN", "COACH", "ABONNE"]).default("ADMIN"),
});

const loginSchema = z.object({
  email: z.string().trim().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

const router = Router();
const controller = new AuthController();

router.post("/register", validate(registerSchema), (req, res, next) => controller.register(req, res, next));
router.post("/login", validate(loginSchema), (req, res, next) => controller.login(req, res, next));

export default router;
