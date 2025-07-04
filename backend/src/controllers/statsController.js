import Recipe from "../models/recipeModel.js";
import User from "../models/userModel.js";
import Wishlist from "../models/wishlistModel.js";

export const getStats = async (req, res) => {
  try {
    const totalRecipes = await Recipe.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      totalRecipes,
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ message: "Xəta baş verdi", error: err.message });
  }
};
export const getAdminStats = async (req, res) => {
  try {
    const users = await User.find();
    const activeUsers = users.filter((user) => user.isActive).length;

    const wishlists = await Wishlist.find();
    console.log("💡 Wishlistdəki sənədlər:", wishlists); 

    const totalFavorites = wishlists.reduce((acc, item) => acc + (item.recipes?.length || 0), 0);

    res.status(200).json({
      totalUsers: users.length,
      activeUsers,
      totalFavorites,
    });
  } catch (err) {
    res.status(500).json({ message: "Admin statistikaları alınmadı", error: err.message });
  }
};

