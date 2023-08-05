import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';
import { getReviews } from '../controllers/reviewControllers.js';
const router = express.Router();

router.get('/', protect, getReviews);

export default router;
