import User from "../models/userModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });

    const activeUsers = users.filter(
      (user) => user.status?.toLowerCase() === "aktiv"
    ).length;

    // Yeni əlavə: bütün istifadəçilərin favoritlərinin ümumi sayı
    const totalFavorites = users.reduce(
      (acc, user) => acc + (user.favorites?.length || 0),
      0
    );

    res.status(200).json({ activeUsers, totalFavorites });
  } catch (err) {
    res.status(500).json({ message: "Xəta baş verdi", error: err.message });
  }
};



export const updateUser = async (req, res) => {
  try {
    const { name, email, status, isAdmin } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.status = status || user.status;

    if (typeof isAdmin === "boolean") {
      user.isAdmin = isAdmin;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update error", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};