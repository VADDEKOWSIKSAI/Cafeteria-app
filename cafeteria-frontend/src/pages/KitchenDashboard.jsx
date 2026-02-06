import React, { useState, useEffect, useContext } from 'react';
import OrderService from '../services/order.service';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const KitchenDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Basic check for kitchen access
        if (!currentUser || (!currentUser.roles.includes('ADMIN') && !currentUser.roles.includes('CHEF') && !currentUser.roles.includes('ROLE_ADMIN') && !currentUser.roles.includes('ROLE_CHEF'))) {
            navigate('/login');
            return;
        }
        fetchKitchenOrders();

        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchKitchenOrders, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchKitchenOrders = async () => {
        try {
            const data = await OrderService.getKitchenOrders();
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching kitchen orders", error);
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            await OrderService.updateOrderStatus(orderId, newStatus);
            fetchKitchenOrders(); // Refresh list
        } catch (error) {
            console.error("Error updating status", error);
            alert("Failed to update status");
        }
    };

    if (loading) return <div className="text-center mt-5">Loading Kitchen Orders...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">👨‍🍳 Kitchen Dashboard</h2>
            {orders.length === 0 ? (
                <div className="alert alert-info text-center">No active orders. Time to clean! 🧹</div>
            ) : (
                <div className="row">
                    {orders.map(order => (
                        <div key={order.id} className="col-md-4 mb-4">
                            <div className="glass-card" style={{ borderLeft: order.status === 'PREPARING' ? '5px solid orange' : '5px solid red' }}>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5>Order #{order.id}</h5>
                                    <span className={`badge ${order.status === 'PREPARING' ? 'bg-warning' : 'bg-danger'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-muted small">User: {order.user ? order.user.name : 'Unknown'}</p>
                                <hr />
                                <ul className="list-group list-group-flush mb-3" style={{ background: 'transparent' }}>
                                    {order.orderItems.map(item => (
                                        <li key={item.id} className="list-group-item bg-transparent text-white border-0 py-1">
                                            <strong>{item.quantity}x</strong> {item.food.name}
                                        </li>
                                    ))}
                                </ul>
                                <div className="d-flex gap-2">
                                    {order.status === 'PENDING' && (
                                        <button
                                            className="btn btn-warning w-100"
                                            onClick={() => updateStatus(order.id, 'PREPARING')}
                                        >
                                            Start Cooking 🔥
                                        </button>
                                    )}
                                    {order.status === 'PREPARING' && (
                                        <button
                                            className="btn btn-success w-100"
                                            onClick={() => updateStatus(order.id, 'READY')}
                                        >
                                            Mark Ready ✅
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default KitchenDashboard;
