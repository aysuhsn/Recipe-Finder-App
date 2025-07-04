import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import RecipeFormModal from "../recipeModals/RecipeFormModal";
import { useLanguage } from "../../../context/LanguageContext";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const { t } = useLanguage();

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/recipes");
      setRecipes(res.data.reverse());
    } catch (error) {
      toast.error(t("fetchRecipesError"));
      console.error("Failed to fetch recipes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      setRecipes((prev) => prev.filter((r) => r._id !== id));
      toast.success(t("recipeDeleted"));
    } catch (error) {
      toast.error(t("recipeDeleteFailed"));
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(t("recipeListPDF"), 14, 10);
    const tableColumn = ["#", t("name"), t("category")];
    const tableRows = recipes.map((r, i) => [i + 1, r.name, r.category]);
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("recipes.pdf");
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setOpenModal(true);
  };

  const handleSubmit = async (data) => {
    if (editingRecipe) {
      try {
        const res = await axios.put(
          `http://localhost:5000/api/admin/recipes/${editingRecipe._id}`,
          data
        );
        setRecipes((prev) => [
          res.data,
          ...prev.filter((r) => r._id !== editingRecipe._id),
        ]);
        toast.success(t("recipeUpdated"));
      } catch {
        toast.error(t("recipeUpdateFailed"));
      }
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/admin/recipes",
          data
        );
        setRecipes((prev) => [res.data, ...prev]);
        toast.success(t("recipeAdded"));
      } catch {
        toast.error(t("recipeAddFailed"));
      }
    }
    setOpenModal(false);
    setEditingRecipe(null);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Box className="recipe-container">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        mb={2}
      >
        <Typography variant="h5" fontWeight={600}>
          {t("recipes")}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingRecipe(null);
              setOpenModal(true);
            }}
          >
            {t("addRecipe")}
          </Button>
          <Button variant="outlined" onClick={handleExportPDF}>
            {t("exportPDF")}
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        {recipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Paper
              elevation={3}
              sx={{
                height: 180,
                p: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 0 12px #8a2be2",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={recipe.image}
                  alt={recipe.name}
                  variant="rounded"
                  sx={{ width: 64, height: 64 }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    fontWeight={600}
                    noWrap
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block",
                      maxWidth: "180px",
                    }}
                  >
                    {index + 1}. {recipe.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {recipe.category}
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={1}
                mt={2}
              >
                <Tooltip title={t("editRecipe")}>
                  <IconButton onClick={() => handleEdit(recipe)}>
                    <FiEdit2 size={18} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t("deleteRecipe")}>
                  <IconButton
                    onClick={() => {
                      setSelectedRecipeId(recipe._id);
                      setOpenDialog(true);
                    }}
                  >
                    <FiTrash2 size={18} color="red" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <RecipeFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingRecipe(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingRecipe}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{t("confirmDeleteTitle")}</DialogTitle>
        <DialogContent>
          <Typography>{t("confirmDeleteRecipeText")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>{t("cancel")}</Button>
          <Button
            onClick={() => {
              handleDelete(selectedRecipeId);
              setOpenDialog(false);
            }}
            color="error"
            variant="contained"
          >
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Recipes;
