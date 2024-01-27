import {
  User,
  validateUserCreate,
  validateUserUpdate,
} from "../models/user.js";
import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinary.js";

export const createUser = async (req, res) => {
  try {
    const { error } = validateUserCreate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let existingUser = await User.findOne({ username: req.body.username });
    if (existingUser)
      return res
        .status(409)
        .send({ message: "User with the given username already exists" });

    existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res
        .status(409)
        .send({ message: "User with the given email already exists" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    let profilePictureUrl = null;
    if (req.file) {
      const folder = req.body.folder || "byte-blog";
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: folder,
      });
      profilePictureUrl = result.secure_url;
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      profilePicture: profilePictureUrl,
    });

    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { error } = validateUserUpdate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User with the given ID not found");

    let hashPassword = user.password;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      hashPassword = await bcrypt.hash(req.body.password, salt);
    }

    let result;
    if (req.file) {
      const folder = req.body.folder || "byte-blog";
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: folder,
      });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.password = hashPassword;
    user.profilePicture = result ? result.secure_url : user.profilePicture;

    const updatedUser = await user.save();
    res.send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).send({ message: "User not found" });

    await User.findByIdAndDelete(userId);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
