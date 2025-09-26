package com.guruja.cafe_api.order.dto;

public record OrderItemEditReqDto(
        Long orderItemId,
        Long productId,
        Integer quantity
) {
}
