import api from './api';

const register = (name, email, password, role) => {
    return api.post('/auth/signup', {
        name,
        email,
        password,
        role
    });
};

const login = (email, password) => {
    return api.post('/auth/signin', {
        email,
        password,
    })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const forgotPassword = (email) => {
    return api.post('/auth/forgot-password', { email });
};

const resetPassword = (token, newPassword) => {
    return api.post('/auth/reset-password', { token, newPassword });
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    forgotPassword,
    resetPassword,
};

export default AuthService;
