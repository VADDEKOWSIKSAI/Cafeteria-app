import api from './api';

const updateProfile = (name, email) => {
    return api.put('/users/profile', { name, email });
};

const updatePassword = (password) => {
    return api.put('/users/password', { password });
};

const UserService = {
    updateProfile,
    updatePassword,
};

export default UserService;
