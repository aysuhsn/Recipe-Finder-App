import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RecipeDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../redux/slices/wishlistSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button, CircularProgress, Box } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoMdStats } from "react-icons/io";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [nutritionLoading, setNutritionLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isFavorite = wishlistItems.some((item) => item.id === Number(id));


  const handleToggleWishlist = () => {
    if (recipe) {
      dispatch(toggleWishlist({ ...recipe, id: Number(recipe.id) }));
    }
  };
  

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        try {
          const spoonRes = await axios.get(
            `https://api.spoonacular.com/recipes/informationBulk?ids=${id}&apiKey=${
              import.meta.env.VITE_SPOONACULAR_API_KEY
            }`
          );
          if (spoonRes.data?.length > 0) {
            setRecipe(spoonRes.data[0]);
          } else {
            setError("Recipe not found.");
          }
        } catch (err2) {
          setError("Recipe not found.");
        }
      }
    };

    const fetchNutrition = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${
            import.meta.env.VITE_SPOONACULAR_API_KEY
          }`
        );
        setNutrition(response.data);
      } catch (err) {
        console.error("Failed to fetch nutrition data:", err);
      } finally {
        setNutritionLoading(false);
      }
    };

    fetchRecipe();
    fetchNutrition();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!recipe) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          flexDirection: "column",
        }}
      >
        <CircularProgress color="secondary" />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Loading recipe...
        </Typography>
      </Box>
    );
  }
  

  return (
    <div className="recipe-detail">
      <div className="notebook">
        <div className="notebook-left">
          <img
            src={recipe.image}
            alt={recipe.title || recipe.name}
            className="notebook-image"
          />
        </div>
        <div className="notebook-right">
          <h2>{recipe.title || recipe.name}</h2>
          <p className="meta">
            🕒 {recipe.readyInMinutes || "-"} mins | 🍽 {recipe.servings || "-"}{" "}
            servings
          </p>

          <Button
            onClick={handleToggleWishlist}
            startIcon={
              isFavorite ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )
            }
            className="favorite-button"
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>

          <Button
            className="whatsapp-share"
            color="success"
            variant="outlined"
            onClick={() => {
              const shareText = `🧑‍🍳 Check out this recipe: ${
                recipe.title || recipe.name
              }\n👉 ${window.location.href}`;
              const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
                shareText
              )}`;
              window.open(whatsappUrl, "_blank");
            }}
          >
           <IoShareSocialSharp /> Share on WhatsApp
          </Button>

          <div className="section">
            <h3>🍴 Ingredients:</h3>
            <ul>
              {recipe.extendedIngredients
                ? recipe.extendedIngredients.map((item, index) => (
                    <li key={index}>{item.original}</li>
                  ))
                : recipe.ingredients?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
            </ul>
          </div>

          <div className="section">
            <h3>📝 Instructions:</h3>
            {recipe.instructions ? (
              <div
                className="instructions"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            ) : recipe.instructions?.length ? (
              <ul>
                {recipe.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            ) : (
              <p>No instructions available.</p>
            )}
          </div>

          <Accordion
            style={{ marginTop: "2rem", backgroundColor: "transparent" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="nutrition-content"
              id="nutrition-header"
            >
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
              <IoMdStats /> Nutrition Facts
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {nutritionLoading ? (
                <Box display="flex" alignItems="center">
                  <CircularProgress size={24} />
                  <span style={{ marginLeft: "10px" }}>
                    Loading nutrition data...
                  </span>
                </Box>
              ) : nutrition ? (
                <ul className="nutrition-list">
                  <li>🔥 Calories: {nutrition.calories}</li>
                  <li>🥩 Protein: {nutrition.protein}</li>
                  <li>🍞 Carbs: {nutrition.carbs}</li>
                  <li>🧈 Fat: {nutrition.fat}</li>
                </ul>
              ) : (
                <p>Nutrition data not available.</p>
              )}
            </AccordionDetails>
          </Accordion>

          {recipe.sourceUrl && (
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="original-link"
            >
              🍽️ View Original Recipe
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
