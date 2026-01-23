import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  // Stripe
  createStripeIntent,
  confirmStripePayment,
  stripeWebhook,
  refundStripePayment,
  // Razorpay
  createRazorpayOrder,
  verifyRazorpayPayment,
  refundRazorpayPayment,
  // Common
  getPaymentStatus,
} from '../controllers/PaymentController.js';

const router = express.Router();

// Stripe routes
router.post('/stripe/create-intent', authenticate, createStripeIntent);
router.post('/stripe/confirm', authenticate, confirmStripePayment);
router.post('/stripe/refund', authenticate, refundStripePayment);
router.post('/stripe/webhook', stripeWebhook); // No auth for webhook

// Razorpay routes
router.post('/razorpay/create-order', authenticate, createRazorpayOrder);
router.post('/razorpay/verify', authenticate, verifyRazorpayPayment);
router.post('/razorpay/refund', authenticate, refundRazorpayPayment);

// Common routes
router.get('/status/:orderId', authenticate, getPaymentStatus);

export default router;
