import Order from '../models/Order.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * Create new order
 * POST /api/orders
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { restaurantId, items, totalPrice, deliveryAddress, phoneNumber, notes } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Order must contain at least one item',
    });
  }

  const order = await Order.create({
    userId: req.user.id,
    restaurantId,
    items,
    totalPrice,
    deliveryAddress,
    phoneNumber,
    notes,
    status: 'pending',
    paymentStatus: 'pending',
  });

  await order.populate(['userId', 'restaurantId']);

  res.status(201).json({
    status: 'success',
    message: 'Order placed successfully',
    data: order,
  });
});

/**
 * Get order by ID
 * GET /api/orders/:id
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(['userId', 'restaurantId', 'deliveryPersonId']);

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'Order not found',
    });
  }

  // Check authorization
  if (
    order.userId._id.toString() !== req.user.id &&
    order.restaurantId.ownerId.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).json({
      status: 'error',
      message: 'Not authorized to view this order',
    });
  }

  res.json({
    status: 'success',
    data: order,
  });
});

/**
 * Get user orders
 * GET /api/orders
 */
export const getUserOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status = '' } = req.query;
  const skip = (page - 1) * limit;

  const query = { userId: req.user.id };
  if (status) {
    query.status = status;
  }

  const orders = await Order.find(query)
    .populate('restaurantId')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Order.countDocuments(query);

  res.json({
    status: 'success',
    data: orders,
    pagination: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * Get restaurant orders (restaurant owner)
 * GET /api/restaurants/:restaurantId/orders
 */
export const getRestaurantOrders = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const { page = 1, limit = 10, status = '' } = req.query;
  const skip = (page - 1) * limit;

  const query = { restaurantId };
  if (status) {
    query.status = status;
  }

  const orders = await Order.find(query)
    .populate('userId')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Order.countDocuments(query);

  res.json({
    status: 'success',
    data: orders,
    pagination: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * Update order status
 * PUT /api/orders/:id/status
 */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'Order not found',
    });
  }

  // Check authorization
  if (
    order.restaurantId.toString() !== req.body.restaurantId &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).json({
      status: 'error',
      message: 'Not authorized to update this order',
    });
  }

  order.status = status;
  await order.save();

  res.json({
    status: 'success',
    message: `Order status updated to ${status}`,
    data: order,
  });
});

/**
 * Cancel order
 * POST /api/orders/:id/cancel
 */
export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'Order not found',
    });
  }

  // Check authorization
  if (order.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Not authorized to cancel this order',
    });
  }

  if (order.status !== 'pending' && order.status !== 'confirmed') {
    return res.status(400).json({
      status: 'error',
      message: 'Cannot cancel order in current status',
    });
  }

  order.status = 'cancelled';
  await order.save();

  res.json({
    status: 'success',
    message: 'Order cancelled successfully',
    data: order,
  });
});

/**
 * Assign delivery person
 * PUT /api/orders/:id/assign-delivery
 */
export const assignDeliveryPerson = asyncHandler(async (req, res) => {
  const { deliveryPersonId } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { deliveryPersonId, status: 'out_for_delivery' },
    { new: true }
  ).populate('deliveryPersonId');

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'Order not found',
    });
  }

  res.json({
    status: 'success',
    message: 'Delivery person assigned',
    data: order,
  });
});

/**
 * Complete order
 * PUT /api/orders/:id/complete
 */
export const completeOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: 'delivered', deliveredAt: new Date() },
    { new: true }
  );

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'Order not found',
    });
  }

  res.json({
    status: 'success',
    message: 'Order completed',
    data: order,
  });
});
