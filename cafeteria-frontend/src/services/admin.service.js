import api from './api';

const getStats = () => {
    return api.get('/admin/stats');
};

const getAllUsers = () => {
    return api.get('/admin/users');
};

const updateUserStatus = (userId, status) => {
    return api.put(`/admin/users/${userId}/status?status=${status}`);
};

const AdminService = {
    getStats,
    getAllUsers,
    updateUserStatus
};

export default AdminService;
