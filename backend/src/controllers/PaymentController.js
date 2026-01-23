import { stripeService, razorpayService } from '../services/paymentService.js';
import Order from '../models/Order.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * STRIPE PAYMENT ENDPOINTS
 */

/**
 * Create Stripe Payment Intent
 * POST /api/payments/stripe/create-intent
 */
export const createStripeIntent = asyncHandler(async (req, res) => {
  const { amount, orderId, customerEmail } = req.body;

  if (!amount || !orderId) {
    return res.status(400).json({
      status: 'error',
      message: 'Amount and Order ID are required',
    });
  }

  const result = await stripeService.createPaymentIntent(amount, 'inr', {
    orderId,
    customerEmail,
    userId: req.user.id,
  });

  if (result.status === 'error') {
    return res.status(400).json(result);
  }

  res.json(result);
});

/**
 * Confirm Stripe Payment
 * POST /api/payments/stripe/confirm
 */
export const confirmStripePayment = asyncHandler(async (req, res) => {
  const { paymentIntentId, orderId } = req.body;

  if (!paymentIntentId || !orderId) {
    return res.status(400).json({
      status: 'error',
      message: 'Payment Intent ID and Order ID are required',
    });
  }

  const paymentResult = await stripeService.confirmPayment(paymentIntentId);

  if (paymentResult.status === 'error') {
    return res.status(400).json(paymentResult);
  }

  // Update order with payment status
  if (paymentResult.data.status === 'succeeded') {
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'completed',
      paymentIntentId,
    });

    return res.json({
      status: 'success',
      message: 'Payment successful',
      data: paymentResult.data,
    });
  }

  res.json(paymentResult);
});

/**
 * Stripe Webhook Handler
 * POST /api/payments/stripe/webhook
 */
export const stripeWebhook = asyncHandler(async (req, res) => {
  const webhookEvent = await stripeService.handleWebhook(req);

  if (!webhookEvent) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid webhook',
    });
  }

  if (webhookEvent.type === 'payment_succeeded') {
    const { metadata, id } = webhookEvent.data;
    await Order.findByIdAndUpdate(metadata.orderId, {
      paymentStatus: 'completed',
      paymentIntentId: id,
    });
    console.log(`Payment successful for order: ${metadata.orderId}`);
  } else if (webhookEvent.type === 'payment_failed') {
    const { metadata } = webhookEvent.data;
    await Order.findByIdAndUpdate(metadata.orderId, {
      paymentStatus: 'failed',
    });
    console.log(`Payment failed for order: ${metadata.orderId}`);
  }

  res.json({ status: 'success', message: 'Webhook received' });
});

/**
 * Refund Stripe Payment
 * POST /api/payments/stripe/refund
 */
export const refundStripePayment = asyncHandler(async (req, res) => {
  const { chargeId, amount, orderId } = req.body;

  if (!chargeId) {
    return res.status(400).json({
      status: 'error',
      message: 'Charge ID is required',
    });
  }

  const refundResult = await stripeService.refundPayment(chargeId, amount);

  if (refundResult.status === 'error') {
    return res.status(400).json(refundResult);
  }

  // Update order
  if (orderId) {
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'refunded',
      refundId: refundResult.data.refundId,
    });
  }

  res.json(refundResult);
});

/**
 * RAZORPAY PAYMENT ENDPOINTS
 */

/**
 * Create Razorpay Order
 * POST /api/payments/razorpay/create-order
 */
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount, orderId } = req.body;

  if (!amount || !orderId) {
    return res.status(400).json({
      status: 'error',
      message: 'Amount and Order ID are required',
    });
  }

  const result = await razorpayService.createOrder(
    amount,
    'INR',
    orderId,
    {
      userId: req.user.id,
      orderId,
    }
  );

  if (result.status === 'error') {
    return res.status(400).json(result);
  }

  res.json({
    status: 'success',
    data: result.data,
    keyId: process.env.RAZORPAY_KEY_ID,
  });
});

/**
 * Verify Razorpay Payment
 * POST /api/payments/razorpay/verify
 */
export const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing payment details',
    });
  }

  const verifyResult = await razorpayService.verifyPayment(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  );

  if (!verifyResult.verified) {
    return res.status(400).json({
      status: 'error',
      message: 'Payment verification failed',
    });
  }

  // Update order with payment status
  await Order.findByIdAndUpdate(orderId, {
    paymentStatus: 'completed',
    razorpayPaymentId,
    razorpayOrderId,
  });

  res.json({
    status: 'success',
    message: 'Payment verified successfully',
    data: verifyResult.data,
  });
});

/**
 * Refund Razorpay Payment
 * POST /api/payments/razorpay/refund
 */
export const refundRazorpayPayment = asyncHandler(async (req, res) => {
  const { razorpayPaymentId, amount, orderId } = req.body;

  if (!razorpayPaymentId) {
    return res.status(400).json({
      status: 'error',
      message: 'Payment ID is required',
    });
  }

  const refundResult = await razorpayService.refundPayment(
    razorpayPaymentId,
    amount
  );

  if (refundResult.status === 'error') {
    return res.status(400).json(refundResult);
  }

  // Update order
  if (orderId) {
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'refunded',
      refundId: refundResult.data.refundId,
    });
  }

  res.json(refundResult);
});

/**
 * Get Payment Status
 * GET /api/payments/status/:orderId
 */
export const getPaymentStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'Order not found',
    });
  }

  // Check authorization
  if (
    order.userId.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).json({
      status: 'error',
      message: 'Not authorized',
    });
  }

  res.json({
    status: 'success',
    data: {
      orderId: order._id,
      paymentStatus: order.paymentStatus,
      totalAmount: order.totalPrice,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
    },
  });
});
