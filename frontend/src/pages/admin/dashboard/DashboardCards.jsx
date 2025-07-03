// src/components/dashboard/DashboardCards.jsx

import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";

const cardData = [
  {
    title: "Total Recipes",
    value: 124,
    icon: <RestaurantIcon fontSize="large" color="primary" />,
  },
  {
    title: "Favorites Added",
    value: 56,
    icon: <FavoriteIcon fontSize="large" color="error" />,
  },
  {
    title: "Active Users",
    value: 32,
    icon: <PeopleIcon fontSize="large" color="success" />,
  },
];

const DashboardCards = () => {
  return (
    <Grid container spacing={3}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <Box>{card.icon}</Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                {card.title}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {card.value}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;
