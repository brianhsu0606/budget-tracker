import express from "express";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import initDB from "./db/initDB.js";
import expenseRoutes from "./routes/expenses.js";
import incomeRoutes from "./routes/incomes.js";
import authRoutes from "./routes/auth.js";

const app = express();
const port = 3000;

connectDB();
initDB();

app.use(cors()); // 跨域設定讓前端能請求
app.use(express.json()); // 解析 JSON body

app.use("/api/expenses", expenseRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
