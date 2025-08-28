import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Income from "../models/incomeModel.js";
const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const username = req.user.username;
    const incomeList = await Income.find({ username });

    res.json({
      code: 200,
      message: "獲取收入成功",
      result: incomeList,
    });
  } catch (error) {
    console.error("獲取收入失敗", error.message);
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const username = req.user.username;
    const newIncome = await Income.create({ username, ...req.body });

    res.json({
      code: 200,
      message: "新增收入成功",
      result: newIncome,
    });
  } catch (error) {
    console.error("新增收入失敗", error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedIncome = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.json({
      code: 200,
      message: "編輯收入成功",
      result: updatedIncome,
    });
  } catch (error) {
    console.error("編輯收入失敗", error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);

    res.json({
      code: 200,
      message: "刪除收入成功",
      result: null,
    });
  } catch (error) {
    console.error("刪除收入失敗", error.message);
  }
});

export default router;
