import { Router } from "express";
import { createUser, getUserById } from "../controllers/userController.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/", upload.single("profilePicture"), createUser);
router.get("/:id", getUserById);

export default router;
