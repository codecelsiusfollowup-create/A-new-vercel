import express from 'express';
import { filterProperties } from '../controllers/searchController.js';

const router = express.Router();

router.post('/search', filterProperties);

export default router;