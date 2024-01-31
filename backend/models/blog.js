import mongoose from "mongoose";
import Joi from "joi";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tags: [{ type: String }],
  likes: { type: Number, default: 0 },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: null },
});

blogSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

const validateBlog = (blog) => {
  const schema = Joi.object({
    title: Joi.string(),
    content: Joi.string().min(10),
    author: Joi.string(),
    tags: Joi.array(),
    likes: Joi.number().default(0),
    image: Joi.string(),
    createdAt: Joi.date().default(Date.now()),
    updatedAt: Joi.date(),
  });
  return schema.validate(blog);
};

export { Blog, validateBlog };
