package com.guruja.cafe_api.order.service;

import com.guruja.cafe_api.order.dto.AdminOrderResponse;
import com.guruja.cafe_api.order.entity.Order;
import com.guruja.cafe_api.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    public List<AdminOrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAllByOrderByDateDesc();

        return orders.stream()
                .map(AdminOrderResponse::new)
                .collect(Collectors.toList());
    }
}
