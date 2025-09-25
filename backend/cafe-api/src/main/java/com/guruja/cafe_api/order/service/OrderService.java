package com.guruja.cafe_api.order.service;

import com.guruja.cafe_api.order.dto.OrderDto;
import com.guruja.cafe_api.order.entity.Order;
import com.guruja.cafe_api.order.entity.OrderItem;
import com.guruja.cafe_api.order.repository.OrderRepository;
import com.guruja.cafe_api.product.dto.ProductDto;
import com.guruja.cafe_api.product.entity.Product;
import com.guruja.cafe_api.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    // 주문 생성 및 기존 주문에 아이템 추가
    // 14시 이전 실행: 같은 이메일 주문이 있으면 아이템 추가, 없으면 신규 주문 생성
    @Transactional
    public OrderDto createOrder(OrderDto dto) {
        LocalDateTime now = LocalDateTime.now();

        // 현재 시간이 14시 이전이면 같은 이메일 주문이 있는지 확인
        if (now.getHour() < 14) {
            Optional<Order> existingOrderOpt = orderRepository.findByEmailAndDateBetween(
                    dto.getEmail(),
                    now.toLocalDate().atStartOfDay(),
                    now.toLocalDate().atTime(13, 59, 59)
            );

            if (existingOrderOpt.isPresent()) {
                Order existingOrder = existingOrderOpt.get();

                // 기존 주문에 아이템 추가
                for (OrderDto.OrderItemDto newItemDto : dto.getItems()) {
                    Product product = productRepository.findById(newItemDto.getProduct().getId())
                            .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

                    // 동일 상품이 이미 있으면 수량만 증가
                    Optional<OrderItem> sameProductOpt = existingOrder.getItems().stream()
                            .filter(item -> item.getProduct().getId().equals(product.getId()))
                            .findFirst();

                    if (sameProductOpt.isPresent()) {
                        OrderItem same = sameProductOpt.get();
                        same.setQuantity(same.getQuantity() + newItemDto.getQuantity());
                    } else {
                        // 새로운 상품 추가
                        OrderItem newItem = OrderItem.builder()
                                .order(existingOrder)
                                .product(product)
                                .quantity(newItemDto.getQuantity())
                                .build();
                        existingOrder.getItems().add(newItem);
                    }

                    // 가격 더하기
                    existingOrder.setTotalPrice(
                            existingOrder.getTotalPrice() + product.getPrice() * newItemDto.getQuantity()
                    );
                }

                Order saved = orderRepository.save(existingOrder);
                return toDto(saved);
            }
        }

        // 신규 주문 생성
        Order order = Order.builder()
                .email(dto.getEmail())
                .totalPrice(0)
                .state(dto.getState())
                .date(now)
                .address(dto.getAddress())
                .addressNumber(dto.getAddressNumber())
                .build();

        int total = 0;
        for (OrderDto.OrderItemDto itemDto : dto.getItems()) {
            Product product = productRepository.findById(itemDto.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
            OrderItem item = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemDto.getQuantity())
                    .build();
            order.getItems().add(item);
            total += product.getPrice() * itemDto.getQuantity();
        }
        order.setTotalPrice(total);

        Order saved = orderRepository.save(order);
        return toDto(saved);
    }

    // 14시 이후 실행: 14시 이전 주문 모두 배송중 처리
    @Transactional
    public void updateMorningOrdersToShipping() {
        LocalDateTime today = LocalDate.now().atStartOfDay();
        LocalDateTime cutoff = today.withHour(14);

        List<Order> morningOrders = orderRepository.findByDateBetween(today, cutoff.minusSeconds(1));

        for (Order order : morningOrders) {
            order.setState("배송중");
        }

        orderRepository.saveAll(morningOrders);
    }

    // ====== 매핑 메서드 ======
    private OrderDto toDto(Order order) {
        return OrderDto.builder()
                .id(order.getId())
                .email(order.getEmail())
                .totalPrice(order.getTotalPrice())
                .state(order.getState())
                .date(order.getDate())
                .address(order.getAddress())
                .addressNumber(order.getAddressNumber())
                .items(order.getItems().stream()
                        .map(oi -> OrderDto.OrderItemDto.builder()
                                .id(oi.getId())
                                .product(toDto(oi.getProduct()))
                                .quantity(oi.getQuantity())
                                .build())
                        .toList())
                .build();
    }

    private ProductDto toDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .imageUrl(product.getImageUrl())
                .build();
    }
}


