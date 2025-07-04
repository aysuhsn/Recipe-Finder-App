import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.js";
import statsRoute from "./src/routes/statsRoute.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import recipeRoutes from "./src/routes/recipeRoutes.js"; 
import spoonacularRoute from "./src/routes/spoonacular.js";
import userRoutes from "./src/routes/userRoutes.js"; 
import aiChatRoute from "./src/routes/aiChatRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/recipes", recipeRoutes); 
app.use("/api/spoonacular", spoonacularRoute);
app.use("/api", userRoutes);
app.use("/api/ai-recipe", aiChatRoute);

app.get("/", (req, res) => res.send("API işləyir"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server ${PORT}-də`));
