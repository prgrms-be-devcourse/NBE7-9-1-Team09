package com.guruja.cafe_api.order.controller;

import com.guruja.cafe_api.order.dto.AdminOrderRes;
import com.guruja.cafe_api.order.dto.OrderEditInfoRes;
import com.guruja.cafe_api.order.dto.OrderListRes;
import com.guruja.cafe_api.order.dto.OrderEditReq;
import com.guruja.cafe_api.order.entity.Order;
import com.guruja.cafe_api.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class OrderViewController {
    private final OrderService orderService;

    @GetMapping("/admin")
    public List<AdminOrderRes> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/orders/result/{email}")
    @Operation(summary = "주문조회-이메일 입력 후")
    public List<OrderListRes> getOrdersByEmail(
            @PathVariable String email
    ) {
        return orderService.findByEmail(email)
                .stream()
                .map(OrderListRes::new)
                .toList();
    }

    @DeleteMapping("/orders/{orderId}")
    @Operation(summary = "주문 취소")
    public void cancelOrderById(
            @PathVariable Long orderId,
            @RequestParam String email
    ) {
        //이메일과 주문아이디를 사용해서 주문 삭제
        orderService.deleteByIdAndEmail(orderId, email);
    }

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<?> editOrderInfo(@PathVariable Long orderId){
        OrderEditInfoRes orderEditInfoRes = orderService.editOrderInfo(orderId);

        return new ResponseEntity<>(orderEditInfoRes, HttpStatus.OK);
    }


    @PutMapping("/orders/{orderId}")
    public ResponseEntity<?> editOrder(@PathVariable Long orderId, @RequestBody OrderEditReq orderEditReqDto) {
        String orderEmail = orderService.editOrder(orderId, orderEditReqDto);

        return new ResponseEntity<>(orderEmail, HttpStatus.OK);
    }
}
