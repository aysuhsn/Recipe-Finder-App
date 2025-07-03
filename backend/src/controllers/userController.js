// 📁 backend/controllers/userController.js

import User from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Xəta baş verdi", error: err.message });
  }
};



