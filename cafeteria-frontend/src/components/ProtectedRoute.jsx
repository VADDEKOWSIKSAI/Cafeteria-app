import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && (!currentUser.roles.includes('ROLE_ADMIN') && !currentUser.roles.includes('ROLE_CHEF'))) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
