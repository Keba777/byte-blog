import { Router } from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", [authMiddleware, upload.single("image")], createBlog);
router.get("/", getBlogs);
router.get("/:blogId", authMiddleware, getBlogById);
router.patch("/:blogId", [authMiddleware, upload.single("image")], updateBlog);
router.delete("/:blogId", authMiddleware, deleteBlog);

export default router;
