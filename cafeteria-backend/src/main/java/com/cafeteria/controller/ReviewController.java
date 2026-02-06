package com.cafeteria.controller;

import com.cafeteria.entity.Review;
import com.cafeteria.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/food/{foodId}")
    public List<Review> getReviewsByFood(@PathVariable Long foodId) {
        return reviewService.getReviewsByFood(foodId);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addReview(@RequestBody Map<String, Object> payload) {
        try {
            Long userId = Long.valueOf(payload.get("userId").toString());
            Long foodId = Long.valueOf(payload.get("foodId").toString());
            int rating = Integer.parseInt(payload.get("rating").toString());
            String comment = (String) payload.get("comment");

            Review review = reviewService.addReview(userId, foodId, rating, comment);
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding review: " + e.getMessage());
        }
    }
}
