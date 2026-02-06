import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="navbar animate-fade-in">
            <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
                <h2 style={{ margin: 0, fontSize: '1.8rem' }}>🍔 CollegeCafé</h2>
            </Link>

            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/menu" className="nav-link">Menu</Link>

                {currentUser ? (
                    <>
                        {currentUser.roles.includes('ROLE_ADMIN') && (
                            <Link to="/admin" className="nav-link">Admin</Link>
                        )}
                        {(currentUser.roles.includes('ROLE_ADMIN') || currentUser.roles.includes('ROLE_CHEF')) && (
                            <Link to="/kitchen" className="nav-link">👨‍🍳 Kitchen</Link>
                        )}
                        <Link to="/orders" className="nav-link">My Orders</Link>
                        <Link to="/profile" className="nav-link">Profile</Link>
                        <div onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }}>
                            Logout
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}

                <Link to="/cart" className="cart-icon-container nav-link">
                    🛒
                    {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                </Link>

                <button
                    onClick={toggleTheme}
                    className="btn btn-secondary"
                    style={{ padding: '0.5em', marginLeft: '10px', fontSize: '1.2rem', background: 'transparent', border: 'none' }}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
