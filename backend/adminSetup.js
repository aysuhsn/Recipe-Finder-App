import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/userModel.js"; // Yol sənə uyğun dəyişə bilər

dotenv.config();

const addMissingFavoritesField = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const result = await User.updateMany(
      { favorites: { $exists: false } },
      { $set: { favorites: [] } }
    );

    console.log(`${result.modifiedCount} istifadəçiyə favorites sahəsi əlavə olundu`);
    process.exit(); // uğurla çıx
  } catch (err) {
    console.error("Xəta:", err.message);
    process.exit(1); // uğursuz çıx
  }
};

addMissingFavoritesField();
