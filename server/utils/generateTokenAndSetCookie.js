import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const secret = process.env.JWT_SECRET;

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, secret, { expiresIn: "7d" });

  res.cookie("insight", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};
