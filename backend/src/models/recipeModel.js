import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "general",
  },
  readyInMinutes: {
    type: Number,
    default: 30,
  },
  servings: {
    type: Number,
    default: 2,
  },
  sourceUrl: {
    type: String,
    default: "",
  },

  spoonacularId: {
    type: Number,
    unique: true,
    sparse: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
