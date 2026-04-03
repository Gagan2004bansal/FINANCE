/**
 * Auth routes
 * POST /api/auth/register  – Admin only (no public sign-up)
 * POST /api/auth/login
 * GET  /api/auth/me
 */

const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const { register, login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const validate = require('../middleware/validate.middleware');
const { registerRules, loginRules } = require('../validators/auth.validator');

// Apply rate limiting to auth endpoints to mitigate brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later' },
});

router.use(authLimiter);

// @route   POST /api/auth/register
// @desc    Register a new user (admin only – no public sign-up)
// @access  Admin
router.post('/register', protect, authorize('admin'), registerRules, validate, register);

// @route   POST /api/auth/login
// @desc    Log in and receive JWT token
// @access  Public
router.post('/login', loginRules, validate, login);

// @route   GET /api/auth/me
// @desc    Get the currently authenticated user
// @access  Private
router.get('/me', protect, getMe);

module.exports = router;
