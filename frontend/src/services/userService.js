import api from './api';

const userService = {
    /**
     * Get current user profile
     */
    getProfile: async () => {
        const response = await api.get('/users/me');
        return response.data;
    },

    /**
     * Update user profile
     */
    updateProfile: async (data) => {
        const response = await api.put('/users/me', data);
        
        // Update stored user data
        if (response.data.success) {
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const updatedUser = { ...storedUser, ...response.data.data };
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        return response.data;
    },

    /**
     * Update password
     */
    updatePassword: async (currentPassword, newPassword) => {
        const response = await api.put('/users/me/password', {
            current_password: currentPassword,
            new_password: newPassword
        });
        return response.data;
    }
};

export default userService;
