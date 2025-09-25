package com.guruja.cafe_api.product.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private int price;
    private String imageUrl;
}
