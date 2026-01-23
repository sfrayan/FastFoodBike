import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  searchMenuItems,
} from '../controllers/MenuItemController.js';

const router = express.Router();

// Public routes
router.get('/restaurants/:restaurantId/menu', getMenuItems);
router.get('/:id', getMenuItemById);
router.get('/search', searchMenuItems);

// Authenticated routes (restaurant owners)
router.post('/', authenticate, authorize('restaurant'), createMenuItem);
router.put('/:id', authenticate, updateMenuItem);
router.delete('/:id', authenticate, deleteMenuItem);

export default router;
