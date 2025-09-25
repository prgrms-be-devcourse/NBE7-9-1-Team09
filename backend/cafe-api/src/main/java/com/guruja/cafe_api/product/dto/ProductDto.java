package com.guruja.cafe_api.product.dto;

import com.guruja.cafe_api.product.entity.Product;

public record ProductDto(
        Long id,
        String name,
        String description,
        int price,
        String imageUrl
) {
    public static ProductDto from(Product product) {
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImageUrl()
        );
    }
}
