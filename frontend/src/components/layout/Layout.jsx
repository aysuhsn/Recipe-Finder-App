import React from "react";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import LanguageSwitcher from "../LanguageSwitcher";
import BackgroundLayer from "./BackgroundLayer";

const Layout = () => {
  return (
    <>
    <BackgroundLayer/>
      <Navbar />
      <Container maxWidth={false} disableGutters sx={{ mt: 0 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
