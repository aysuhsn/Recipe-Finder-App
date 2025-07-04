import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sideBar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, useTheme } from "@mui/material";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      {/* Hamburger - mobile */}
      <IconButton
        onClick={() => setMobileOpen(!mobileOpen)}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1300,
          display: { xs: "block", md: "none" },
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: "240px" }, 
          mt: { xs: "64px", md: 0 },
          p: 3,
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
