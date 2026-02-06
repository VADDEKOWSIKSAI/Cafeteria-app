package com.cafeteria.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private String transactionId;
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private Long foodId;
        private Integer quantity;
    }
}
