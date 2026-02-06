import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container" style={{ textAlign: 'center', padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>

            {/* Floating Background Elements */}
            <div style={{ position: 'absolute', top: '10%', left: '5%', fontSize: '4rem', opacity: 0.1, animation: 'float 6s ease-in-out infinite' }}>🍔</div>
            <div style={{ position: 'absolute', top: '20%', right: '10%', fontSize: '3rem', opacity: 0.1, animation: 'float 5s ease-in-out infinite', animationDelay: '1s' }}>🍕</div>
            <div style={{ position: 'absolute', bottom: '15%', left: '15%', fontSize: '5rem', opacity: 0.1, animation: 'float 7s ease-in-out infinite', animationDelay: '0.5s' }}>🍟</div>
            <div style={{ position: 'absolute', bottom: '25%', right: '5%', fontSize: '4rem', opacity: 0.1, animation: 'float 8s ease-in-out infinite', animationDelay: '2s' }}>🥤</div>

            {/* Hero Section */}
            <div className="animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
                <h1 className="animate-slide-up">
                    Welcome to <span style={{ color: 'var(--primary-color)' }}>Smart Cafeteria</span>
                </h1>
                <p className="animate-slide-up delay-100" style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
                    Experience the future of dining. Fresh food, zero waiting, delivered straight to your table.
                </p>
            </div>

            {/* Role Selection Cards */}
            <div className="animate-slide-up delay-200" style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'stretch',
                position: 'relative',
                zIndex: 2,
                marginTop: '1rem'
            }}>

                {/* Student & Faculty Card */}
                <div className="glass-card animate-float"
                    style={{
                        flex: '1 1 280px',
                        maxWidth: '350px',
                        cursor: 'pointer',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--primary-color)',
                        boxShadow: '0 0 15px rgba(255, 46, 99, 0.2)'
                    }}
                    onClick={() => navigate('/login')}
                >
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
                    <h3>Student & Faculty</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Order food, track status, and enjoy your meal.</p>
                    <button className="btn btn-primary animate-pulse" style={{ marginTop: '1rem', width: '100%' }}>Login</button>
                </div>

                {/* Admin & Staff Card */}
                <div className="glass-card animate-float delay-100"
                    style={{
                        flex: '1 1 280px',
                        maxWidth: '350px',
                        cursor: 'pointer',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--secondary-color)',
                        boxShadow: '0 0 15px rgba(8, 217, 214, 0.2)'
                    }}
                    onClick={() => navigate('/admin/login')}
                >
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👨‍💼</div>
                    <h3>Admin & Staff</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Manage menu, track orders, and analyze sales.</p>
                    <button className="btn btn-secondary" style={{ marginTop: '1rem', width: '100%', borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)' }}>Admin Portal</button>
                </div>
            </div>

            {/* Feature Highlights */}
            <div style={{ marginTop: '5rem', display: 'flex', gap: '2rem', justifyContent: 'center', opacity: 0.8, position: 'relative', zIndex: 1 }}>
                <div className="animate-slide-up delay-300">
                    <h4>🚀 Fast</h4>
                    <p>Order in seconds</p>
                </div>
                <div className="animate-slide-up delay-300">
                    <h4>💳 Secure</h4>
                    <p>Cashless payments</p>
                </div>
                <div className="animate-slide-up delay-300">
                    <h4>📱 Live</h4>
                    <p>Real-time updates</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
