import express from "express";
import {} from "../controllers/postController.js";

const router = express.Router();

router.route("/").get();

export default router;
