import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

const router = Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "使用者不存在" });
    }

    res.json({
      code: 200,
      message: "成功取得個人資料",
      result: {
        displayName: user.displayName,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updatedProfile = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });

    res.json({
      code: 200,
      message: "成功更新個人資料",
      result: updatedProfile,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
