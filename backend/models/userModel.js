import mongoose from "mongoose";
import toJSON from "../utils/toJSON.js";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  displayName: { type: String },
  avatar: { type: String, default: "avatar1.jpg" },
});
toJSON(userSchema);

const User = mongoose.model("User", userSchema);

export default User;
