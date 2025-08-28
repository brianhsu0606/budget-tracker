import mongoose from "mongoose";
import toJSON from "../utils/toJSON.js";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
toJSON(userSchema);

const User = mongoose.model("User", userSchema);

export default User;
