import express from "express";
import { verifyAdmin } from "../middleware/adminMiddleware.js";
import { getAllUsers,getAllProperties,getUserById } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", verifyAdmin, getAllUsers); // ✅ only admin can access
router.get('/properties', getAllProperties);
router.get('/property/:id', getUserById)
export default router;