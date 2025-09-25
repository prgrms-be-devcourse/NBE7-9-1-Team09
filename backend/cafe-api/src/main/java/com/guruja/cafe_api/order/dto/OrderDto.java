package com.guruja.cafe_api.order.dto;

import com.guruja.cafe_api.product.dto.ProductDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class OrderDto {
    private Long id;
    private String email;
    private int totalPrice;
    private String state;
    private LocalDateTime date;
    private String address;
    private String addressNumber;
    private List<OrderItemDto> items;

    @Getter
    @Builder
    public static class OrderItemDto {
        private Long id;
        private ProductDto product;
        private int quantity;

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
}
