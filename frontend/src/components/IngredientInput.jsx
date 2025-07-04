import React, { useState } from "react";
import {
  TextField,
  Button,
  Chip,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  clearIngredients,
  setCategory,
} from "../redux/slices/ingredientSlice";
import {
  setRecipes,
  setLoading,
  setError,
  clearRecipes,
} from "../redux/slices/recipeSlice";
import { useLanguage } from "../context/LanguageContext";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ChatModal from "./chat/ChatModal";
import axios from "axios";
import "./IngredientInput.css";

const IngredientInput = () => {
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const ingredients = useSelector((state) => state.ingredients.items);
  const category = useSelector((state) => state.ingredients.category);
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const handleAdd = () => {
    const value = input.trim().toLowerCase();
    if (value && !ingredients.includes(value)) {
      dispatch(addIngredient(value));
      setInput("");
    }
  };

  const handleRemove = (item) => {
    dispatch(removeIngredient(item));
  };

  const handleClear = () => {
    dispatch(clearIngredients());
    dispatch(clearRecipes());
  };

  const handleCategoryClick = (cat) => {
    if (cat === "all") {
      dispatch(setCategory(""));
      searchRecipes(); 
    } else {
      dispatch(setCategory(category === cat ? "" : cat));
    }
  };

  const searchRecipes = async () => {
    try {
      dispatch(setLoading());

      const firstResponse = await axios.get(
        "https://api.spoonacular.com/recipes/findByIngredients",
        {
          params: {
            ingredients: ingredients.join(","),
            number: 30,
            apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
          },
        }
      );

      const basicRecipes = firstResponse.data;
      if (!Array.isArray(basicRecipes) || basicRecipes.length === 0) {
        dispatch(setRecipes([]));
        return;
      }

      const ids = basicRecipes.map((r) => r.id).join(",");

      const detailedResponse = await axios.get(
        "https://api.spoonacular.com/recipes/informationBulk",
        {
          params: {
            ids,
            apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
          },
        }
      );

      let finalRecipes = detailedResponse.data;

      finalRecipes = finalRecipes.map((item) => ({
        ...item,
        usedIngredientCount:
          basicRecipes.find((b) => b.id === item.id)?.usedIngredientCount ?? 0,
        missedIngredientCount:
          basicRecipes.find((b) => b.id === item.id)?.missedIngredientCount ?? 0,
      }));

      if (category && category !== "all") {
        finalRecipes = finalRecipes.filter((recipe) =>
          recipe.dishTypes?.includes(category.toLowerCase())
        );
      }

      dispatch(setRecipes(finalRecipes));
    } catch (error) {
      console.error("API error:", error.message);
      dispatch(setError("Failed to fetch recipes."));
    }
  };

  const categories = [
    { key: "all", label: "🌐 All" },
    { key: "breakfast", label: "🍳 Breakfast" },
    { key: "lunch", label: "🍔 Lunch" },
    { key: "dinner", label: "🍽️ Dinner" },
    { key: "snack", label: "🍟 Snack" },
    { key: "dessert", label: "🧁 Dessert" },
  ];

  return (
    <Box className="ingredient-wrapper">
      <Typography className="ingredient-title">
        {t("findByIngredients")}
      </Typography>

      <Box className="input-group">
        <TextField
          placeholder={t("enterIngredient")}
          value={input}
          size="small"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="ingredient-input"
        />

        <Button className="btn add" onClick={handleAdd}>
          <AddIcon />
        </Button>
        <Button className="btn search" onClick={searchRecipes}>
          <SearchIcon />
        </Button>
        <Tooltip title="Clear all">
          <IconButton className="btn clear" onClick={handleClear}>
            <CleaningServicesIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box className="filter-buttons">
        {categories.map((cat) => (
          <Button
            key={cat.key}
            variant={category === cat.key || (cat.key === "all" && !category) ? "contained" : "outlined"}
            onClick={() => handleCategoryClick(cat.key)}
          >
            {cat.label}
          </Button>
        ))}
      </Box>

      {ingredients.length > 0 ? (
        <Box className="chip-group">
          {ingredients.map((item, index) => (
            <Chip
              key={index}
              label={item}
              onDelete={() => handleRemove(item)}
              className="chip"
            />
          ))}
        </Box>
      ) : (
        <Typography className="empty-text">{t("noIngredientsYet")}</Typography>
      )}

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Tooltip title={t("chatWithChef") || "Chat with AI Chef"}>
          <IconButton onClick={() => setIsChatOpen(true)}>
            <SupportAgentIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <ChatModal open={isChatOpen} handleClose={() => setIsChatOpen(false)} />
      </Box>
    </Box>
  );
};

export default IngredientInput;
