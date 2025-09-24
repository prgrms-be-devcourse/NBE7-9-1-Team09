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
                o.getTotal_price(),
                o.getState(),
                o.getItems().stream()
                        .map(OrderItemDto::new)
                        .toList()
        );
    }
}