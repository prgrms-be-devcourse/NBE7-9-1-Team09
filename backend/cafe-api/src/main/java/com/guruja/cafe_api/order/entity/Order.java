package com.guruja.cafe_api.order.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 255)
    private String email;

    //자료형 long? int?
    @Column(name = "total_price")
    private Integer totalPrice;

    @Column
    private String state;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column(nullable = false)
    private String address;

    @Column(name = "address_number", nullable = false)
    private String addressNumber;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    public Order(String email, Integer totalPrice, String state, LocalDateTime date, String address, String addressNumber) {
        this.email = email;
        this.totalPrice = totalPrice;
        this.state = state;
        this.date = date;
        this.address = address;
        this.addressNumber = addressNumber;
    }

}
