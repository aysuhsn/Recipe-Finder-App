import axios from "axios";

export const fetchRecipes = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/admin/recipes");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
};
