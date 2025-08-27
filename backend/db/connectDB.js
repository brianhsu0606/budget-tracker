import mongoose from "mongoose";
import Expense from "../models/expenseModel.js";
import expenseList from "../data/defaultExpense.js";
import Income from "../models/incomeModel.js";
import incomeList from "../data/defaultIncome.js";

const mongoURL =
  "mongodb+srv://myuser:vue3projectDATABASE@cluster0.gdk1rhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected");

    await Expense.deleteMany({});
    await Income.deleteMany({});
    await Expense.insertMany(expenseList);
    await Income.insertMany(incomeList);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
