import express from "express";
import {
  getAllRecipes,
  getRecipesByIngredients,
  createRecipe,
  getRecipeById,
  deleteRecipe,
  updateRecipe,
  getRecipeBySpoonacularId,
} from "../controllers/recipeController.js";

const router = express.Router();

router.post("/", createRecipe);
router.get("/", getAllRecipes);
router.get("/search", getRecipesByIngredients);
router.get("/recipes/spoonacular/:spoonacularId", getRecipeBySpoonacularId);
router.get("/:id", getRecipeById);
router.delete("/:id", deleteRecipe);
router.put("/:id", updateRecipe);


export default router;
