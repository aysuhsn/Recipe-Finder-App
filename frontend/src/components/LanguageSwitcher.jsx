import React, { useState, useContext } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MdLanguage } from "react-icons/md";
import { useLanguage } from "../context/LanguageContext";
import ColorModeContext from "../context/ColorModeContext";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const { mode } = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          color: mode === "dark" ? "#fff" : "#000",
        }}
      >
        <MdLanguage size={20} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          selected={language === "en"}
          onClick={() => handleLanguageChange("en")}
        >
          EN
        </MenuItem>
        <MenuItem
          selected={language === "az"}
          onClick={() => handleLanguageChange("az")}
        >
          AZ
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
