import mongoose from "mongoose";
import toJSON from "../utils/toJSON.js";

const incomeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});
toJSON(incomeSchema);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
