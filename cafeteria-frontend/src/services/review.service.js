import api from './api';

class ReviewService {
    getReviewsByFood(foodId) {
        // Returns list of reviews
        return api.get('/reviews/food/' + foodId);
    }

    addReview(userId, foodId, rating, comment) {
        // Posts specific payload expected by backend
        return api.post('/reviews/add', {
            userId,
            foodId,
            rating,
            comment
        });
    }
}

export default new ReviewService();
