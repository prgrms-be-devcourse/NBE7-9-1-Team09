package com.guruja.cafe_api.product.service;

import com.guruja.cafe_api.product.dto.ProductDto;
import com.guruja.cafe_api.product.entity.Product;
import com.guruja.cafe_api.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        return ProductDto.from(product);
    }
}
