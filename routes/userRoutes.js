import express from 'express';
const router = express.Router();

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
} from '../controllers/userControllers.js';
import { protect, admin, reviewer } from '../middlewares/authMiddlewares.js';

router.post('/login', authUser);
router.post('/register', registerUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get('/', protect, reviewer, getUsers);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, reviewer, getUserById)
  .put(protect, admin, updateUser);

export default router;
