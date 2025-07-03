import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
  sortType: "none",
  filters: {
    maxReadyInMinutes: null,
    minServings: null,
  },
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearRecipes: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },
});

export const {
  setRecipes,
  setLoading,
  setError,
  clearRecipes,
  setSortType,
  setFilters,
} = recipeSlice.actions;

export default recipeSlice.reducer;
