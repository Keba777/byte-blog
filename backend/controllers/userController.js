import { User, validateUser } from "../models/user.js";
import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinary.js";

export const createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
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

    const folder = req.body.folder || "byte-blog";

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: folder,
    });

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      profilePicture: result.secure_url,
    });

    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
