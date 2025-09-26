package com.guruja.cafe_api.order.dto;

public record OrderItemEditReq(
        Long orderItemId,
        Integer quantity
) {
}
