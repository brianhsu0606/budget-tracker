import { Router } from "express";
import incomeList from "../data/defaultIncome.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.json({
      code: 200,
      message: "獲取收入成功",
      result: incomeList,
    });
  } catch (error) {}
});

export default router;
