import api from './api';

const adminService = {
    /**
     * Get all users with pagination
     */
    getAllUsers: async (page = 1, limit = 10) => {
        const response = await api.get('/admin/users', {
            params: { page, limit }
        });
        return response.data;
    },

    /**
     * Get user by ID
     */
    getUserById: async (userId) => {
        const response = await api.get(`/admin/users/${userId}`);
        return response.data;
    },

    /**
     * Activate user
     */
    activateUser: async (userId) => {
        const response = await api.put(`/admin/users/${userId}/activate`);
        return response.data;
    },

    /**
     * Deactivate user
     */
    deactivateUser: async (userId) => {
        const response = await api.put(`/admin/users/${userId}/deactivate`);
        return response.data;
    }
};

export default adminService;
