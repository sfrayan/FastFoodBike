import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getOwnerRestaurants,
  approveRestaurant,
} from '../controllers/RestaurantController.js';

const router = express.Router();

// Public routes
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);

// Authenticated routes (restaurant owners)
router.post('/', authenticate, authorize('restaurant'), createRestaurant);
router.get('/owner/my-restaurants', authenticate, authorize('restaurant'), getOwnerRestaurants);
router.put('/:id', authenticate, updateRestaurant);
router.delete('/:id', authenticate, deleteRestaurant);

// Admin only routes
router.patch('/:id/approve', authenticate, authorize('admin'), approveRestaurant);

export default router;
