import express from 'express';

import { protect, subscribed } from '../middlewares/authMiddlewares.js';
import { getReviews, getReviewById } from '../controllers/reviewControllers.js';
const router = express.Router();

router.get('/', protect, getReviews);

router.get(protect, subscribed, getReviewById);
export default router;
