package com.guruja.cafe_api.product.service;

import com.guruja.cafe_api.product.dto.ProductListResDto;
import com.guruja.cafe_api.product.dto.ProductSaveReqDto;
import com.guruja.cafe_api.product.entity.Product;
import com.guruja.cafe_api.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Optional<Product> getProductById(Long id) {
        // orElseThrow() 부분을 삭제합니다.
        return productRepository.findById(id);

    }


    public List<ProductListResDto> getProductList() {
        List<Product> products = productRepository.findAll();

        List<ProductListResDto> productListResDtos = new ArrayList<>();

        for (Product p : products) {
            ProductListResDto dto = ProductListResDto.builder()
                    .productId(p.getId())
                    .name(p.getName())
                    .price(p.getPrice())
                    .build();

            productListResDtos.add(dto);
        }

        return productListResDtos;
    }

    public Product create(ProductSaveReqDto productSaveReqDto) {
        Product product = Product.builder()
                .name(productSaveReqDto.getName())
                .description(productSaveReqDto.getDescription())
                .price(productSaveReqDto.getPrice())
                .build();

        return productRepository.save(product);
    }
}
