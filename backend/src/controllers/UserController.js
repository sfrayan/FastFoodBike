import User from '../models/User.js';
import Order from '../models/Order.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * Get user profile
 * GET /api/users/profile
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }
  res.json({
    status: 'success',
    data: user,
  });
});

/**
 * Update user profile
 * PUT /api/users/profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, address } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { firstName, lastName, email, phone, address },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  res.json({
    status: 'success',
    message: 'Profile updated successfully',
    data: user,
  });
});

/**
 * Delete user account
 * DELETE /api/users/account
 */
export const deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user.id);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  res.json({
    status: 'success',
    message: 'Account deleted successfully',
  });
});

/**
 * Get user's orders
 * GET /api/users/orders
 */
export const getUserOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const orders = await Order.find({ userId: req.user.id })
    .populate('restaurantId')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Order.countDocuments({ userId: req.user.id });

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
 * Get all users (admin only)
 * GET /api/users
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await User.countDocuments();

  res.json({
    status: 'success',
    data: users,
    pagination: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * Get user by ID (admin only)
 * GET /api/users/:id
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  res.json({
    status: 'success',
    data: user,
  });
});

/**
 * Update user (admin only)
 * PUT /api/users/:id
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, role, status } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { firstName, lastName, email, role, status },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  res.json({
    status: 'success',
    message: 'User updated successfully',
    data: user,
  });
});

/**
 * Delete user (admin only)
 * DELETE /api/users/:id
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  res.json({
    status: 'success',
    message: 'User deleted successfully',
  });
});
