import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import authService from '../services/authService';

const Dashboard = () => {
    const { user, isAdmin } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await authService.getCurrentUser();
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user?.full_name}!
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Here's your dashboard overview
                    </p>
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="card">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Profile Information
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-900 font-medium">{stats?.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Full Name</p>
                                    <p className="text-gray-900 font-medium">{stats?.full_name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Role</p>
                                    <span className={`badge ${isAdmin ? 'badge-info' : 'badge-success'}`}>
                                        {stats?.role}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <span className={`badge ${stats?.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                                        {stats?.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Account Info Card */}
                        <div className="card">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Account Details
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Member Since</p>
                                    <p className="text-gray-900 font-medium">
                                        {stats?.created_at ? new Date(stats.created_at).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Last Login</p>
                                    <p className="text-gray-900 font-medium">
                                        {stats?.last_login ? new Date(stats.last_login).toLocaleString() : 'First login'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Last Updated</p>
                                    <p className="text-gray-900 font-medium">
                                        {stats?.updated_at ? new Date(stats.updated_at).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions Card */}
                        <div className="card">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <a href="/profile" className="block w-full btn btn-primary text-center">
                                    Edit Profile
                                </a>
                                {isAdmin && (
                                    <a href="/admin" className="block w-full btn btn-secondary text-center">
                                        Manage Users
                                    </a>
                                )}
                                <a href="/profile" className="block w-full btn btn-secondary text-center">
                                    Change Password
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Welcome Message */}
                <div className="mt-8 card bg-primary-50 border-l-4 border-primary-600">
                    <h3 className="text-lg font-semibold text-primary-900 mb-2">
                        {isAdmin ? '👑 Admin Access' : '👤 User Dashboard'}
                    </h3>
                    <p className="text-primary-700">
                        {isAdmin
                            ? 'You have full administrative access. Use the Admin Panel to manage users and system settings.'
                            : 'You can update your profile, change your password, and view your account information.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
