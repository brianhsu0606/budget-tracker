import dotenv from "dotenv";
dotenv.config();

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

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
