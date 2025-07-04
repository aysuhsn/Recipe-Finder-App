import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "../slices/authSlice";
import ingredientReducer from "../slices/ingredientSlice";
import recipeReducer from "../slices/recipeSlice";
import wishlistReducer from "../slices/wishlistSlice"; 

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "recipes", "ingredients", "wishlist"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientReducer,
  recipes: recipeReducer,
  wishlist: wishlistReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
