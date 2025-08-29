import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "使用者不存在" });
    }

    res.json({
      code: 200,
      message: "成功取得個人資料",
      result: {
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

export default router;
