package com.cafeteria.controller;

import com.cafeteria.dto.FoodRequest;
import com.cafeteria.dto.MessageResponse;
import com.cafeteria.entity.Food;
import com.cafeteria.service.FoodService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    @GetMapping("/available")
    public List<Food> getAvailableFoods() {
        return foodService.getAvailableFoods();
    }

    @GetMapping("/category/{category}")
    public List<Food> getFoodsByCategory(@PathVariable String category) {
        return foodService.getFoodsByCategory(category);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addFood(@Valid @RequestBody FoodRequest request) {
        Food food = foodService.addFood(request);
        return ResponseEntity.ok(food);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateFood(@PathVariable Long id, @Valid @RequestBody FoodRequest request) {
        Food food = foodService.updateFood(id, request);
        return ResponseEntity.ok(food);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return ResponseEntity.ok(new MessageResponse("Food deleted successfully!"));
    }
}
