package com.guruja.cafe_api.order.repository;

import com.guruja.cafe_api.order.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

    List<Order> findByEmail(String email);
    Optional<Order> findByIdAndEmail(Long id, String email);
    List<Order> findAllByOrderByDateDesc();
    Optional<Order> findByEmailAndDateBetween(String email, LocalDateTime start, LocalDateTime end);
    List<Order> findByEmailAndState(String email, String state);
  
    Page<Order> findAllByOrderByDateDesc(Pageable pageable);

    List<Order> findByDateBetween(LocalDateTime start, LocalDateTime end);

    String findEmailById(Long id);
}

