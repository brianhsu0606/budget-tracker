import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import userList from "../data/defaultUser.js";

const initUser = async () => {
  for (const user of userList) {
    const exist = await User.findOne({ username: user.username });

    if (!exist) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await User.create({
        username: user.username,
        password: hashedPassword,
      });
      console.log(`初始化帳號 ${user.username} 完成`);
    }
  }
};

export default initUser;
