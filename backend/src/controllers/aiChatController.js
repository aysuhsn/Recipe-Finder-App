import Recipe from "../models/recipeModel.js";

export const getAiChatRecipe = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ message: "Zəhmət olmasa ingredientləri göndərin" });
  }

  try {
    const allRecipes = await Recipe.find();

    let bestMatch = null;
    let maxMatchCount = 0;

    allRecipes.forEach((recipe) => {
      const matchCount = recipe.ingredients.filter((ing) =>
        ingredients.some((inputIng) =>
          ing.toLowerCase().includes(inputIng.toLowerCase())
        )
      ).length;

      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        bestMatch = recipe;
      }
    });

    if (!bestMatch || maxMatchCount === 0) {
      return res.status(200).json({
        response: {
          title: "Uyğun resept tapılmadı",
          image: "",
          instructions: "Təəssüf ki, daxil etdiyiniz ingredientlərə uyğun resept tapılmadı.",
          usedIngredients: [],
          missedIngredients: [],
        },
      });
    }

    const used = bestMatch.ingredients.filter((ing) =>
      ingredients.some((inputIng) =>
        ing.toLowerCase().includes(inputIng.toLowerCase())
      )
    );

    const missed = bestMatch.ingredients.filter(
      (ing) =>
        !ingredients.some((inputIng) =>
          ing.toLowerCase().includes(inputIng.toLowerCase())
        )
    );

    const response = {
      title: bestMatch.name,
      image: bestMatch.image || "",
      instructions: Array.isArray(bestMatch.instructions)
        ? bestMatch.instructions.join("\n")
        : bestMatch.instructions,
      usedIngredients: used,
      missedIngredients: missed,
    };

    res.status(200).json({ response });
  } catch (error) {
    console.error("AI chat xətası:", error);
    res.status(500).json({ message: "Server xətası baş verdi" });
  }
};
