package com.cafeteria.repository;

import com.cafeteria.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByCategory(String category);

    List<Food> findByAvailable(boolean available);
}
