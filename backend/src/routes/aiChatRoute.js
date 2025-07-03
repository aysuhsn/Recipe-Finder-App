import express from "express";
import { getAiChatRecipe } from "../controllers/aiChatController.js";

const router = express.Router();

router.post("/chat", getAiChatRecipe);

export default router;
