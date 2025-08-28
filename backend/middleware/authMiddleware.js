import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ code: 401, message: "未授權" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 取得 username
    next();
  } catch (err) {
    res.status(401).json({ code: 401, message: "Token 無效或過期" });
  }
};
