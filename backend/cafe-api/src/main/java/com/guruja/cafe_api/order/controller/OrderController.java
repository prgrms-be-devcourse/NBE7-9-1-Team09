package com.guruja.cafe_api.order.controller;

import com.guruja.cafe_api.order.dto.OrderDto;
import com.guruja.cafe_api.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payments")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) {
        return ResponseEntity.ok(orderService.createOrder(orderDto));
    }

    // 수동으로 호출해서 14시 이전 주문을 배송중으로 바꾸는 API
    @PutMapping("/update-to-shipping")
    public ResponseEntity<Void> updateMorningOrdersToShipping() {
        orderService.updateMorningOrdersToShipping();
        return ResponseEntity.ok().build();
    }
}

