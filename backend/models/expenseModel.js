import mongoose from "mongoose";
import toJSON from "../utils/toJSON.js";

const expenseSchema = new mongoose.Schema({
  username: { type: String },
  date: { type: Date, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});
toJSON(expenseSchema);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
