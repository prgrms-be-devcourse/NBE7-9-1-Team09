package com.guruja.cafe_api.order.repository;

import com.guruja.cafe_api.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

    List<Order> findByEmail(String email);
    Optional<Order> findByIdAndEmail(Long id, String email);
    List<Order> findAllByOrderByDateDesc();
}
