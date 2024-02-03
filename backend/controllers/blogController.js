import { Blog, validateBlog } from "../models/blog.js";
import cloudinary from "../utils/cloudinary.js";

export const createBlog = async (req, res) => {
  try {
    const { error } = validateBlog(req.body);
    if (error)
      return res.status(404).send({ message: error.details[0].message });

    let image;
    if (req.file) {
      const folder = req.body.folder || "byte-blog";
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: folder,
      });
      image = result.secure_url;
    }

    const newBlog = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      tags: req.body.tags,
      image: image,
    });

    await newBlog.save();
    res.status(201).send(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate({
      path: "author",
      select: "-password",
    });
    res.status(200).send(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId).populate({
      path: "author",
      select: "-password",
    });
    if (!blog)
      return res.status(404).send("The blog with the given ID was not found.");
    res.status(200).send(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { error } = validateBlog(req.body);
    if (error)
      return res.status(404).send({ message: error.details[0].message });
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (!blog)
      return res.status(404).send("The blog with the given ID was not found.");

    let result;
    if (req.file) {
      const folder = req.body.folder || "byte-blog";
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: folder,
      });
    }
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.tags = req.body.tags || blog.tags;
    blog.likes = req.body.likes || blog.likes;
    blog.image = result ? result.secure_url : blog.image;

    const updatedBlog = await blog.save();
    res.status(200).send(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (!blog)
      return res.status(404).send("The blog with the given ID was not found.");

    await Blog.findByIdAndDelete(blogId);
    res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
