package com.cafeteria.controller;

import com.cafeteria.dto.AdminStatsDTO;
import com.cafeteria.repository.OrderRepository;
import com.cafeteria.repository.UserRepository;
import com.cafeteria.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdminStatsDTO> getStats() {
        long totalOrders = orderRepository.count();
        long totalUsers = userRepository.count();
        BigDecimal totalRevenue = orderRepository.calculateTotalRevenue();

        if (totalRevenue == null) {
            totalRevenue = BigDecimal.ZERO;
        }

        List<String> topSelling = orderItemRepository.findTopSellingItems(PageRequest.of(0, 1));
        String topItem = topSelling.isEmpty() ? "N/A" : topSelling.get(0);

        return ResponseEntity.ok(new AdminStatsDTO(totalOrders, totalRevenue, totalUsers, topItem));
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<com.cafeteria.entity.User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @org.springframework.web.bind.annotation.PutMapping("/users/{userId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUserStatus(@org.springframework.web.bind.annotation.PathVariable Long userId,
            @org.springframework.web.bind.annotation.RequestParam boolean enabled) {
        com.cafeteria.entity.User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(enabled);
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}
