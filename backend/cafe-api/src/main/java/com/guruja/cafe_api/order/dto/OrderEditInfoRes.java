package com.guruja.cafe_api.order.dto;

import java.util.List;

public record OrderEditInfoRes(
        List<OrderItemEditInfoRes> items
) {
}
