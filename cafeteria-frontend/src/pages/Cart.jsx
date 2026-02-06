import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import OrderService from '../services/order.service';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useContext(CartContext);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleCheckout = () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        navigate('/payment');
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
                <h2>Your Cart is Empty</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={() => navigate('/menu')}>Back to Menu</button>
            </div>
        );
    }

    return (
        <div className="container">
            <h2>Your Cart</h2>
            <div className="glass-card" style={{ marginTop: '1rem' }}>
                {cart.map(item => (
                    <div key={item.foodId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', padding: '1rem 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: '#333', overflow: 'hidden' }}>
                                {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>
                            <div>
                                <h4>{item.name}</h4>
                                <span className="price-tag">₹{item.price.toFixed(2)}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button className="btn btn-secondary" onClick={() => updateQuantity(item.foodId, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button className="btn btn-secondary" onClick={() => updateQuantity(item.foodId, item.quantity + 1)}>+</button>
                            <button className="btn" style={{ background: '#ff4444' }} onClick={() => removeFromCart(item.foodId)}>Remove</button>
                        </div>
                    </div>
                ))}

                <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                    <h3>Total: ₹{getCartTotal().toFixed(2)}</h3>
                    <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
