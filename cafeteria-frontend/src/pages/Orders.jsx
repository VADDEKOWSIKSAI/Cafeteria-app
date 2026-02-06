import React, { useState, useEffect } from 'react';
import OrderService from '../services/order.service';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        OrderService.getMyOrders().then(response => {
            console.log("Fetched Orders Response:", response.data);
            setOrders(response.data);
            setLoading(false);
        }).catch(err => {
            console.error("Error fetching orders", err);
            setLoading(false);
        });
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'secondary';
            case 'PREPARING': return 'warning';
            case 'READY': return 'success';
            case 'DELIVERED': return 'primary';
            case 'CANCELLED': return 'danger';
            default: return 'light';
        }
    };

    if (loading) return <div className="text-center mt-5">Loading your history...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">📜 Order History</h2>
            {orders.length === 0 ? (
                <div className="alert alert-info text-center">You haven't placed any orders yet. <a href="/menu">Go to Menu</a></div>
            ) : (
                <div className="row justify-content-center">
                    {orders.map(order => (
                        <div key={order.id} className="col-md-8 mb-4">
                            <div className="glass-card">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h5 className="mb-1">Order #{order.id}</h5>
                                        <div className="small text-muted mb-1">
                                            Txn ID: <span className="font-monospace">{order.transactionId || 'N/A'}</span>
                                        </div>
                                        <span className="text-muted small">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="text-end">
                                        <span className={`badge bg-${getStatusColor(order.status)} fs-6`}>
                                            {order.status}
                                        </span>
                                        <h4 className="mt-2 text-primary">₹{order.totalPrice.toFixed(2)}</h4>
                                    </div>
                                </div>
                                <div className="p-3" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                                    {order.orderItems.map(item => (
                                        <div key={item.id} className="d-flex justify-content-between mb-2">
                                            <span>
                                                <span className="badge bg-secondary me-2">{item.quantity}x</span>
                                                {item.food.name}
                                            </span>
                                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
