import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/userModel.js";

dotenv.config();

const addMissingFavoritesField = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const result = await User.updateMany(
      { favorites: { $exists: false } },
      { $set: { favorites: [] } }
    );

    process.exit(); 
  } catch (err) {
    console.error("Xəta:", err.message);
    process.exit(1); 
  }
};

addMissingFavoritesField();
