package com.cafeteria.repository;

import com.cafeteria.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query("SELECT oi.food.name FROM OrderItem oi GROUP BY oi.food.name ORDER BY SUM(oi.quantity) DESC")
    List<String> findTopSellingItems(Pageable pageable);
}
