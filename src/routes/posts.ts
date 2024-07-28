import express from "express";
// import {getPosts} from "../controllers/posts";
import * as PostsController from "../controllers/posts";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

// Get all unique categories
router.get("/categories", PostsController.getUniqueCategories);

router.get("/", PostsController.getPosts);

router.get("/:postId", PostsController.getPost);

router.post("/", PostsController.createPosts);

router.patch("/:postId", PostsController.updatePost);

router.delete("/:postId", requiresAuth, PostsController.deletePost);

// Get posts by category
router.get("/category/:category", PostsController.getPostsByCategory);

router.put("/upvote/:postId", PostsController.upvotePost);

router.put("/downvote/:postId", PostsController.downvotePost);

router.get("/sorted-by-date", PostsController.getPostsSortedByDate);

router.get("/sorted-by-upvotes", PostsController.getPostsSortedByUpvotes);

export default router;
