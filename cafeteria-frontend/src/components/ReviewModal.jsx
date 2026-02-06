import React, { useState, useEffect } from 'react';
import ReviewService from '../services/review.service';
import StarRating from './StarRating';

const ReviewModal = ({ food, onClose, currentUser }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (food) {
            fetchReviews();
        }
    }, [food]);

    const fetchReviews = () => {
        ReviewService.getReviewsByFood(food.id)
            .then(res => {
                setReviews(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load reviews", err);
                setLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert("Please login to review!");
            return;
        }

        setSubmitting(true);
        ReviewService.addReview(currentUser.id, food.id, rating, comment)
            .then(res => {
                setReviews([...reviews, res.data]); // Add new review locally
                setComment('');
                setSubmitting(false);
            })
            .catch(err => {
                console.error("Failed to post review", err);
                alert("Failed to post review.");
                setSubmitting(false);
            });
    };

    // Calculate Average
    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "New";

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
        }}>
            <div className="glass-card animate-slide-up" style={{ width: '500px', maxHeight: '80vh', overflowY: 'auto', background: '#16213e', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                    &times;
                </button>

                <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                    {food.name} <span style={{ fontSize: '1rem', color: '#ffc107' }}>★ {averageRating}</span>
                </h3>

                {/* Review List */}
                <div style={{ margin: '1rem 0', maxHeight: '200px', overflowY: 'auto' }}>
                    {loading ? <p>Loading reviews...</p> : (
                        reviews.length === 0 ? <p className="text-muted">No reviews yet. Be the first!</p> : (
                            reviews.map(r => (
                                <div key={r.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <strong>{r.user ? r.user.name : 'Unknown'}</strong>
                                        <StarRating rating={r.rating} />
                                    </div>
                                    <p style={{ margin: '5px 0 0', color: '#ddd' }}>{r.comment}</p>
                                    <small className="text-muted">{new Date(r.createdAt).toLocaleDateString()}</small>
                                </div>
                            ))
                        )
                    )}
                </div>

                {/* Add Review Form */}
                {currentUser ? (
                    <form onSubmit={handleSubmit} style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                        <h5>Write a Review</h5>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Rating:</label>
                            <StarRating rating={rating} onChange={setRating} interactive={true} />
                        </div>
                        <textarea
                            className="form-control"
                            placeholder="How was the food?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            style={{ minHeight: '80px' }}
                        />
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', width: '100%' }} disabled={submitting}>
                            {submitting ? 'Posting...' : 'Post Review'}
                        </button>
                    </form>
                ) : (
                    <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,46,99,0.1)', borderRadius: '8px' }}>
                        <p style={{ margin: 0 }}>Please login to leave a review.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewModal;
