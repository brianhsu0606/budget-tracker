import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";

const router = Router();
const SECRET_KEY = "my_secret_key"; // 建議改放 .env
const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));

// 登入
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  if (password !== user.password) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token, userId: user.id });
});

// 登出（前端刪 token 即可）
router.post("/logout", (req, res) => {
  res.json({ message: "Logout success" });
});

export default router;
