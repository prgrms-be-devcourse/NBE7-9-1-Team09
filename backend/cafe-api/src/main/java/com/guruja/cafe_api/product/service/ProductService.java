package com.guruja.cafe_api.product.service;

import com.guruja.cafe_api.product.dto.ProductListResDto;
import com.guruja.cafe_api.product.entity.Product;
import com.guruja.cafe_api.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    public List<ProductListResDto> getProductList() {
        List<Product> products = productRepository.findAll();

        List<ProductListResDto> productListResDtos = new ArrayList<>();

        for(Product p : products) {
            ProductListResDto dto = ProductListResDto.builder()
                    .productId(p.getId())
                    .name(p.getName())
                    .price(p.getPrice())
                    .build();

            productListResDtos.add(dto);
        }

        return productListResDtos;
    }
}
