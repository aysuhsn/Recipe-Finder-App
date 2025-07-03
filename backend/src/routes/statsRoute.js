// routes/statsRoute.js
import express from "express";
import { getStats } from "../controllers/statsController.js";
import { verifyToken } from "../middleware/verifyToken.js"; // əgər token yoxlanırsa
import { getAdminStats } from "../controllers/statsController.js";
const router = express.Router();

router.get("/", verifyToken, getStats); // token yoxlaması şərt deyil, istəyirsənsə silə bilərsən
router.get("/admin/dashboard", verifyToken, getAdminStats);

export default router;
