import express from "express";
import { getMe, login } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(protect, getMe);
router.route("/login").post(login);

export default router;
