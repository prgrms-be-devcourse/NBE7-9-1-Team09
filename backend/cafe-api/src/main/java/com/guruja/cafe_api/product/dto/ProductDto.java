package com.guruja.cafe_api.product.dto;

import lombok.Builder;
import lombok.Getter;
import com.guruja.cafe_api.product.entity.Product;

@Builder
public record ProductDto(
        Long id,
        String name,
        String description,
        Integer price,
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
