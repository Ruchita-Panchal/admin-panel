import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findUserByUsername, createUser } from "../services/userService";
import { comparePasswords } from "../utils/hash";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ error: "User does not exists!" });
  }

  const isPasswordValid = comparePasswords(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials!" });
  }

  const token = jwt.sign({ username: user.username, id: user.id }, JWT_SECRET, {
    expiresIn: "5h",
  });

  res.json({ token, username });
};

export const register = (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  // console.log(req.body);
  const existingUser = findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const user = createUser(email, username, password);
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ token, username });
};
