import express from "express";
import {
  createOrUpdate,
  deleteProfile,
  experienceDelete,
  experienceUpdate,
  getAllProfiles,
  getProfile,
  getUser,
} from "../controllers/profileController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/me").get(protect, getUser);
router
  .route("/")
  .post(protect, createOrUpdate)
  .get(getAllProfiles)
  .delete(protect, deleteProfile);
router.route("/experience").put(protect, experienceUpdate);
router.route("/experience/:exp_id").delete(protect, experienceDelete);
router.route("/user/:user_id").get(getProfile);

export default router;
