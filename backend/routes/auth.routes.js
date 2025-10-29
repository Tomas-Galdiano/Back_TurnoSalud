import { Router } from "express";
import { login, magicLink, resetPassword } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/magic-link", magicLink);
router.post("/reset-password", resetPassword);

export default router;