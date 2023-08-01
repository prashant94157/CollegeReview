import express from 'express';
const router = express.Router();

import {
  createPlan,
  updatePlan,
  deletePlan,
  getPlanByID,
  getPlans,
} from '../controllers/planControllers.js';
import { protect, admin } from '../middlewares/authMiddlewares.js';

router.route('/').post(protect, admin, createPlan).get(getPlans);

router
  .route('/:id')
  .get(getPlanByID)
  .put(protect, admin, updatePlan)
  .delete(protect, admin, deletePlan);

export default router;
