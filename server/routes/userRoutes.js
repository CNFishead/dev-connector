import express from "express";
import { createNewUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createNewUser);

export default router;
