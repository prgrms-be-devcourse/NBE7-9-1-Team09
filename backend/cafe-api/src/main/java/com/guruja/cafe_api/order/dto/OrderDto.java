package com.guruja.cafe_api.order.dto;

import com.guruja.cafe_api.order.entity.Order;

import java.util.List;

public record OrderDto(
        Long orderId,
        Integer totalPrice,
        String state,
        List<OrderItemDto> orderItems
) {
    public OrderDto(Order o) {
        this(
                o.getId(),
                o.getTotalPrice(),
                o.getState(),
                o.getOrderItems().stream()
                        .map(OrderItemDto::new)
                        .toList()
        );
    }
}