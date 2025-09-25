package com.guruja.cafe_api.product.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@Table(name = "product")
@NoArgsConstructor
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 상품아이디

    private String name; // 상품명

    @Column(columnDefinition = "TEXT")
    private String description; // 상품 상세설명

    private int price; // 상품 가격

    private String imageUrl; // 상품 이미지 경로
}

