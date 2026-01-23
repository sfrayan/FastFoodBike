import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  createOrder,
  getOrderById,
  getUserOrders,
  getRestaurantOrders,
  updateOrderStatus,
  cancelOrder,
  assignDeliveryPerson,
  completeOrder,
} from '../controllers/OrderController.js';

const router = express.Router();

// User routes
router.post('/', authenticate, createOrder);
router.get('/', authenticate, getUserOrders);
router.get('/:id', authenticate, getOrderById);
router.post('/:id/cancel', authenticate, cancelOrder);

// Restaurant owner routes
router.get('/restaurant/:restaurantId', authenticate, authorize('restaurant'), getRestaurantOrders);
router.put('/:id/status', authenticate, updateOrderStatus);

// Delivery person routes
router.put('/:id/assign-delivery', authenticate, authorize('delivery'), assignDeliveryPerson);
router.put('/:id/complete', authenticate, authorize('delivery'), completeOrder);

export default router;
