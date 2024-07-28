import express from "express";
import * as AuthController from "../controllers/auth";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, AuthController.getAuthenticatedUser);
router.post("/signup", AuthController.signUp);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

export default router;
