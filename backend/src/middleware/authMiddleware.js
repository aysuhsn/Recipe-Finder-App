import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Token yoxlaması (login olan istifadeçini tanımaq üçün)
export const authenticate = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({ message: "Token yoxdur" });
  }

  const token = bearer.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ message: "Token etibarsızdır" });
  }
};

// Admin yoxlaması (admin panel girişləri üçün)
export const verifyAdmin = (req, res, next) => {
  if (req.user?.isAdmin) return next();
  res.status(403).json({ message: "Sizə icazə verilmir" });
};
