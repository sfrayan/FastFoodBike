import MenuItem from '../models/MenuItem.js';
import Restaurant from '../models/Restaurant.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * Get menu items for a restaurant
 * GET /api/restaurants/:restaurantId/menu
 */
export const getMenuItems = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const { category = '', page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const query = { restaurantId };
  if (category) {
    query.category = category;
  }

  const menuItems = await MenuItem.find(query)
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ category: 1, name: 1 });

  const total = await MenuItem.countDocuments(query);

  res.json({
    status: 'success',
    data: menuItems,
    pagination: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * Get menu item by ID
 * GET /api/menu-items/:id
 */
export const getMenuItemById = asyncHandler(async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id).populate('restaurantId');

  if (!menuItem) {
    return res.status(404).json({
      status: 'error',
      message: 'Menu item not found',
    });
  }

  res.json({
    status: 'success',
    data: menuItem,
  });
});

/**
 * Create menu item (restaurant owner only)
 * POST /api/menu-items
 */
export const createMenuItem = asyncHandler(async (req, res) => {
  const { restaurantId, name, description, category, price, vegetarian, vegan, spicyLevel } =
    req.body;

  // Verify restaurant exists and user owns it
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    return res.status(404).json({
      status: 'error',
      message: 'Restaurant not found',
    });
  }

  if (restaurant.ownerId.toString() !== req.user.id) {
    return res.status(403).json({
      status: 'error',
      message: 'Not authorized to add items to this restaurant',
    });
  }

  const menuItem = await MenuItem.create({
    restaurantId,
    name,
    description,
    category,
    price,
    vegetarian,
    vegan,
    spicyLevel,
  });

  res.status(201).json({
    status: 'success',
    message: 'Menu item created successfully',
    data: menuItem,
  });
});

/**
 * Update menu item
 * PUT /api/menu-items/:id
 */
export const updateMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return res.status(404).json({
      status: 'error',
      message: 'Menu item not found',
    });
  }

  // Verify user owns the restaurant
  const restaurant = await Restaurant.findById(menuItem.restaurantId);
  if (restaurant.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Not authorized to update this menu item',
    });
  }

  const { name, description, category, price, vegetarian, vegan, spicyLevel, available } =
    req.body;

  Object.assign(menuItem, {
    name,
    description,
    category,
    price,
    vegetarian,
    vegan,
    spicyLevel,
    available,
  });

  await menuItem.save();

  res.json({
    status: 'success',
    message: 'Menu item updated successfully',
    data: menuItem,
  });
});

/**
 * Delete menu item
 * DELETE /api/menu-items/:id
 */
export const deleteMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return res.status(404).json({
      status: 'error',
      message: 'Menu item not found',
    });
  }

  // Verify user owns the restaurant
  const restaurant = await Restaurant.findById(menuItem.restaurantId);
  if (restaurant.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Not authorized to delete this menu item',
    });
  }

  await MenuItem.findByIdAndDelete(req.params.id);

  res.json({
    status: 'success',
    message: 'Menu item deleted successfully',
  });
});

/**
 * Search menu items
 * GET /api/menu-items/search
 */
export const searchMenuItems = asyncHandler(async (req, res) => {
  const { q = '', restaurantId = '' } = req.query;

  const query = {};
  if (q) {
    query.$text = { $search: q };
  }
  if (restaurantId) {
    query.restaurantId = restaurantId;
  }

  const menuItems = await MenuItem.find(query).limit(20);

  res.json({
    status: 'success',
    data: menuItems,
  });
});
