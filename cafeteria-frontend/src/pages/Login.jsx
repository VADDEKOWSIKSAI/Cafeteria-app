import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ adminMode = false }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(email, password);

            // Redirect based on mode
            if (adminMode) {
                // Check for either ADMIN or ROLE_ADMIN (Spring Security prefix)
                if (userData.roles && (userData.roles.includes('ADMIN') || userData.roles.includes('ROLE_ADMIN'))) {
                    navigate('/admin');
                } else {
                    // Login successful but role mismatch - force logout
                    logout();
                    setError('Access Denied: You are not an Admin');
                }
            } else {
                navigate('/menu');
            }
        } catch (err) {
            // Check if error was set manually above (Access Denied)
            if (err.message && err.message.includes('Access Denied')) {
                // Error already set
            } else {
                setError('Invalid email or password');
            }
        }
    };

    return (
        <div className="container animate-fade-in" style={{
            minHeight: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{adminMode ? 'Admin Login' : 'Login'}</h2>
                {error && <div style={{ color: 'var(--primary-color)', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                        <Link to="/forgot-password" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.9rem' }}>Forgot Password?</Link>
                    </div>
                    <button type="submit" className="btn btn-primary animate-pulse" style={{ width: '100%', marginTop: '0.5rem' }}>{adminMode ? 'Login as Admin' : 'Login'}</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
