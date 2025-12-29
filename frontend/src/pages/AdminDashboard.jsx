import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import adminService from '../services/adminService';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: '',
        user: null
    });

    useEffect(() => {
        fetchUsers(pagination.page);
    }, []);

    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
            const response = await adminService.getAllUsers(page, pagination.limit);
            setUsers(response.data);
            setPagination(response.pagination);
        } catch (error) {
            toast.error('Failed to fetch users');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        fetchUsers(newPage);
    };

    const openModal = (type, user) => {
        setModalConfig({ isOpen: true, type, user });
    };

    const closeModal = () => {
        setModalConfig({ isOpen: false, type: '', user: null });
    };

    const handleActivate = async () => {
        try {
            await adminService.activateUser(modalConfig.user.id);
            toast.success('User activated successfully');
            fetchUsers(pagination.page);
            closeModal();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to activate user');
        }
    };

    const handleDeactivate = async () => {
        try {
            await adminService.deactivateUser(modalConfig.user.id);
            toast.success('User deactivated successfully');
            fetchUsers(pagination.page);
            closeModal();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to deactivate user');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Admin Dashboard
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Manage users and their access
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-primary-600">
                            {pagination.total}
                        </p>
                    </div>
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="card overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Last Login</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <td className="font-medium">{user.full_name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <span className={`badge ${user.role === 'admin' ? 'badge-info' : 'badge-success'}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    {user.last_login
                                                        ? new Date(user.last_login).toLocaleDateString()
                                                        : 'Never'}
                                                </td>
                                                <td>
                                                    <div className="flex space-x-2">
                                                        {user.status === 'active' ? (
                                                            <button
                                                                onClick={() => openModal('deactivate', user)}
                                                                className="btn btn-danger px-3 py-1 text-sm"
                                                            >
                                                                Deactivate
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => openModal('activate', user)}
                                                                className="btn btn-success px-3 py-1 text-sm"
                                                            >
                                                                Activate
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <Pagination
                            currentPage={pagination.page}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            {/* Activation Modal */}
            <Modal
                isOpen={modalConfig.isOpen && modalConfig.type === 'activate'}
                onClose={closeModal}
                title="Activate User"
                onConfirm={handleActivate}
                confirmText="Activate"
                confirmStyle="btn-success"
            >
                <p>Are you sure you want to activate <strong>{modalConfig.user?.full_name}</strong>?</p>
                <p className="mt-2 text-sm text-gray-600">
                    This user will be able to log in and access their account.
                </p>
            </Modal>

            {/* Deactivation Modal */}
            <Modal
                isOpen={modalConfig.isOpen && modalConfig.type === 'deactivate'}
                onClose={closeModal}
                title="Deactivate User"
                onConfirm={handleDeactivate}
                confirmText="Deactivate"
                confirmStyle="btn-danger"
            >
                <p>Are you sure you want to deactivate <strong>{modalConfig.user?.full_name}</strong>?</p>
                <p className="mt-2 text-sm text-gray-600">
                    This user will not be able to log in until their account is reactivated.
                </p>
            </Modal>
        </div>
    );
};

export default AdminDashboard;
