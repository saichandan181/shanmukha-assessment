import api from './api';

const authService = {
    /**
     * Sign up a new user
     */
    signup: async (email, password, full_name) => {
        const response = await api.post('/auth/signup', {
            email,
            password,
            full_name
        });
        return response.data;
    },

    /**
     * Login user
     */
    login: async (email, password) => {
        const response = await api.post('/auth/login', {
            email,
            password
        });
        
        if (response.data.success && response.data.data.access_token) {
            localStorage.setItem('token', response.data.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        
        return response.data;
    },

    /**
     * Logout user
     */
    logout: async () => {
        try {
            await api.post('/auth/logout');
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    /**
     * Get current user
     */
    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    /**
     * Get stored user data
     */
    getStoredUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

export default authService;
