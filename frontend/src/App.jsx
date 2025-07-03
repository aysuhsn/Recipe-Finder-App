import React, { useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import RecipeDetail from "./pages/detail/RecipeDetail";
import NotFound from "./pages/notfound/NotFound";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/adminLayout/AdminLayout";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Users from "./pages/admin/users/Users";
import Recipes from "./pages/admin/recipes/Recipes";
import Categories from "./pages/admin/categories/Categories";
import Settings from "./pages/admin/settings/Settings";
import Pending from "./pages/admin/pending/Pending";
import Wishlist from "./pages/wishlist/Wishlist";

import ColorModeContext from "./context/ColorModeContext"; // <-- BURANI ƏLAVƏ ET

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/unauthorized", element: <Unauthorized /> },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "details/:id", element: <RecipeDetail /> },
      { path: "details/spoonacular/:spoonacularId", element: <RecipeDetail /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin={true}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "recipes", element: <Recipes /> },
      { path: "categories", element: <Categories /> },
      { path: "pending", element: <Pending /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

const App = () => {
  const { mode } = useContext(ColorModeContext); // DARK/LIGHT

  useEffect(() => {
    document.body.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <GoogleOAuthProvider clientId="854394865581-0mvadd2dkcdc9d71aols8ok4smlh0bsd.apps.googleusercontent.com">
      <RouterProvider router={router} />
      <ToastContainer />
    </GoogleOAuthProvider>
  );
};

export default App;
