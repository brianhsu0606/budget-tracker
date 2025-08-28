import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Expense from "../models/expenseModel.js";
const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const username = req.user.username;
    const expenseList = await Expense.find({ username });

    res.json({
      code: 200,
      message: "獲取支出成功",
      result: expenseList,
    });
  } catch (error) {
    console.error("獲取支出失敗", error.message);
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const username = req.user.username;
    const newExpense = await Expense.create({ username, ...req.body });

    res.json({
      code: 200,
      message: "新增支出成功",
      result: newExpense,
    });
  } catch (error) {
    console.error("新增支出失敗", error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.json({
      code: 200,
      message: "編輯支出成功",
      result: updatedExpense,
    });
  } catch (error) {
    console.error("編輯支出失敗", error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);

    res.json({
      code: 200,
      message: "刪除支出成功",
      result: null,
    });
  } catch (error) {
    console.error("刪除支出失敗", error.message);
  }
});

export default router;
