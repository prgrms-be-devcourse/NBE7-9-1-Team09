package com.guruja.cafe_api.order.controller;

import org.springframework.web.bind.annotation.RestController;
import com.guruja.cafe_api.order.dto.OrderCreateReq;
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
    public ResponseEntity<OrderCreateReq> createOrder(@RequestBody OrderCreateReq orderDto) {
        return ResponseEntity.ok(orderService.createOrder(orderDto));
    }

}

