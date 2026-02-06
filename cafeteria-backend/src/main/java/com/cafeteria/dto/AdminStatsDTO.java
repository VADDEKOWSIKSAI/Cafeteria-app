package com.cafeteria.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminStatsDTO {
    private long totalOrders;
    private BigDecimal totalRevenue;
    private long totalUsers;
    private String topSellingItem;
}
