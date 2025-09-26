package com.guruja.cafe_api.order.controller;

import com.guruja.cafe_api.order.dto.AdminOrderResponse;
import com.guruja.cafe_api.order.dto.OrderDto;
import com.guruja.cafe_api.order.dto.OrderEditReqDto;
import com.guruja.cafe_api.order.entity.Order;
import com.guruja.cafe_api.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderViewController {
    private final OrderService orderService;

    @GetMapping("/admin")
    public List<AdminOrderResponse> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/orders")
    @Operation(summary = "주문조회-이메일 입력 후")
    public List<OrderDto> getOrdersByEmail(
            @RequestParam String email
    ) {
        return orderService.findByEmail(email)
                .stream()
                .map(OrderDto::new)
                .toList();
    }

    @DeleteMapping("/orders/{orderId}")
    @Operation(summary = "주문 취소")
    public List<OrderDto> cancelOrderById(
            @PathVariable Long orderId,
            @RequestParam String email
    ) {

        //이메일과 주문아이디를 사용해서 주문 삭제
        orderService.deleteByIdAndEmail(orderId, email);

        return orderService.findByEmail(email)
                .stream()
                .map(OrderDto::new)
                .toList();
    }

    @PutMapping("/orders/{orderId}")
    public void editOrder(@PathVariable Long orderId, @RequestBody OrderEditReqDto orderEditReqDto) {
        orderService.editOrder(orderId, orderEditReqDto);
    }
}
