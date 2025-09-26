package com.guruja.cafe_api.order.dto;

import com.guruja.cafe_api.order.entity.OrderItem;

public record OrderListItemRes(
        String productName,
        Integer quantity
) {
    public OrderListItemRes(OrderItem oi) {
        this(oi.getProduct().getName(), oi.getQuantity());
    }
}
