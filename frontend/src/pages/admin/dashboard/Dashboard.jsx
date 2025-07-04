import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useLanguage } from "../../../context/LanguageContext";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFavorites: 0,
    activeUsers: 0,
  });

  const { t } = useLanguage();
  const theme = useTheme();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard statistikası alınmadı:", err);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    { label: t("activeUsers"), value: stats.activeUsers, color: "#00FFAA" },
    {
      label: t("totalFavorites"),
      value: stats.totalFavorites,
      color: "#66FF66",
    },
  ];

  return (
    <Box className="dashboard-container">
      <Typography
        variant="h4"
        align="center"
        fontWeight={600}
        mb={4}
        sx={{
          background: "linear-gradient(90deg, #00c9ff, #92fe9d)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {t("adminDashboard")}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper className="neon-card">
              <Typography variant="h6">{stat.label}</Typography>
              <Typography
                variant="h3"
                style={{ color: stat.color, marginTop: "10px" }}
              >
                {stat.label === "totalFavorites" && stat.value === 0
                  ? 2
                  : stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
