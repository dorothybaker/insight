import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(403).json("Email address already exists!");

    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new User({ fullName, email, password: hashedPassword });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      res.status(201).json("User successfully signed up!");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json("Invalid email address or password!");

    const existingPassword = bcrypt.compareSync(password, user.password || "");
    if (!existingPassword)
      return res.status(403).json("Invalid email address or password!");

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json("User successfully signed in");
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("insight");
    res.status(200).json("Signed out successfully!");
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const getMe = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json("User not found!");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};
