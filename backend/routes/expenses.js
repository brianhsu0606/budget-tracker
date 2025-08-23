import { Router } from "express";
import expenseList from "../data/defaultExpense.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    // const expenseList = await Expense.find();

    res.json({
      code: 200,
      message: "獲取支出成功",
      result: expenseList,
    });
  } catch (error) {}
});

export default router;
