package com.guruja.cafe_api.order.repository;

import com.guruja.cafe_api.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long>  {

}
