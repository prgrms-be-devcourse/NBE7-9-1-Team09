package com.guruja.cafe_api.order.service;

import com.guruja.cafe_api.order.dto.*;
import com.guruja.cafe_api.order.entity.Order;
import com.guruja.cafe_api.order.entity.OrderItem;
import com.guruja.cafe_api.order.repository.OrderItemRepository;
import com.guruja.cafe_api.order.repository.OrderRepository;
import com.guruja.cafe_api.product.dto.ProductListRes;
import com.guruja.cafe_api.product.entity.Product;
import com.guruja.cafe_api.product.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;

    public List<AdminOrderRes> getAllOrders() {
        List<Order> orders = orderRepository.findAllByOrderByDateDesc();


        return orders.stream()
                .map(AdminOrderRes::new)
                .collect(Collectors.toList());
    }
    public List<Order> findByEmail(String email) {

        List<Order> orders = orderRepository.findByEmail(email);

        if (orders.isEmpty()) {
            throw new RuntimeException("해당 이메일의 주문이 존재하지 않습니다.");
        }
        return orders;
    }

    @Transactional
    public void deleteByIdAndEmail(Long orderId, String email) {

        Order target = orderRepository.findByIdAndEmail(orderId, email)
                .orElseThrow(() -> new RuntimeException("이 이메일의 주문이 아닙니다."));

        if (!"상품준비중".equals(target.getState())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "주문을 취소할 수 없습니다.");
        }

        orderRepository.delete(target);
    }


    // 주문 생성 및 기존 주문에 아이템 추가
    // 14시 이전 실행: 같은 이메일 주문이 있으면 아이템 추가, 없으면 신규 주문 생성
    @Transactional
    public OrderCreateReq createOrder(OrderCreateReq dto) {
        LocalDateTime now = LocalDateTime.now();

        // 현재 시간이 14시 이전이면 같은 이메일 주문이 있는지 확인
        if (now.getHour() < 14 ) {
            Optional<Order> existingOrderOpt = orderRepository.findByEmailAndDateBetween(
                    dto.getEmail(),
                    now.toLocalDate().atStartOfDay(),
                    now.toLocalDate().atTime(13, 59, 59)
            );

            if (existingOrderOpt.isPresent()) {
                Order existingOrder = existingOrderOpt.get();

                // 기존 주문에 아이템 추가
                for (OrderCreateReq.OrderItemDto newItemDto : dto.getItems()) {
                    Product product = productRepository.findById(newItemDto.getProduct().id())
                            .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

                    // 동일 상품이 이미 있으면 수량만 추가
                    Optional<OrderItem> sameProductOpt = existingOrder.getOrderItems().stream()
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
                        existingOrder.getOrderItems().add(newItem);
                    }

                    // 가격 합산
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
        for (OrderCreateReq.OrderItemDto itemDto : dto.getItems()) {
            Product product = productRepository.findById(itemDto.getProduct().id())
                    .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
            OrderItem item = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemDto.getQuantity())
                    .build();
            order.getOrderItems().add(item);
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
    private OrderCreateReq toDto(Order order) {
        return OrderCreateReq.builder()
                .id(order.getId())
                .email(order.getEmail())
                .totalPrice(order.getTotalPrice())
                .state(order.getState())
                .date(order.getDate())
                .address(order.getAddress())
                .addressNumber(order.getAddressNumber())
                .items(order.getOrderItems().stream()
                        .map(oi -> OrderCreateReq.OrderItemDto.builder()
                                .id(oi.getId())
                                .product(ProductListRes.from(oi.getProduct()))
                                .quantity(oi.getQuantity())
                                .build())
                        .toList())
                .build();
    }

    public void editOrder(Long orderId, OrderEditReq orderEditReqDto) {
        Order order = orderRepository.findById(orderId).orElseThrow(()-> new EntityNotFoundException("없는 주문입니다."));

        //we will show client edit button which is yesterday 14:00:01 to today 13:59:59
        //but if client click the button and enter the page and edit after 14:00:00 we should send error
        //every 14 we will redirect user in editPage to errorPage or homepage

        //bring current orderItem by its id
        //edit its quantity
        //if quantity is zero(client will send zero quantity item, even if user delete the item)
        //we will delete order item(we will prevent user from deleting all item in editing page in client, since we have deleting button)
        //focus on what we are editing right now and focus on its id


        for(OrderItemEditReq orderItemEditReq : orderEditReqDto.items()){
            OrderItem orderItem = orderItemRepository.findById(orderItemEditReq.orderItemId()).orElseThrow(() -> new EntityNotFoundException("상품이 존재하지 않습니다."));

            if(orderItemEditReq.quantity() == 0) {
                orderItemRepository.delete(orderItem);
                continue;
            }

            orderItem.setQuantity(orderItemEditReq.quantity());
            orderItemRepository.save(orderItem);
        }
    }

    public OrderEditInfoRes editOrderInfo(Long orderId) {
        List<OrderItem> items = orderItemRepository.findByOrderId(orderId);

        OrderEditInfoRes orderEditInfoRes = new OrderEditInfoRes(new ArrayList<>());

        for(OrderItem item : items) {
            OrderItemEditInfoRes orderItemEditInfoRes = new OrderItemEditInfoRes(
                    item.getId(),
                    item.getQuantity(),
                    item.getProduct().getName(),
                    item.getProduct().getPrice(),
                    item.getProduct().getImageUrl()
            );
            orderEditInfoRes.items().add(orderItemEditInfoRes);
        }

        return orderEditInfoRes;
    }
}


