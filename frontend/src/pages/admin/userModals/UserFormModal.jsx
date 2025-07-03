import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useLanguage } from "../../../context/LanguageContext";

const UserFormModal = ({ open, onClose, onSubmit, initialData }) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAdmin: false,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        isAdmin: initialData.isAdmin === true,
        isActive: initialData.status?.toLowerCase() === "aktiv",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        isAdmin: false,
        isActive: true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      status: formData.isActive ? "aktiv" : "deaktiv",
    };
    onSubmit(finalData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{initialData ? t("editUser") : t("newUser")}</DialogTitle>
      <DialogContent>
        <TextField
          label={t("fullName")}
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t("email")}
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.isAdmin}
              onChange={() => handleToggle("isAdmin")}
            />
          }
          label={formData.isAdmin ? t("admin") : t("user")}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? t("save") : t("add")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormModal;
