package com.guruja.cafe_api.order.dto;

import com.guruja.cafe_api.order.entity.Order;

import java.util.List;

public record OrderListRes(
        Long orderId,
        Integer totalPrice,
        String state,
        List<OrderListItemRes> orderItems
) {
    public OrderListRes(Order o) {
        this(
                o.getId(),
                o.getTotalPrice(),
                o.getState(),
                o.getOrderItems().stream()
                        .map(OrderListItemRes::new)
                        .toList()
        );
    }
}