import express from "express";
import { getStats } from "../controllers/statsController.js";
import { verifyToken } from "../middleware/verifyToken.js"; 
import { getAdminStats } from "../controllers/statsController.js";
const router = express.Router();

router.get("/", verifyToken, getStats);
router.get("/admin/dashboard", verifyToken, getAdminStats);

export default router;
