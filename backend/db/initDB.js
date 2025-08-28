import Expense from "../models/expenseModel.js";
import expenseList from "../data/defaultExpense.js";
import Income from "../models/incomeModel.js";
import incomeList from "../data/defaultIncome.js";

const initDB = async () => {
  try {
    await Expense.deleteMany({});
    await Income.deleteMany({});
    await Expense.insertMany(expenseList);
    await Income.insertMany(incomeList);
  } catch (error) {
    console.error("初始資料有問題:", error);
  }
};

export default initDB;
