package com.guruja.cafe_api.order.dto;

import java.util.List;

public record OrderEditInfoRes(
        String orderEmail,
        List<OrderItemEditInfoRes> items
) {
}
