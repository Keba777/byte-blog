import { Router } from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/", upload.single("image"), createBlog);
router.get("/", getBlogs);
router.get("/:blogId", getBlogById);
router.patch("/:blogId", upload.single("image"), updateBlog);
router.delete("/:blogId", deleteBlog);

export default router;
