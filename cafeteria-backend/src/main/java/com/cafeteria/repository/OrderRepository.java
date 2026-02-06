package com.cafeteria.repository;

import com.cafeteria.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    List<Order> findByStatusIn(List<com.cafeteria.common.OrderStatus> statuses);

    @org.springframework.data.jpa.repository.Query("SELECT SUM(o.totalPrice) FROM Order o")
    java.math.BigDecimal calculateTotalRevenue();
}
