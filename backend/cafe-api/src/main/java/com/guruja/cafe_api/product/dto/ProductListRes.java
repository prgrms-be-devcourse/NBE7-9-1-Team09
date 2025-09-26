package com.guruja.cafe_api.product.dto;

import com.guruja.cafe_api.product.entity.Product;
import lombok.Builder;

@Builder
public record ProductListRes(
        Long id,
        String name,
        String description,
        Integer price,
        String imageUrl
) {
    public static ProductListRes from(Product product) {
        return new ProductListRes(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImageUrl()
        );
    }
}
