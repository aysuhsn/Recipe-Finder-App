import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import CategoryFormModal from "../../../components/categoryModals/CategoryFormModal";
import { useLanguage } from "../../../context/LanguageContext"; // ✅

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Səhər yeməyi" },
    { id: 2, name: "Şam yeməyi" },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { t } = useLanguage(); // ✅

  const handleOpenModal = (category = null) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setModalOpen(false);
  };

  const handleSave = (data) => {
    if (selectedCategory) {
      setCategories((prev) =>
        prev.map((c) => (c.id === selectedCategory.id ? { ...c, ...data } : c))
      );
    } else {
      const newCategory = { id: Date.now(), ...data };
      setCategories((prev) => [...prev, newCategory]);
    }
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        {t("categories")}
      </Typography>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card>
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h6">{category.name}</Typography>
                <Box>
                  <Tooltip title={t("edit")}>
                    <IconButton onClick={() => handleOpenModal(category)}>
                      <Edit color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t("delete")}>
                    <IconButton onClick={() => handleDelete(category.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <CategoryFormModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSave}
        initialData={selectedCategory}
      />
    </Box>
  );
};

export default Categories;
