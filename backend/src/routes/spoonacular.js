import express from "express";
import axios from "axios";
import Recipe from "../models/recipeModel.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// GET /api/spoonacular/recipes
router.get("/recipes", async (req, res) => {
  try {
    let allRecipes = [];

    for (let i = 0; i < 5; i++) {
      const response = await axios.get("https://api.spoonacular.com/recipes/random", {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          number: 10, // hər sorğuda 10 resept
        },
      });

      allRecipes.push(...response.data.recipes);
    }

    const savedRecipes = [];

    for (let recipe of allRecipes) {
      // Təkrarlanmamaq üçün title ilə yoxlamaq (əgər eynisi varsa əlavə etməsin)
      const exists = await Recipe.findOne({ name: recipe.title });
      if (exists) continue;

      const newRecipe = new Recipe({
        name: recipe.title,
        ingredients: recipe.extendedIngredients?.map(i => i.original) || [],
        instructions: recipe.analyzedInstructions?.[0]?.steps?.map(s => s.step) || ["No instructions."],
        image: recipe.image,
        category: recipe.dishTypes?.[0] || "general",
      });

      const saved = await newRecipe.save();
      savedRecipes.push(saved);
    }

    res.status(201).json(savedRecipes);
  } catch (error) {
    console.error("Spoonacular error:", error.message);
    res.status(500).json({ message: "Failed to fetch recipes", error: error.message });
  }
});

export default router;
