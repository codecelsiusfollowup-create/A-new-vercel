import express from "express";
import { verifyStaff } from "../middleware/staffMiddleware.js";
import { staffDashboard } from "../controllers/staffController.js";

const router = express.Router();

router.get("/dashboard", verifyStaff, staffDashboard);

export default router;