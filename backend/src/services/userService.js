const { supabase, supabaseAdmin } = require('../config/supabase');

/**
 * User Service
 * Handles user-related business logic
 */

class UserService {
    /**
     * Get user profile by ID
     */
    async getUserProfile(userId) {
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
            console.error('Get user profile error:', error);
            throw error;
        }
    }

    /**
     * Update user profile
     */
    async updateProfile(userId, updates) {
        try {
            const allowedFields = ['full_name', 'email'];
            const filteredUpdates = {};

            // Only allow updating specific fields
            for (const field of allowedFields) {
                if (updates[field] !== undefined) {
                    filteredUpdates[field] = updates[field];
                }
            }

            if (Object.keys(filteredUpdates).length === 0) {
                throw new Error('No valid fields to update');
            }

            // Update in public.users
            const { data, error } = await supabaseAdmin
                .from('users')
                .update(filteredUpdates)
                .eq('id', userId)
                .select()
                .single();

            if (error) {
                throw error;
            }

            // If email was updated, also update in auth.users
            if (filteredUpdates.email) {
                await supabaseAdmin.auth.admin.updateUserById(userId, {
                    email: filteredUpdates.email
                });
            }

            return data;
        } catch (error) {
            console.error('Update profile error:', error);
            throw error;
        }
    }

    /**
     * Update user password
     */
    async updatePassword(userId, currentPassword, newPassword) {
        try {
            // Get user email first
            const { data: userData } = await supabaseAdmin
                .from('users')
                .select('email')
                .eq('id', userId)
                .single();

            if (!userData) {
                throw new Error('User not found');
            }

            // Verify current password by attempting to sign in
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: userData.email,
                password: currentPassword
            });

            if (signInError) {
                throw new Error('Current password is incorrect');
            }

            // Update password using admin API
            const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
                userId,
                { password: newPassword }
            );

            if (updateError) {
                throw updateError;
            }

            return true;
        } catch (error) {
            console.error('Update password error:', error);
            throw error;
        }
    }
}

module.exports = new UserService();
