import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/", upload.single("profilePicture"), createUser);
router.get("/:id", getUserById);
router.patch("/:id", upload.single("profilePicture"), updateUser);
router.delete("/:id", deleteUser);

export default router;
