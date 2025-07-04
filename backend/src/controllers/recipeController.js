import mongoose from "mongoose";
import Recipe from "../models/recipeModel.js";
import axios from "axios";

// GET /api/admin/recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get recipes", error: err.message });
  }
};

export const getRecipesByIngredients = async (req, res) => {
  const { ingredients, category } = req.query;

  if (!ingredients) {
    return res.status(400).json({ message: "Ingredients are required." });
  }

  const inputIngredients = ingredients
    .split(",")
    .map((item) => item.trim().toLowerCase());

  try {
    let recipes = await Recipe.find();

    if (category) {
      recipes = recipes.filter((r) => r.category === category);
    }

    const filtered = recipes.filter((recipe) => {
      const recipeIngredients = recipe.ingredients.map((i) => i.toLowerCase());
      return inputIngredients.some((item) =>
        recipeIngredients.includes(item)
      );
    });

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// POST a new recipe
export const createRecipe = async (req, res) => {
  try {
    const {
      name,
      ingredients,
      instructions,
      image,
      category,
      spoonacularId, 
    } = req.body;

    if (!name || !ingredients || !instructions) {
      return res
        .status(400)
        .json({ message: "Name, ingredients and instructions are required." });
    }

    const newRecipe = new Recipe({
      name,
      ingredients,
      instructions,
      image,
      category,
      spoonacularId,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create recipe", error: error.message });
  }
};

export const getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Resept tapılmadı" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete recipe", error: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update recipe", error: error.message });
  }
};

// GET /api/recipes/spoonacular/:spoonacularId
export const getRecipeBySpoonacularId = async (req, res) => {
  const { spoonacularId } = req.params;

  try {
    const url = `https://api.spoonacular.com/recipes/${spoonacularId}/information?apiKey=${SPOONACULAR_API_KEY}`;
    const response = await axios.get(url);

    const data = response.data;

    const fullRecipe = {
      name: data.title,
      image: data.image,
      readyInMinutes: data.readyInMinutes,
      servings: data.servings,
      ingredients: data.extendedIngredients.map((i) => i.original),
      instructions: data.analyzedInstructions[0]?.steps.map((s) => s.step),
      sourceUrl: data.sourceUrl,
    };

    res.json(fullRecipe);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch from Spoonacular", error: error.message });
  }
};