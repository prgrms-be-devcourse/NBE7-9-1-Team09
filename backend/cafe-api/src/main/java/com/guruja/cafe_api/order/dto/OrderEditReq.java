package com.guruja.cafe_api.order.dto;

import java.util.List;

public record OrderEditReq(
        List<OrderItemEditReq> items
) {
}
