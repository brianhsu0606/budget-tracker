import { Router } from "express";
import Expense from "../models/expenseModel.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const expenseList = await Expense.find();

    res.json({
      code: 200,
      message: "獲取支出成功",
      result: expenseList,
    });
  } catch (error) {}
});

router.post("/", async (req, res) => {
  try {
    const newExpense = await Expense.create(req.body);

    res.json({
      code: 200,
      message: "新增支出成功",
      result: newExpense,
    });
  } catch (error) {
    console.error("新增支出失敗:", error.message);
  }
});

export default router;
