import express from 'express';
import {
  register,
  login,
  refreshToken,
  logout,
} from '../controllers/AuthController.js';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @body { firstName, lastName, email, password, role?, phone? }
 */
router.post('/register', register);

/**
 * @route POST /api/auth/login
 * @desc Login user
 * @body { email, password }
 */
router.post('/login', login);

/**
 * @route POST /api/auth/refresh
 * @desc Refresh access token
 * @body { refreshToken }
 */
router.post('/refresh', refreshToken);

/**
 * @route POST /api/auth/logout
 * @desc Logout user
 * @body { refreshToken }
 */
router.post('/logout', logout);

export default router;
