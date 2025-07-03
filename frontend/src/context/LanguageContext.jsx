import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    // General
    settings: "Settings",
    darkMode: "Dark mode",
    interfaceLanguage: "Interface language",
    dashboard: "Dashboard",
    recipes: "Recipes",
    users: "Users",
    categories: "Categories",
    pendingRecipes: "Pending Recipes",
    send: "Send",
    aiChatTitle: "AI Recipe Chat",    preparation: "Preparation",
    used: "Used",
    missed: "Missed",
    recipe: "Recipe",
    noRecipeFound: "No recipe found",

    // Navbar
    recipeFinder: "Recipe Finder",
    home: "Home",

    // Filters
    sortBy: "Sort By",
    none: "None",
    usedAsc: "Used ↑",
    usedDesc: "Used ↓",
    missedAsc: "Missed ↑",
    missedDesc: "Missed ↓",
    maxReadyMinutes: "Max Ready (mins)",
    minServings: "Min Servings",
    resetFilters: "Reset Filters",
    any: "Any",
    mins: "mins",
    noRecipesFound: "No recipes found",
    used: "Used",
    missed: "Missed",

    // Ingredients
    findByIngredients: "Find Recipes Based on Ingredients",
    enterIngredient: "Enter an ingredient",
    noIngredientsYet: "No ingredients added yet.",
    used: "Used",
    missed: "Missed",
    any: "Any",

    // Recipe
    recipeNotFound: "Recipe not found.",
    readyIn: "Ready in",
    minutes: "minutes",
    mins: "mins",
    servings: "Servings",
    ingredients: "Ingredients",
    noIngredients: "No ingredients listed.",
    instructions: "Instructions",
    noInstructions: "No instructions provided.",
    viewOriginal: "View Original Recipe",
    noRecipesFound: "No recipes found.",
    searchRecipes: "Search Recipes",
    clearAll: "Clear All",
    favoriteRecipes: "Favorite Recipes",
    clearWishlist: "Clear Wishlist",
    noFavorites: "No favorites yet.",

    // Buttons
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    cancel: "Cancel",
    exportPDF: "Export PDF",

    // Admin
    adminDashboard: "Admin Dashboard",
    activeUsers: "Active Users",
    fullName: "Full Name",
    email: "Email",
    role: "Role",
    status: "Status",
    admin: "admin",
    user: "user",
    active: "Active",
    inactive: "Inactive",

    // Confirmations
    confirmDeleteTitle: "Confirm Deletion",
    confirmDeleteText:
      "Are you sure you want to delete this user? This action cannot be undone.",
    confirmDeleteRecipeText:
      "Are you sure you want to delete this recipe? This action cannot be undone.",

    // Feedback
    userDeleted: "User deleted successfully",
    userDeleteFailed: "Failed to delete user",
    userUpdated: "User updated successfully",
    userUpdateFailed: "Update failed",
    userFetchFailed: "Failed to fetch users",

    recipeAdded: "Recipe added successfully",
    recipeAddFailed: "Failed to add recipe",
    recipeUpdated: "Recipe updated successfully",
    recipeUpdateFailed: "Failed to update recipe",
    recipeDeleted: "Recipe deleted successfully",
    recipeDeleteFailed: "Failed to delete recipe",
    fetchRecipesError: "Failed to fetch recipes",
    recipeListPDF: "Recipe List",

    // UI
    home: "Home",
    recipeFinder: "Recipe Finder",
    notFoundTitle: "Page Not Found",
    notFoundDescription: "The page you are looking for doesn't exist.",
    goHome: "Go to Home",
    recipeNotFound: "Recipe not found",

    // Table headers
    name: "Name",
    image: "Image",
    category: "Category",
    actions: "Actions",
    editUser: "Edit User",
    fullName: "Full Name",
    save: "Save",
    imageUrl: "Image URL",
    ingredients: "Ingredients",
    instructions: "Instructions",
    category: "Category",
    editRecipe: "Edit Recipe",
    addRecipe: "Add Recipe",
    cancel: "Cancel",
    adminDashboard: "Admin Dashboard",
    activeUsers: "Active users",
  },

  az: {
    // General
    settings: "Tənzimləmələr",
    darkMode: "Qaranlıq rejim",
    interfaceLanguage: "İnterfeys dili",
    dashboard: "İdarə paneli",
    recipes: "Reseptlər",
    users: "İstifadəçilər",
    categories: "Kateqoriyalar",
    pendingRecipes: "Təsdiq gözləyən reseptlər",
    send: "Göndər",
    aiChatTitle: "AI Resept Chat",    preparation: "Hazırlanma",
    used: "İstifadə olunub",
    missed: "Çatışmır",
    recipe: "Resept",
    noRecipeFound: "Uyğun resept tapılmadı",
    
    // Navbar
    recipeFinder: "Resept Tapıcı",
    home: "Ana Səhifə",

    // Filters
    sortBy: "Sıralama",
    none: "Yoxdur",
    usedAsc: "İstifadə edilən ↑",
    usedDesc: "İstifadə edilən ↓",
    missedAsc: "Çatışmayan ↑",
    missedDesc: "Çatışmayan ↓",
    maxReadyMinutes: "Hazırlanma vaxtı (dəq)",
    minServings: "Minimum porsiya",
    resetFilters: "Filtrləri sıfırla",
    any: "Fərqi yoxdur",
    mins: "dəq",
    noRecipesFound: "Uyğun resept tapılmadı",
    used: "İstifadə olunan",
    missed: "Əskik olan",

    // Ingredients
    findByIngredients: "İngrediyentlərə görə resept tap",
    enterIngredient: "İngrediyent daxil et",
    noIngredientsYet: "Hələ heç bir ingrediyent əlavə olunmayıb.",
    used: "İstifadə edilən",
    missed: "Çatışmayan",
    any: "Hər hansı",

    // Recipe
    recipeNotFound: "Resept tapılmadı.",
    readyIn: "Hazırdır",
    minutes: "dəqiqəyə",
    mins: "dəq",
    servings: "Porsiya",
    ingredients: "İngrediyentlər",
    noIngredients: "İngrediyent yoxdur.",
    instructions: "Təlimatlar",
    noInstructions: "Təlimat verilməyib.",
    viewOriginal: "Əsas resepti göstər",
    noRecipesFound: "Heç bir resept tapılmadı.",
    searchRecipes: "Resept axtar",
    clearAll: "Hamısını sil",
    favoriteRecipes: "Favorit Reseptlər",
    clearWishlist: "Favoritləri təmizlə",
    noFavorites: "Favorit resept yoxdur.",

    // Buttons
    add: "Əlavə et",
    edit: "Dəyiş",
    delete: "Sil",
    cancel: "Ləğv et",
    exportPDF: "PDF olaraq ixrac et",

    // Admin
    adminDashboard: "Admin Paneli",
    activeUsers: "Aktiv istifadəçilər",
    fullName: "Ad Soyad",
    email: "Email",
    role: "Rol",
    status: "Status",
    admin: "admin",
    user: "istifadəçi",
    active: "Aktiv",
    inactive: "Passiv",

    // Confirmations
    confirmDeleteTitle: "Silinməni Təsdiqlə",
    confirmDeleteText:
      "Bu istifadəçini silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz.",
    confirmDeleteRecipeText:
      "Bu resepti silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz.",

    // Feedback
    userDeleted: "İstifadəçi uğurla silindi",
    userDeleteFailed: "İstifadəçini silmək mümkün olmadı",
    userUpdated: "İstifadəçi uğurla yeniləndi",
    userUpdateFailed: "Yeniləmə alınmadı",
    userFetchFailed: "İstifadəçi siyahısı yüklənə bilmədi",

    recipeAdded: "Resept uğurla əlavə olundu",
    recipeAddFailed: "Resept əlavə edilə bilmədi",
    recipeUpdated: "Resept uğurla yeniləndi",
    recipeUpdateFailed: "Resept yenilənə bilmədi",
    recipeDeleted: "Resept uğurla silindi",
    recipeDeleteFailed: "Resept silinə bilmədi",
    fetchRecipesError: "Reseptləri yükləmək mümkün olmadı",
    recipeListPDF: "Resept Siyahısı",

    // UI
    home: "Əsas səhifə",
    recipeFinder: "Resept Axtarışı",
    notFoundTitle: "Səhifə Tapılmadı",
    notFoundDescription: "Axtardığınız səhifə mövcud deyil.",
    goHome: "Əsas səhifəyə qayıt",
    recipeNotFound: "Resept tapılmadı",

    // Table headers
    name: "Ad",
    image: "Şəkil",
    category: "Kateqoriya",
    actions: "Əməliyyatlar",
    editUser: "İstifadəçini Redaktə et",
    fullName: "Ad Soyad",
    save: "Yadda saxla",
    imageUrl: "Şəkil linki",
    ingredients: "İngrediyentlər",
    instructions: "Təlimatlar",
    category: "Kateqoriya",
    editRecipe: "Resepti Redaktə et",
    addRecipe: "Resept əlavə et",
    cancel: "Ləğv et",
    adminDashboard: "İdarə paneli",
    activeUsers: "Aktiv istifadəçilər",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key) => translations[language]?.[key] || key;

  const contextValue = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, changeLanguage: setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;
