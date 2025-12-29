import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="text-xl font-bold text-primary-600">
                            User Management
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700">
                            {user?.full_name || user?.email}
                        </span>
                        <span className={`badge ${isAdmin ? 'badge-info' : 'badge-success'}`}>
                            {user?.role}
                        </span>
                        
                        <div className="flex space-x-2">
                            <Link
                                to="/dashboard"
                                className="btn btn-secondary"
                            >
                                Dashboard
                            </Link>
                            
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    className="btn btn-primary"
                                >
                                    Admin Panel
                                </Link>
                            )}
                            
                            <Link
                                to="/profile"
                                className="btn btn-secondary"
                            >
                                Profile
                            </Link>
                            
                            <button
                                onClick={handleLogout}
                                className="btn btn-danger"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
