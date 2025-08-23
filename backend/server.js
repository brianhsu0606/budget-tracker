import express from "express";
import cors from "cors";
import expensesRoutes from "./routes/expenses.js";
import incomeRoutes from "./routes/incomes.js";

const app = express();
const port = 3000;

app.use(cors()); // 跨域設定讓前端能請求
app.use(express.json()); // 解析 JSON body

app.use("/api/expenses", expensesRoutes);
app.use("/api/incomes", incomeRoutes);

app.get("/", (req, res) => {
  res.send("後端運行中");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
