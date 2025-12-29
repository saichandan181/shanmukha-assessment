const adminService = require('../services/adminService');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');

/**
 * Admin Controller
 * Handles HTTP requests for admin operations
 */

class AdminController {
    /**
     * GET /admin/users
     * Get all users with pagination
     */
    async getAllUsers(req, res, next) {
        try {
            const { page, limit } = req.query;

            const result = await adminService.getAllUsers(
                parseInt(page) || 1,
                parseInt(limit) || 10
            );

            return paginatedResponse(
                res,
                result.users.map(user => ({
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                    role: user.role,
                    status: user.status,
                    last_login: user.last_login,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                })),
                result.pagination,
                'Users retrieved successfully'
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /admin/users/:id
     * Get user by ID
     */
    async getUserById(req, res, next) {
        try {
            const { id } = req.params;

            const user = await adminService.getUserById(id);

            return successResponse(res, {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
                status: user.status,
                last_login: user.last_login,
                created_at: user.created_at,
                updated_at: user.updated_at
            });
        } catch (error) {
            if (error.message?.includes('not found')) {
                return errorResponse(res, 'User not found', 404);
            }
            next(error);
        }
    }

    /**
     * PUT /admin/users/:id/activate
     * Activate a user
     */
    async activateUser(req, res, next) {
        try {
            const { id } = req.params;

            // Prevent self-deactivation scenarios
            if (id === req.user.id) {
                return errorResponse(res, 'Cannot modify your own status', 400);
            }

            const updatedUser = await adminService.activateUser(id);

            return successResponse(res, {
                id: updatedUser.id,
                email: updatedUser.email,
                full_name: updatedUser.full_name,
                role: updatedUser.role,
                status: updatedUser.status
            }, 'User activated successfully');
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /admin/users/:id/deactivate
     * Deactivate a user
     */
    async deactivateUser(req, res, next) {
        try {
            const { id } = req.params;

            // Prevent self-deactivation
            if (id === req.user.id) {
                return errorResponse(res, 'Cannot deactivate your own account', 400);
            }

            const updatedUser = await adminService.deactivateUser(id);

            return successResponse(res, {
                id: updatedUser.id,
                email: updatedUser.email,
                full_name: updatedUser.full_name,
                role: updatedUser.role,
                status: updatedUser.status
            }, 'User deactivated successfully');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AdminController();
