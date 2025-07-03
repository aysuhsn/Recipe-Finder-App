// src/components/RecipeList.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { setFilters } from "../redux/slices/recipeSlice";
import { useLanguage } from "../context/LanguageContext";
import "./RecipeList.css";

const RecipeList = () => {
  const { items, loading, error, filters } = useSelector(
    (state) => state.recipes
  );
  const category = useSelector((state) => state.ingredients.category);
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const filteredItems = items.filter((recipe) => {
    const ready = recipe.readyInMinutes ?? 999;
    const servings = recipe.servings ?? 0;
    const readyOk =
      filters.maxReadyInMinutes == null || ready <= filters.maxReadyInMinutes;
    const servingsOk =
      filters.minServings == null || servings >= filters.minServings;

    const categoryOk =
      !category ||
      (recipe.dishTypes && recipe.dishTypes.includes(category.toLowerCase()));

    return readyOk && servingsOk && categoryOk;
  });

  if (loading) {
    return (
      <Grid container spacing={2} className="recipe-list">
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Skeleton variant="rectangular" height={220} />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return <Typography className="error-text">{error}</Typography>;
  }

  const timeOptions = [15, 30, 45, 60];
  const servingOptions = [1, 2, 4, 6];

  return (
    <Box className="recipe-wrapper">
      <Box className="filter-panel">
        <Typography className="filter-label">
          {t("maxReadyMinutes")}:
        </Typography>
        <Box className="filter-buttons">
          {timeOptions.map((val) => (
            <Button
              key={val}
              variant={
                filters.maxReadyInMinutes === val ? "contained" : "outlined"
              }
              onClick={() =>
                dispatch(
                  setFilters({
                    ...filters,
                    maxReadyInMinutes:
                      filters.maxReadyInMinutes === val ? null : val,
                  })
                )
              }
            >
              {val} {t("mins")}
            </Button>
          ))}
        </Box>

        <Typography className="filter-label">{t("minServings")}:</Typography>
        <Box className="filter-buttons">
          {servingOptions.map((val) => (
            <Button
              key={val}
              variant={filters.minServings === val ? "contained" : "outlined"}
              onClick={() =>
                dispatch(
                  setFilters({
                    ...filters,
                    minServings: filters.minServings === val ? null : val,
                  })
                )
              }
            >
              {val}+
            </Button>
          ))}
        </Box>

        <Button
          className="reset-btn"
          onClick={() =>
            dispatch(setFilters({ maxReadyInMinutes: null, minServings: null }))
          }
        >
          {t("resetFilters")}
        </Button>
      </Box>

      <Grid container spacing={2} className="recipe-list">
        {filteredItems.length === 0 ? (
          <Typography className="no-results">{t("noRecipesFound")}</Typography>
        ) : (
          filteredItems.map((recipe) => {
            const recipeId = recipe._id || recipe.id || recipe.spoonacularId;
            if (!recipeId) return null;

            return (
              <Grid item key={recipeId} xs={12} sm={6}>
                <Link to={`/app/details/${recipeId}`} className="recipe-link">
                  <Card className="recipe-card">
                    <CardMedia
                      component="img"
                      height="160"
                      image={recipe.image}
                      alt={recipe.title || recipe.name}
                      className="recipe-img"
                    />
                    <CardContent>
                      <Typography className="recipe-title">
                        {(recipe.title || recipe.name)?.slice(0, 20)}...
                      </Typography>

                      <Typography className="recipe-info">
                        Used: {recipe.usedIngredientCount ?? "-"} | Missed:{" "}
                        {recipe.missedIngredientCount ?? "-"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default RecipeList;
