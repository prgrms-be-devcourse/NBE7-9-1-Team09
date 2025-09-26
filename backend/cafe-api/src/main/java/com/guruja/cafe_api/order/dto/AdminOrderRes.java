package com.guruja.cafe_api.order.dto;

import com.guruja.cafe_api.order.entity.Order;

import java.util.List;
import java.util.stream.Collectors;

public record AdminOrderRes(
        //주문 날짜 추가?
        Long orderId,
        String customerEmail,
        List<String> orderItems,
        int totalPrice,
        String orderState
) {

    public AdminOrderRes(Order order) {
        this(
                order.getId(),
                order.getEmail(),
                order.getOrderItems().stream()
                        .map(item -> item.getProduct().getName() + " x " + item.getQuantity())
                        .collect(Collectors.toList()),
                order.getTotalPrice(),
                order.getState()
        );
    }
}