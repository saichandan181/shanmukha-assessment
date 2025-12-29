const userService = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * User Controller
 * Handles HTTP requests for user operations
 */

class UserController {
    /**
     * GET /users/me
     * Get current user profile
     */
    async getProfile(req, res, next) {
        try {
            const profile = await userService.getUserProfile(req.user.id);

            return successResponse(res, {
                id: profile.id,
                email: profile.email,
                full_name: profile.full_name,
                role: profile.role,
                status: profile.status,
                last_login: profile.last_login,
                created_at: profile.created_at,
                updated_at: profile.updated_at
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /users/me
     * Update current user profile
     */
    async updateProfile(req, res, next) {
        try {
            const updates = req.body;

            const updatedProfile = await userService.updateProfile(req.user.id, updates);

            return successResponse(res, {
                id: updatedProfile.id,
                email: updatedProfile.email,
                full_name: updatedProfile.full_name,
                role: updatedProfile.role,
                status: updatedProfile.status
            }, 'Profile updated successfully');
        } catch (error) {
            if (error.message?.includes('already exists')) {
                return errorResponse(res, 'Email already in use', 409);
            }
            next(error);
        }
    }

    /**
     * PUT /users/me/password
     * Update current user password
     */
    async updatePassword(req, res, next) {
        try {
            const { current_password, new_password } = req.body;

            await userService.updatePassword(req.user.id, current_password, new_password);

            return successResponse(res, null, 'Password updated successfully');
        } catch (error) {
            if (error.message?.includes('incorrect')) {
                return errorResponse(res, 'Current password is incorrect', 401);
            }
            next(error);
        }
    }
}

module.exports = new UserController();
