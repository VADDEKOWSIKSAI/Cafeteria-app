package com.cafeteria.service;

import com.cafeteria.common.OrderStatus;
import com.cafeteria.dto.OrderRequest;
import com.cafeteria.entity.Food;
import com.cafeteria.entity.Order;
import com.cafeteria.entity.OrderItem;
import com.cafeteria.entity.User;
import com.cafeteria.repository.FoodRepository;
import com.cafeteria.repository.OrderRepository;
import com.cafeteria.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Service to handle business logic for Orders.
 * Manages order creation, status updates, and retrieval for Users, Admin, and
 * Chefs.
 */
@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Creates a new order for a user.
     * <p>
     * Validates the user, creates order items, calculates the total price,
     * and assigns a Transaction ID (either provided by payment gateway or
     * generated).
     * </p>
     *
     * @param userId  The ID of the user placing the order.
     * @param request The request object containing food items and quantities.
     * @return The saved Order entity.
     */
    @Transactional
    public Order createOrder(Long userId, OrderRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PENDING);

        // Use provided Transaction ID (e.g. UTR from UPI) or generate one for system
        // tracking
        if (request.getTransactionId() != null && !request.getTransactionId().isEmpty()) {
            order.setTransactionId(request.getTransactionId());
        } else {
            order.setTransactionId("TXN-" + java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }

        List<OrderItem> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (OrderRequest.OrderItemRequest itemRequest : request.getItems()) {
            Food food = foodRepository.findById(itemRequest.getFoodId())
                    .orElseThrow(() -> new RuntimeException("Food not found: " + itemRequest.getFoodId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setFood(food);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(food.getPrice()); // Freeze price at order time

            items.add(orderItem);
            total = total.add(food.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }

        order.setOrderItems(items);
        order.setTotalPrice(total);

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    /**
     * Updates the status of an existing order.
     * Typically used by Chefs (preparing/ready) or Admins (completed/cancelled).
     *
     * @param orderId The ID of the order to update.
     * @param status  The new status to apply.
     * @return The updated Order entity.
     */
    @Transactional
    public Order updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    /**
     * Retrieves active orders for the Kitchen display.
     * Fetches orders that are either PENDING or PREPARING.
     *
     * @return List of active orders.
     */
    public List<Order> getKitchenOrders() {
        return orderRepository.findByStatusIn(List.of(OrderStatus.PENDING, OrderStatus.PREPARING));
    }
}
