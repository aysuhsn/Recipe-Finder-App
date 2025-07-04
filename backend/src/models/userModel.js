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
      enum: ["aktiv", "deaktiv"],
      default: "aktiv",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
