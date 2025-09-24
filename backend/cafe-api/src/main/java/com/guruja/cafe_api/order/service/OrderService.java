package com.guruja.cafe_api.order.service;

import com.guruja.cafe_api.order.entity.Order;
import com.guruja.cafe_api.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public List<Order> findByEmail(String email) {

        List<Order> orders = orderRepository.findByEmail(email);

        if (orders.isEmpty()) {
            throw new RuntimeException("해당 이메일의 주문이 존재하지 않습니다.");
        }
        return orders;
    }

    public void deleteByIdAndEmail(Long orderId, String email) {

        Order target = orderRepository.findByIdAndEmail(orderId, email)
                .orElseThrow(() -> new RuntimeException("이 이메일의 주문이 아닙니다."));

        if (!"상품준비중".equals(target.getState())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "주문을 취소할 수 없습니다.");
        }
        orderRepository.delete(target);
    }
}


