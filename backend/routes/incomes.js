import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Income from "../models/incomeModel.js";
const router = Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const username = req.user.username;
    const incomeList = await Income.find({ username }).sort({ date: -1 });

    res.json({
      code: 200,
      message: "獲取收入成功",
      result: incomeList,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const username = req.user.username;
    const newIncome = await Income.create({ username, ...req.body });

    res.json({
      code: 200,
      message: "新增收入成功",
      result: newIncome,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const username = req.user.username;
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ code: 404, message: "找不到收入資料" });
    }

    if (income.username !== username) {
      return res.status(403).json({ code: 403, message: "無權限編輯這筆資料" });
    }

    const updatedIncome = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.json({
      code: 200,
      message: "編輯收入成功",
      result: updatedIncome,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const username = req.user.username;
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ code: 404, message: "找不到收入資料" });
    }

    if (income.username !== username) {
      return res.status(403).json({ code: 403, message: "無權限編輯這筆資料" });
    }

    await Income.findByIdAndDelete(req.params.id);

    res.json({
      code: 200,
      message: "刪除收入成功",
      result: null,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
