import express from "express";
import {
  createOrUpdate,
  deleteProfile,
  educationDelete,
  eduUpdate,
  experienceDelete,
  experienceUpdate,
  getAllProfiles,
  getProfile,
  getUser,
  githubRepos,
} from "../controllers/profileController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/me").get(protect, getUser);
router
  .route("/")
  .post(protect, createOrUpdate)
  .get(getAllProfiles)
  .delete(protect, deleteProfile);
router.route("/user/:user_id").get(getProfile);

// work experience routes
router.route("/experience").put(protect, experienceUpdate);
router.route("/experience/:exp_id").delete(protect, experienceDelete);
// education routes
router.route("/education").put(protect, eduUpdate);
router.route("/education/:edu_id").delete(protect, educationDelete);

// github routes
router.route("/github/:username").get(githubRepos);

export default router;
