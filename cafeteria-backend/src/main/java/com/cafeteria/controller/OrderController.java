package com.cafeteria.controller;

import com.cafeteria.common.OrderStatus;
import com.cafeteria.dto.OrderRequest;
import com.cafeteria.entity.Order;
import com.cafeteria.security.UserDetailsImpl;
import com.cafeteria.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @PostMapping
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        logger.info("createOrder: UserID={}, Email={}", userDetails.getId(), userDetails.getEmail());
        Order order = orderService.createOrder(userDetails.getId(), request);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/my-orders")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public List<Order> getMyOrders(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        logger.debug("getMyOrders: UserID={}", userDetails.getId());
        return orderService.getUserOrders(userDetails.getId());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @Autowired
    private com.cafeteria.service.EmailService emailService;

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CHEF')")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        Order order = orderService.updateOrderStatus(id, status);

        // trigger email if ready
        if (status == OrderStatus.READY) {
            emailService.sendOrderReadyEmail(order.getUser().getEmail(), order.getUser().getName(), order.getId());
        }

        return ResponseEntity.ok(order);
    }

    @GetMapping("/kitchen")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CHEF')")
    public List<Order> getKitchenOrders() {
        return orderService.getKitchenOrders();
    }
}
