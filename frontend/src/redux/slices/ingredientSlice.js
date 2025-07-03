// redux/slices/ingredientSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  category: "",
};

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.items.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
    clearIngredients: (state) => {
      state.items = [];
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  clearIngredients,
  setCategory,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
