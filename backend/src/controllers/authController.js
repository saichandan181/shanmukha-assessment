const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Authentication Controller
 * Handles HTTP requests for authentication
 */

class AuthController {
    /**
     * POST /auth/signup
     * Register a new user
     */
    async signup(req, res, next) {
        try {
            const { email, password, full_name } = req.body;

            const result = await authService.signup(email, password, full_name);

            return successResponse(
                res,
                {
                    user: {
                        id: result.user.id,
                        email: result.user.email,
                        full_name: result.profile?.full_name || full_name,
                        role: result.profile?.role || 'user',
                        status: result.profile?.status || 'active'
                    },
                    access_token: result.session?.access_token,
                    refresh_token: result.session?.refresh_token
                },
                'User registered successfully',
                201
            );
        } catch (error) {
            if (error.message?.includes('already registered')) {
                return errorResponse(res, 'Email already registered', 409);
            }
            next(error);
        }
    }

    /**
     * POST /auth/login
     * Authenticate a user
     */
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const result = await authService.login(email, password);

            // Check if user is active
            if (result.profile?.status !== 'active') {
                return errorResponse(res, 'Account is inactive. Please contact support.', 403);
            }

            return successResponse(
                res,
                {
                    user: {
                        id: result.user.id,
                        email: result.user.email,
                        full_name: result.profile?.full_name,
                        role: result.profile?.role,
                        status: result.profile?.status
                    },
                    access_token: result.session.access_token,
                    refresh_token: result.session.refresh_token
                },
                'Login successful'
            );
        } catch (error) {
            if (error.message?.includes('Invalid login credentials')) {
                return errorResponse(res, 'Invalid email or password', 401);
            }
            next(error);
        }
    }

    /**
     * POST /auth/logout
     * Sign out the current user
     */
    async logout(req, res, next) {
        try {
            const token = req.headers.authorization?.substring(7);
            
            await authService.logout(token);

            return successResponse(res, null, 'Logout successful');
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /auth/me
     * Get current authenticated user
     */
    async getCurrentUser(req, res, next) {
        try {
            const profile = await authService.getCurrentUser(req.user.id);

            return successResponse(res, {
                id: profile.id,
                email: profile.email,
                full_name: profile.full_name,
                role: profile.role,
                status: profile.status,
                last_login: profile.last_login,
                created_at: profile.created_at
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
