// src/components/admin/categoryModals/CategoryFormModal.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const CategoryFormModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ name: "" });
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.name.trim()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {initialData ? "Kateqoriyanı Dəyiş" : "Yeni Kateqoriya"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Kateqoriya adı"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Bağla</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? "Yadda saxla" : "Əlavə et"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryFormModal;
