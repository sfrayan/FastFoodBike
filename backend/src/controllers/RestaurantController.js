import Restaurant from '../models/Restaurant.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * Get all restaurants with search and filter
 * GET /api/restaurants?search=&cuisine=&minRating=&maxDeliveryTime=
 */
export const getRestaurants = asyncHandler(async (req, res) => {
  const { search = '', cuisine = '', minRating = 0, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const query = { active: true };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (cuisine) {
    query.cuisines = { $in: [cuisine] };
  }

  if (minRating) {
    query.rating = { $gte: parseFloat(minRating) };
  }

  const restaurants = await Restaurant.find(query)
    .sort({ rating: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .select('-password');

  const total = await Restaurant.countDocuments(query);

  res.json({
    status: 'success',
    data: restaurants,
    pagination: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * Get restaurant by ID
 * GET /api/restaurants/:id
 */
export const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return res.status(404).json({
      status: 'error',
      message: 'Restaurant not found',
    });
  }

  res.json({
    status: 'success',
    data: restaurant,
  });
});

/**
 * Create new restaurant (owner only)
 * POST /api/restaurants
 */
export const createRestaurant = asyncHandler(async (req, res) => {
  const { name, description, cuisines, phone, address, deliveryTime, deliveryFee } = req.body;

  const restaurant = await Restaurant.create({
    name,
    description,
    cuisines,
    phone,
    address,
    deliveryTime,
    deliveryFee,
    ownerId: req.user.id,
    rating: 0,
    active: false, // Needs admin approval
  });

  res.status(201).json({
    status: 'success',
    message: 'Restaurant created successfully. Awaiting admin approval.',
    data: restaurant,
  });
});

/**
 * Update restaurant
 * PUT /api/restaurants/:id
 */
export const updateRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return res.status(404).json({
      status: 'error',
      message: 'Restaurant not found',
    });
  }

  // Check if owner or admin
  if (restaurant.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Not authorized to update this restaurant',
    });
  }

  const { name, description, cuisines, phone, address, deliveryTime, deliveryFee } = req.body;

  Object.assign(restaurant, {
    name,
    description,
    cuisines,
    phone,
    address,
    deliveryTime,
    deliveryFee,
  });

  await restaurant.save();

  res.json({
    status: 'success',
    message: 'Restaurant updated successfully',
    data: restaurant,
  });
});

/**
 * Delete restaurant
 * DELETE /api/restaurants/:id
 */
export const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return res.status(404).json({
      status: 'error',
      message: 'Restaurant not found',
    });
  }

  // Check if owner or admin
  if (restaurant.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Not authorized to delete this restaurant',
    });
  }

  await Restaurant.findByIdAndDelete(req.params.id);

  res.json({
    status: 'success',
    message: 'Restaurant deleted successfully',
  });
});

/**
 * Get restaurants by owner
 * GET /api/restaurants/owner/my-restaurants
 */
export const getOwnerRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({ ownerId: req.user.id });

  res.json({
    status: 'success',
    data: restaurants,
  });
});

/**
 * Approve/reject restaurant (admin only)
 * PATCH /api/restaurants/:id/approve
 */
export const approveRestaurant = asyncHandler(async (req, res) => {
  const { active } = req.body;

  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    { active },
    { new: true }
  );

  if (!restaurant) {
    return res.status(404).json({
      status: 'error',
      message: 'Restaurant not found',
    });
  }

  res.json({
    status: 'success',
    message: `Restaurant ${active ? 'approved' : 'rejected'}`,
    data: restaurant,
  });
});
