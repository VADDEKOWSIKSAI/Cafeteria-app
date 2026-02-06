import React, { useState, useEffect, useContext } from 'react';
import FoodService from '../services/food.service';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import ReviewModal from '../components/ReviewModal';

const Menu = () => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [category, setCategory] = useState('Starters');
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart } = useContext(CartContext);
    const { currentUser } = useContext(AuthContext);

    // Review Modal State
    const [selectedFoodForReview, setSelectedFoodForReview] = useState(null);

    useEffect(() => {
        FoodService.getAvailableFoods().then((response) => {
            setFoods(response.data);
            setFilteredFoods(response.data);
        }).catch(err => {
            console.error("Error fetching menu", err);
        });
    }, []);

    // Filter logic handled in render for simplicity with Tabs
    const getFilteredFoods = (section) => {
        return foods.filter(f =>
            f.category === section &&
            f.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const categories = ['All', ...new Set(foods.map(food => food.category))];

    return (
        <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Our Menu</h2>

            {/* Search Bar */}
            <div className="animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Search for munchies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ textAlign: 'center', fontSize: '1.1rem', borderRadius: '30px' }}
                />
            </div>

            {/* Category Tabs */}
            <div className="animate-fade-in" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '3rem' }}>
                {['Starters', 'Breakfast', 'Lunch'].map(cat => (
                    <button
                        key={cat}
                        className={`btn ${category === cat ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ minWidth: '120px', transition: 'all 0.3s ease' }}
                        onClick={() => setCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Dynamic Section Content */}
            <div className="food-grid">
                {getFilteredFoods(category).length > 0 ? (
                    getFilteredFoods(category).map((food, index) => (
                        <div
                            key={food.id}
                            className="food-card animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {food.imageUrl ? (
                                <img src={food.imageUrl} alt={food.name} className="food-img" onError={(e) => { e.target.src = 'https://via.placeholder.com/280x200?text=No+Image'; }} />
                            ) : (
                                <div className="food-img" style={{ background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
                            )}
                            <div className="food-info">
                                <h3>{food.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{food.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                    <span className="price-tag">₹{food.price.toFixed(2)}</span>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ padding: '0.5em 1em', fontSize: '0.9rem' }}
                                            onClick={() => setSelectedFoodForReview(food)}
                                        >
                                            ⭐ Reviews
                                        </button>
                                        <button className="btn btn-primary" onClick={() => addToCart(food)}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1', padding: '2rem' }}>
                        <h3 className="text-muted">
                            {searchQuery ? `No ${category} matching "${searchQuery}"` : `No items in ${category} yet`}
                        </h3>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {selectedFoodForReview && (
                <ReviewModal
                    food={selectedFoodForReview}
                    currentUser={currentUser}
                    onClose={() => setSelectedFoodForReview(null)}
                />
            )}
        </div>
    );
};

export default Menu;
