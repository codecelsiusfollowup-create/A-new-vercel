import express from 'express';
import { verifyToken,authorizeRoles } from '../middleware/authMiddleware.js';
import { submitProperty,deleteProperty } from '../controllers/propertyController.js';

const router = express.Router();

router.post('/submit', verifyToken, authorizeRoles("admin", "dealer"),submitProperty);
// Delete property by ID
router.delete("/:id", deleteProperty);

export default router;