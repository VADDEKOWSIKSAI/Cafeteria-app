import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Strictly register as STUDENT
            await register(name, email, password, 'STUDENT');
            alert('Registered successfully!');
            navigate('/login');
        } catch (err) {
            console.error("Registration error:", err);
            if (err.response) {
                setError(err.response.data?.message || `Error: ${err.response.status}`);
            } else if (err.request) {
                setError('Network Error: Backend is not reachable (Check console)');
            } else {
                setError('Error: ' + err.message);
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
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Student Registration</h2>
                {error && <div style={{ color: 'var(--primary-color)', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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

                    <button type="submit" className="btn btn-primary animate-pulse" style={{ width: '100%', marginTop: '1rem' }}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
