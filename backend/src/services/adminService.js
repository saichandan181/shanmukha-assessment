const { supabaseAdmin } = require('../config/supabase');

/**
 * Admin Service
 * Handles admin-related business logic
 */

class AdminService {
    /**
     * Get all users with pagination
     */
    async getAllUsers(page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit;

            // Get total count
            const { count, error: countError } = await supabaseAdmin
                .from('users')
                .select('*', { count: 'exact', head: true });

            if (countError) {
                throw countError;
            }

            // Get paginated users
            const { data, error } = await supabaseAdmin
                .from('users')
                .select('*')
                .order('created_at', { ascending: false })
                .range(offset, offset + limit - 1);

            if (error) {
                throw error;
            }

            return {
                users: data,
                pagination: {
                    page,
                    limit,
                    total: count,
                    totalPages: Math.ceil(count / limit)
                }
            };
        } catch (error) {
            console.error('Get all users error:', error);
            throw error;
        }
    }

    /**
     * Get user by ID
     */
    async getUserById(userId) {
        try {
            const { data, error } = await supabaseAdmin
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Get user by ID error:', error);
            throw error;
        }
    }

    /**
     * Activate a user
     */
    async activateUser(userId) {
        try {
            const { data, error } = await supabaseAdmin
                .from('users')
                .update({ status: 'active' })
                .eq('id', userId)
                .select()
                .single();

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Activate user error:', error);
            throw error;
        }
    }

    /**
     * Deactivate a user
     */
    async deactivateUser(userId) {
        try {
            const { data, error } = await supabaseAdmin
                .from('users')
                .update({ status: 'inactive' })
                .eq('id', userId)
                .select()
                .single();

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Deactivate user error:', error);
            throw error;
        }
    }

    /**
     * Update user role (admin only)
     */
    async updateUserRole(userId, role) {
        try {
            if (!['admin', 'user'].includes(role)) {
                throw new Error('Invalid role');
            }

            const { data, error } = await supabaseAdmin
                .from('users')
                .update({ role })
                .eq('id', userId)
                .select()
                .single();

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Update user role error:', error);
            throw error;
        }
    }
}

module.exports = new AdminService();
