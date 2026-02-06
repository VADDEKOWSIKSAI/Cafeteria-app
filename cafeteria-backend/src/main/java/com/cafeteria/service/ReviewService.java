package com.cafeteria.service;

import com.cafeteria.entity.Food;
import com.cafeteria.entity.Review;
import com.cafeteria.entity.User;
import com.cafeteria.repository.FoodRepository;
import com.cafeteria.repository.ReviewRepository;
import com.cafeteria.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Review> getReviewsByFood(Long foodId) {
        return reviewRepository.findByFoodId(foodId);
    }

    public Review addReview(Long userId, Long foodId, int rating, String comment) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Food food = foodRepository.findById(foodId).orElseThrow(() -> new RuntimeException("Food not found"));

        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        Review review = new Review();
        review.setUser(user);
        review.setFood(food);
        review.setRating(rating);
        review.setComment(comment);
        review.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }
}
