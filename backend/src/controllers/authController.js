// backend/src/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {
  registerValidation,
  loginValidation,
} from "../validation/authValidation.js";
import { OAuth2Client } from "google-auth-library";

export const registerUser = async (req, res) => {
  const { error } = registerValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(409).json({ message: "Bu email artıq istifadə olunur" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: "Qeydiyyat tamamlandı" });
};

export const loginUser = async (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "İstifadəçi tapılmadı" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Şifrə yanlışdır" });

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  const { email, name, googleId } = req.body;
  if (!email || !googleId) return res.status(400).json({ message: "Incomplete data" });

  let user = await User.findOne({ email });

  if (!user) {
    // Yeni qeydiyyat
    user = new User({
      name,
      email,
      password: googleId, // Google password sahəsinə yazılır, login üçün istifadə olunmur
    });
    await user.save();
  }

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
};