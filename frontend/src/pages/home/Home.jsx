import React, { useContext } from "react";
import IngredientInput from "../../components/IngredientInput";
import RecipeList from "../../components/RecipeList";
import { useLanguage } from "../../context/LanguageContext";
import ColorModeContext from "../../context/ColorModeContext";
import "./Home.css";

const Home = () => {
  const { t } = useLanguage();
  const { mode } = useContext(ColorModeContext);

  return (
      <div className="home-root">
          <IngredientInput />
          <RecipeList />
      </div>
  );
};

export default Home;
