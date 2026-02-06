import React, { useState, useEffect } from 'react';
import FoodService from '../services/food.service';

import OrderService from '../services/order.service';
import AdminService from '../services/admin.service';

const AdminDashboard = () => {
    const [view, setView] = useState('DASHBOARD'); // DASHBOARD, ORDERS, FOODS, ADD_FOOD
    const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, totalUsers: 0, topSellingItem: 'N/A' });
    const [orders, setOrders] = useState([]);
    const [foods, setFoods] = useState([]);

    // Form state for new food
    const [newFood, setNewFood] = useState({ name: '', description: '', price: '', category: '', imageUrl: '', available: true });
    // State for editing
    const [editingFood, setEditingFood] = useState(null);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadData();
    }, [view]);

    const loadData = () => {
        if (view === 'DASHBOARD') {
            AdminService.getStats().then(res => setStats(res.data));
        } else if (view === 'ORDERS') {
            OrderService.getAllOrders().then(res => setOrders(res.data));
        } else if (view === 'FOODS') {
            FoodService.getAllFoods().then(res => setFoods(res.data));
        } else if (view === 'USERS') {
            AdminService.getAllUsers().then(res => setUsers(res.data));
        }
    };

    const handleUserStatus = (userId, currentStatus) => {
        // Toggle status
        AdminService.updateUserStatus(userId, !currentStatus).then(() => {
            loadData();
        });
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        OrderService.updateOrderStatus(orderId, newStatus).then(() => {
            loadData();
        });
    };

    const handleAddFood = (e) => {
        e.preventDefault();
        FoodService.addFood(newFood).then(() => {
            alert('Food added successfully');
            setNewFood({ name: '', description: '', price: '', category: '', imageUrl: '', available: true });
            setView('FOODS');
        });
    };

    const handleEditClick = (food) => {
        setEditingFood({ ...food });
        setView('EDIT_FOOD');
    };

    const handleUpdateFood = (e) => {
        e.preventDefault();
        FoodService.updateFood(editingFood.id, editingFood).then(() => {
            alert('Food updated successfully');
            setEditingFood(null);
            setView('FOODS');
        });
    };

    const handleDeleteFood = (id) => {
        if (window.confirm("Are you sure?")) {
            FoodService.deleteFood(id).then(() => loadData());
        }
    }

    return (
        <div className="container">
            <h2>Admin Dashboard</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button className={`btn ${view === 'DASHBOARD' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('DASHBOARD')}>Dashboard</button>
                <button className={`btn ${view === 'ORDERS' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('ORDERS')}>Manage Orders</button>
                <button className={`btn ${view === 'FOODS' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('FOODS')}>Manage Foods</button>
                <button className={`btn ${view === 'USERS' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('USERS')}>Manage Users</button>
                <button className={`btn ${view === 'KITCHEN' ? 'btn-warning' : 'btn-secondary'}`} onClick={() => window.location.href = '/kitchen'}>👨‍🍳 Kitchen View</button>
                <button className={`btn ${view === 'ADD_FOOD' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('ADD_FOOD')}>Add New Food</button>
            </div>

            {view === 'DASHBOARD' && (
                <div className="row mb-4">
                    <div className="col-md-3">
                        <div className="glass-card text-center p-3 animate-slide-up">
                            <h4>Total Orders</h4>
                            <h2 className="text-primary">{stats.totalOrders}</h2>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="glass-card text-center p-3 animate-slide-up delay-100">
                            <h4>Revenue</h4>
                            <h2 className="text-success">₹{stats.totalRevenue.toFixed(2)}</h2>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="glass-card text-center p-3 animate-slide-up delay-200">
                            <h4>Users</h4>
                            <h2 className="text-info">{stats.totalUsers}</h2>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="glass-card text-center p-3 animate-slide-up delay-300">
                            <h4>Top Item</h4>
                            <h2 className="text-warning">{stats.topSellingItem}</h2>
                        </div>
                    </div>
                </div>
            )}

            {view === 'USERS' && (
                <div className="glass-card animate-fade-in">
                    <h3>Registered Users</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge ${user.role === 'ADMIN' ? 'badge-warning' : 'badge-info'}`}>{user.role}</span>
                                    </td>
                                    <td>
                                        <span style={{ color: user.enabled ? 'green' : 'red', fontWeight: 'bold' }}>
                                            {user.enabled ? 'Active' : 'Blocked'}
                                        </span>
                                    </td>
                                    <td>
                                        {user.role !== 'ADMIN' && (
                                            <button
                                                className="btn"
                                                style={{ background: user.enabled ? '#ff4444' : '#28a745', fontSize: '0.8rem', padding: '5px 10px' }}
                                                onClick={() => handleUserStatus(user.id, user.enabled)}
                                            >
                                                {user.enabled ? 'Block' : 'Unblock'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {view === 'ORDERS' && (
                <div className="glass-card animate-fade-in">
                    <h3>All Orders</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>#{order.id}</td>
                                    <td>{order.user.email}</td>
                                    <td>₹{order.totalPrice.toFixed(2)}</td>
                                    <td>
                                        <span style={{ fontWeight: 'bold', color: order.status === 'READY' ? 'green' : 'orange' }}>{order.status}</span>
                                    </td>
                                    <td>
                                        {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                style={{ padding: '5px', borderRadius: '4px' }}
                                            >
                                                <option value="PREPARING">Preparing</option>
                                                <option value="READY">Ready</option>
                                                <option value="DELIVERED">Delivered</option>
                                                <option value="CANCELLED">Cancelled</option>
                                            </select>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {view === 'FOODS' && (
                <div className="glass-card animate-fade-in">
                    <h3>Food Menu</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Available</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map(food => (
                                <tr key={food.id}>
                                    <td>{food.id}</td>
                                    <td>{food.name}</td>
                                    <td>₹{food.price.toFixed(2)}</td>
                                    <td>{food.category}</td>
                                    <td>{food.available ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button className="btn" style={{ background: '#ffa500', padding: '5px 10px', marginRight: '5px' }} onClick={() => handleEditClick(food)}>Edit</button>
                                        <button className="btn" style={{ background: '#ff4444', padding: '5px 10px' }} onClick={() => handleDeleteFood(food.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {view === 'ADD_FOOD' && (
                <div className="glass-card" style={{ maxWidth: '500px' }}>
                    <h3>Add New Item</h3>
                    <form onSubmit={handleAddFood}>
                        <input className="form-control" placeholder="Name" value={newFood.name} onChange={e => setNewFood({ ...newFood, name: e.target.value })} required />
                        <textarea className="form-control" placeholder="Description" value={newFood.description} onChange={e => setNewFood({ ...newFood, description: e.target.value })} required />
                        <input className="form-control" type="number" placeholder="Price" value={newFood.price} onChange={e => setNewFood({ ...newFood, price: e.target.value })} required />
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                className="form-control"
                                placeholder="Category (Type or select below)"
                                value={newFood.category}
                                onChange={e => setNewFood({ ...newFood, category: e.target.value })}
                                required
                            />
                            <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                                {['Starters', 'Breakfast', 'Lunch'].map(cat => (
                                    <button
                                        type="button"
                                        key={cat}
                                        className="btn"
                                        style={{ fontSize: '0.8rem', padding: '2px 8px', background: 'rgba(255,255,255,0.1)' }}
                                        onClick={() => setNewFood({ ...newFood, category: cat })}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <input className="form-control" placeholder="Image URL" value={newFood.imageUrl} onChange={e => setNewFood({ ...newFood, imageUrl: e.target.value })} />
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            Available
                            <input type="checkbox" checked={newFood.available} onChange={e => setNewFood({ ...newFood, available: e.target.checked })} />
                        </label>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Add Item</button>

                    </form>
                </div>
            )}

            {view === 'EDIT_FOOD' && editingFood && (
                <div className="glass-card" style={{ maxWidth: '500px' }}>
                    <h3>Edit Item</h3>
                    <form onSubmit={handleUpdateFood}>
                        <input className="form-control" placeholder="Name" value={editingFood.name} onChange={e => setEditingFood({ ...editingFood, name: e.target.value })} required />
                        <textarea className="form-control" placeholder="Description" value={editingFood.description} onChange={e => setEditingFood({ ...editingFood, description: e.target.value })} required />
                        <input className="form-control" type="number" placeholder="Price" value={editingFood.price} onChange={e => setEditingFood({ ...editingFood, price: e.target.value })} required />
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                className="form-control"
                                placeholder="Category"
                                value={editingFood.category}
                                onChange={e => setEditingFood({ ...editingFood, category: e.target.value })}
                                required
                            />
                            <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                                {['Starters', 'Breakfast', 'Lunch'].map(cat => (
                                    <button
                                        type="button"
                                        key={cat}
                                        className="btn"
                                        style={{ fontSize: '0.8rem', padding: '2px 8px', background: 'rgba(255,255,255,0.1)' }}
                                        onClick={() => setEditingFood({ ...editingFood, category: cat })}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <input className="form-control" placeholder="Image URL" value={editingFood.imageUrl} onChange={e => setEditingFood({ ...editingFood, imageUrl: e.target.value })} />
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            Available
                            <input type="checkbox" checked={editingFood.available} onChange={e => setEditingFood({ ...editingFood, available: e.target.checked })} />
                        </label>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="button" className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setView('FOODS')}>Cancel</button>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Update Item</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
