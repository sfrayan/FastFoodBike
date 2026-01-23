// API Constants
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// User Roles
export const ROLES = {
  CUSTOMER: 'customer',
  RESTAURANT: 'restaurant',
  DELIVERY: 'delivery',
  ADMIN: 'admin',
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  CART: 'cart',
};

// Validation Patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9+\-\s()]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Invalid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, number and special character',
  PASSWORD_MISMATCH: 'Passwords do not match',
  UNAUTHORIZED: 'You are not authorized to access this resource',
  NETWORK_ERROR: 'Network error. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Account created successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  ORDER_PLACED: 'Order placed successfully',
};
