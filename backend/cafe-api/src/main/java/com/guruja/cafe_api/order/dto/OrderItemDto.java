package com.guruja.cafe_api.order.dto;

import com.guruja.cafe_api.order.entity.OrderItem;

public record OrderItemDto(
        String productName,
        int quantity
) {
    public OrderItemDto(OrderItem oi) {
        this(oi.getProduct().getName(), oi.getQuantity());
    }
}
