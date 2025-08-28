import Expense from "../models/expenseModel.js";
import Income from "../models/incomeModel.js";
import defaultExpenses from "../data/defaultExpenses.js";
import defaultIncomes from "../data/defaultIncomes.js";
import initUser from "../utils/initUser.js";

const initDB = async () => {
  try {
    console.log("資料庫初始化...");

    await Expense.deleteMany({});
    await Income.deleteMany({});
    await Expense.insertMany(defaultExpenses);
    await Income.insertMany(defaultIncomes);

    await initUser();
  } catch (error) {
    console.error("初始資料有問題:", error);
  }
};

export default initDB;
