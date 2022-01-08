import express from "express";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getPost,
  getPosts,
  likePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(protect, getPosts).post(protect, createPost);
router.route("/:id").get(protect, getPost).delete(protect, deletePost);
router.route("/like/:id").put(protect, likePost);
router.route("/comment/:id").post(protect, createComment);
router.route("/comment/:id/:comment_id").delete(protect, deleteComment);

export default router;
