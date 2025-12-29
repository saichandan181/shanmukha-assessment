const { supabase, supabaseAdmin } = require('../config/supabase');

/**
 * Authentication Service
 * Handles all authentication-related business logic
 */

class AuthService {
    /**
     * Sign up a new user
     */
    async signup(email, password, full_name) {
        try {
            // Create user in Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name,
                        role: 'user' // Default role
                    }
                }
            });

            if (authError) {
                throw authError;
            }

            if (!authData.user) {
                throw new Error('Failed to create user');
            }

            // The trigger function will automatically create the profile
            // Wait a bit and fetch the profile
            await new Promise(resolve => setTimeout(resolve, 500));

            const { data: profile, error: profileError } = await supabaseAdmin
                .from('users')
                .select('*')
                .eq('id', authData.user.id)
                .single();

            if (profileError) {
                console.error('Profile fetch error:', profileError);
            }

            return {
                user: authData.user,
                session: authData.session,
                profile: profile || null
            };
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    }

    /**
     * Sign in a user
     */
    async login(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                throw error;
            }

            if (!data.user || !data.session) {
                throw new Error('Login failed');
            }

            // Update last_login timestamp
            await supabaseAdmin
                .from('users')
                .update({ last_login: new Date().toISOString() })
                .eq('id', data.user.id);

            // Fetch user profile
            const { data: profile, error: profileError } = await supabaseAdmin
                .from('users')
                .select('*')
                .eq('id', data.user.id)
                .single();

            if (profileError) {
                console.error('Profile fetch error:', profileError);
            }

            return {
                user: data.user,
                session: data.session,
                profile: profile || null
            };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    /**
     * Sign out a user
     */
    async logout(token) {
        try {
            const { error } = await supabase.auth.admin.signOut(token);
            
            if (error) {
                // Even if signOut fails, we consider it successful from client perspective
                console.error('Logout error:', error);
            }

            return true;
        } catch (error) {
            console.error('Logout error:', error);
            // Return true anyway - client will clear token
            return true;
        }
    }

    /**
     * Get current user profile
     */
    async getCurrentUser(userId) {
        try {
            const { data: profile, error } = await supabaseAdmin
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                throw error;
            }

            return profile;
        } catch (error) {
            console.error('Get current user error:', error);
            throw error;
        }
    }
}

module.exports = new AuthService();
