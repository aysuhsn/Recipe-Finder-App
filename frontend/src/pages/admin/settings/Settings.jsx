import React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Stack,
  Paper,
} from "@mui/material";
import {
  Brightness4,
  Language,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useLanguage } from "../../../context/LanguageContext";
import { useColorMode } from "../../../context/ColorModeContext";
import "./Settings.css";

const Settings = () => {
  const { t, setLanguage, language } = useLanguage();
  const { mode, toggleColorMode } = useColorMode();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Box className="settings-container">
      <Paper className="glass-card" elevation={3}>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <SettingsIcon />
            <Typography variant="h5" fontWeight={600}>
              {t("settings")}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="setting-item"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Brightness4 />
              <Typography>{t("darkMode")}</Typography>
            </Stack>
            <Switch checked={mode === "dark"} onChange={toggleColorMode} />
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Language />
              <Typography>{t("interfaceLanguage")}</Typography>
            </Stack>
            <FormControl fullWidth>
              <InputLabel>{t("interfaceLanguage")}</InputLabel>
              <Select
                value={language}
                onChange={handleLanguageChange}
                label={t("interfaceLanguage")}
              >
                <MenuItem value="en">🇬🇧 English</MenuItem>
                <MenuItem value="az">🇦🇿 Azərbaycan dili</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Settings;
