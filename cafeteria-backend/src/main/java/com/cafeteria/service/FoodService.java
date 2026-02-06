package com.cafeteria.service;

import com.cafeteria.dto.FoodRequest;
import com.cafeteria.entity.Food;
import com.cafeteria.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public List<Food> getAvailableFoods() {
        return foodRepository.findByAvailable(true);
    }

    public List<Food> getFoodsByCategory(String category) {
        return foodRepository.findByCategory(category);
    }

    @Transactional
    public Food addFood(FoodRequest request) {
        Food food = new Food();
        food.setName(request.getName());
        food.setDescription(request.getDescription());
        food.setPrice(request.getPrice());
        food.setCategory(request.getCategory());
        food.setImageUrl(request.getImageUrl());
        food.setAvailable(request.isAvailable());
        return foodRepository.save(food);
    }

    @Transactional
    public Food updateFood(Long id, FoodRequest request) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));
        food.setName(request.getName());
        food.setDescription(request.getDescription());
        food.setPrice(request.getPrice());
        food.setCategory(request.getCategory());
        food.setImageUrl(request.getImageUrl());
        food.setAvailable(request.isAvailable());
        return foodRepository.save(food);
    }

    @Transactional
    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }
}
