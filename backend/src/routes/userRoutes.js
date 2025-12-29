const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { validate, updateProfileSchema, updatePasswordSchema } = require('../utils/validators');

/**
 * User Routes
 * All routes require authentication
 */

// GET /users/me - Get current user profile
router.get('/me', authenticate, userController.getProfile.bind(userController));

// PUT /users/me - Update current user profile
router.put('/me', authenticate, validate(updateProfileSchema), userController.updateProfile.bind(userController));

// PUT /users/me/password - Update password
router.put('/me/password', authenticate, validate(updatePasswordSchema), userController.updatePassword.bind(userController));

module.exports = router;
