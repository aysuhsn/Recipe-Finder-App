// src/components/admin/recipeModals/RecipeFormModal.jsx

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const RecipeFormModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ title: "", image: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {initialData ? "Resepti Redaktə Et" : "Yeni Resept Əlavə Et"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Başlıq"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Şəkil URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Bağla</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? "Yadda Saxla" : "Əlavə Et"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeFormModal;
