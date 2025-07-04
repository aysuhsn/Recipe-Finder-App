import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Toolbar,
  Divider,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { t } = useLanguage();
  const theme = useTheme();

  const drawerContent = (
    <Box sx={{ width: drawerWidth, height: "100%" }}>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: t("dashboard"), icon: <DashboardIcon />, path: "/admin/dashboard" },
          { text: t("recipes"), icon: <RestaurantMenuIcon />, path: "/admin/recipes" },
          { text: t("users"), icon: <PeopleIcon />, path: "/admin/users" },
          { text: t("settings"), icon: <SettingsIcon />, path: "/admin/settings" },
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            component={NavLink}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            sx={{
              "&.active": {
                backgroundColor: theme.palette.mode === "dark" ? "#2c2c3c" : "#e3f2fd",
                color: theme.palette.mode === "dark" ? "#fff" : "#0d47a1",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#1e1e2f",
            color: "#fff",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#1e1e2f",
            color: "#fff",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
