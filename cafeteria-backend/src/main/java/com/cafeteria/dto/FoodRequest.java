package com.cafeteria.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class FoodRequest {
    private String name;
    private String description;
    private BigDecimal price;
    private String category;
    private String imageUrl;
    private boolean available;
}
