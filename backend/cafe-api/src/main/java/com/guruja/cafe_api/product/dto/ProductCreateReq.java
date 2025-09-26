package com.guruja.cafe_api.product.dto;

public record ProductCreateReq(
        String name,
        String description,
        Integer price,
        String imageUrl
){

}