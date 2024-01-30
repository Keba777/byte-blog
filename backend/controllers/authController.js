import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";

export const loginUser = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user;

    const isEmail =
      Joi.string().email().validate(req.body.identifier).error === null;

    if (isEmail) user = await User.findOne({ email: req.body.identifier });
    else user = await User.findOne({ username: req.body.identifier });

    if (!user)
      return res
        .status(401)
        .send({ message: "Invalid Email/Username or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res
        .status(401)
        .send({ message: "Invalid Email/Username or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ token: token, message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const validateLogin = (data) => {
  const schema = Joi.object({
    identifier: Joi.string().required().label("Email/Username"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};
