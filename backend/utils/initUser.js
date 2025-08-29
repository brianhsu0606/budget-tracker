import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const initUser = async () => {
  try {
    const defaultUsers = [{ username: "brian", password: process.env.DEFAULT_USER_PASSWORD }];

    for (const user of defaultUsers) {
      const exist = await User.findOne({ username: user.username });

      if (!exist) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        await User.create({
          username: user.username,
          password: hashedPassword,
          avatar: "avatar1.jpg",
          displayName: user.username,
        });
        console.log(`初始化帳號 ${user.username} 完成`);
      }
    }
  } catch (error) {
    console.error("初始化使用者時發生錯誤:", error);
  }
};

export default initUser;
