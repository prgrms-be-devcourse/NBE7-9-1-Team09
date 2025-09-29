package com.guruja.cafe_api.order.dto;

public record OrderItemEditInfoRes(
        Long orderItemId,
        Integer orderItemQuantity,
        String productName,
        Integer productPrice,
        String productImage
) {
}
