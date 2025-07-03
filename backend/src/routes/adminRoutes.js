import express from "express";
import { getDashboardStats, updateUser, deleteUser } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAdminStats } from "../controllers/statsController.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";
import {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe, // ← Əmin ol ki, bu import olunub
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/dashboard", verifyToken, isAdminMiddleware, getDashboardStats);  
router.get("/dashboard", verifyToken, isAdminMiddleware, getAdminStats);
router.get("/recipes", getAllRecipes);
router.post("/recipes", createRecipe);
router.put("/recipes/:id", updateRecipe); // ← BU LİNYANI ƏLAVƏ ET
router.delete("/recipes/:id", deleteRecipe); // ← varsa, qalır
router.put("/users/:id", updateUser);
router.delete("/users/:id", verifyToken, isAdminMiddleware, deleteUser);

export default router;
