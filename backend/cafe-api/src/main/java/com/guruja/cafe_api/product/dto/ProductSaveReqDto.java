package com.guruja.cafe_api.product.dto;

public record ProductSaveReqDto(
        String name,
        String description,
        Integer price,
        String imageUrl
){

}