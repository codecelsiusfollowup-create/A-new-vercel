import express from 'express';
import { getStaffByDealer, deleteStaffById,getAllDealers,deleteUser } from '../controllers/dealerController.js';
import { verifyToken,authorizeRoles } from '../middleware/authMiddleware.js';


const router = express.Router();

// ✅ Get all staff by dealer ID
router.get('/staff/:dealerId', getStaffByDealer);

// ✅ Delete staff by user ID
router.delete('/staff/:id', deleteStaffById);


router.get("/dealers", verifyToken, authorizeRoles("admin"), getAllDealers);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteUser);

export default router;