import mongoose from "mongoose";
// const toJSON = require('../utils/toJSON')

const expenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});
toJSON(expenseSchema);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
