import express from "express";
import * as CommentsController from "../controllers/comment";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.post("/add", requiresAuth, CommentsController.addComment);
router.post("/reply", requiresAuth, CommentsController.replyComment);
router.get("/post/:postId", CommentsController.getCommentsByPost);

export default router;
