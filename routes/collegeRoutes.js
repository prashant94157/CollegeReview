import express from 'express';
const router = express.Router();

import {
  approveCollege,
  createCollege,
  deleteCollege,
  disapproveCollege,
  getApprovedColleges,
  getCollegeById,
  getDisapprovedColleges,
  updateCollege,
} from '../controllers/collegeControllers.js';

import {
  protect,
  reviewer,
  subscribed,
} from '../middlewares/authMiddlewares.js';

import {
  approveReview,
  createReview,
  deleteReview,
  disapproveReview,
  getApprovedReviews,
  getReviewById,
  getDisapprovedReviews,
  updateReview,
} from '../controllers/reviewControllers.js';

router
  .route('/')
  .post(protect, createCollege)
  .get(protect, subscribed, getApprovedColleges);
router
  .route('/:id/reviews')
  .post(protect, createReview)
  .get(protect, subscribed, getApprovedReviews);

router.get('/disapproved', protect, getDisapprovedColleges);
router.get('/:id/reviews/disapproved', protect, getDisapprovedReviews);

router.patch('/:id/disapprove', protect, reviewer, disapproveCollege);
router.patch(
  '/:id/reviews/:review_id/disapprove',
  protect,
  reviewer,
  disapproveReview
);

router
  .route('/:id/reviews/:review_id')
  .put(protect, updateReview)
  .delete(protect, deleteReview)
  .get(protect, subscribed, getReviewById)
  .patch(protect, reviewer, approveReview);
router
  .route('/:id')
  .put(protect, updateCollege)
  .delete(protect, deleteCollege)
  .get(protect, subscribed, getCollegeById)
  .patch(protect, reviewer, approveCollege);

export default router;
