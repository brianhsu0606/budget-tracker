import express from "express";
import cors from "cors";
import expenseList from "./data/defaultExpense.js";
import incomeList from "./data/defaultIncome.js";

const app = express();
const port = 3000;

app.use(cors()); // 跨域設定讓前端能請求
app.use(express.json()); // 解析 JSON body

app.get("/", (req, res) => {
  res.send("後端運行中");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Expense
app.get("/api/expenses", async (req, res) => {
  try {
    // const expenseList = await Expense.find();

    res.json({
      code: 200,
      message: "獲取支出成功",
      result: expenseList,
    });
  } catch (error) {}
});

app.get("/api/incomes", async (req, res) => {
  try {
    res.json({
      code: 200,
      message: "獲取收入成功",
      result: incomeList,
    });
  } catch (error) {}
});
