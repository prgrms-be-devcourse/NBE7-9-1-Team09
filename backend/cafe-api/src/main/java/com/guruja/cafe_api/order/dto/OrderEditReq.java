package com.guruja.cafe_api.order.dto;

import java.util.List;

public record OrderEditReq(
        Integer orderTotalPrice,
        List<OrderItemEditReq> items
) {
}
