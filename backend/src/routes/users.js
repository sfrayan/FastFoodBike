import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  getProfile,
  updateProfile,
  deleteAccount,
  getUserOrders,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/UserController.js';

const router = express.Router();

// User authenticated routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.delete('/account', authenticate, deleteAccount);
router.get('/orders', authenticate, getUserOrders);

// Admin only routes
router.get('/', authenticate, authorize('admin'), getAllUsers);
router.get('/:id', authenticate, authorize('admin'), getUserById);
router.put('/:id', authenticate, authorize('admin'), updateUser);
router.delete('/:id', authenticate, authorize('admin'), deleteUser);

export default router;
