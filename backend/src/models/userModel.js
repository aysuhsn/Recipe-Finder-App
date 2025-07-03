// backend/src/models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ad boş ola bilməz"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email boş ola bilməz"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Şifrə boş ola bilməz"],
      minlength: [6, "Şifrə ən az 6 simvol olmalıdır"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["aktiv", "deaktiv"], // MongoDB-də necədirsə, modeldə də elə olsun
      default: "aktiv",
    },
  },
  {
    timestamps: true, // createdAt və updatedAt sahələri üçün
  }
);

// Modelin təkrar yaranmaması üçün yoxlayırıq:
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
