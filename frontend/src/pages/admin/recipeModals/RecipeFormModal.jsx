import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useLanguage } from "../../../context/LanguageContext";

const RecipeFormModal = ({ open, onClose, onSubmit, initialData }) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    ingredients: "",
    instructions: "",
    category: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        image: initialData.image || "",
        ingredients: initialData.ingredients?.join(", ") || "",
        instructions: initialData.instructions?.join("\n") || "",
        category: initialData.category || "",
      });
    } else {
      setFormData({
        name: "",
        image: "",
        ingredients: "",
        instructions: "",
        category: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const dataToSend = {
      name: formData.name,
      image: formData.image,
      ingredients: formData.ingredients.split(",").map((i) => i.trim()),
      instructions: formData.instructions.split("\n").map((i) => i.trim()),
      category: formData.category,
    };

    onSubmit(dataToSend);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {initialData ? t("editRecipe") : t("addRecipeBtn")}
      </DialogTitle>
      <DialogContent>
        <TextField
          label={t("name")}
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t("imageUrl")}
          name="image"
          value={formData.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t("ingredients")}
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t("instructions")}
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label={t("category")}
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? t("save") : t("addRecipeBtn")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeFormModal;
