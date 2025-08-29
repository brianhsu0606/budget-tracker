import { Router } from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

const router = Router();

// 註冊 register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({
        code: 400,
        message: "帳號必須介於 3 到 20 個字元",
        result: null,
      });
    }

    if (password.length < 5 || password.length > 20) {
      return res.status(400).json({
        code: 400,
        message: "密碼必須介於 5 到 20 個字元",
        result: null,
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        code: 400,
        message: "此帳號已存在",
        result: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await User.create({
      username,
      password: hashedPassword,
      avatar: "avatar1.jpg",
      displayName: username,
    });

    res.json({
      code: 200,
      message: "註冊成功",
      result: null,
    });
  } catch (error) {
    console.error("註冊失敗", error);
  }
});

// 登入
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        code: 400,
        message: "帳號已存在",
        result: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        code: 400,
        message: "帳號或密碼錯誤",
        result: null,
      });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      code: 200,
      message: "登入成功",
      result: token,
    });
  } catch (error) {
    console.error("登入失敗", error);
  }
});

export default router;
