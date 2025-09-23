import { Router } from "express";
import { loginWithPassword, sendMagicLink } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginWithPassword);
router.post("/magic-link", sendMagicLink);

export default router;
