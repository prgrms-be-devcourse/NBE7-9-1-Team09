package com.guruja.cafe_api.product.service;

import com.guruja.cafe_api.product.dto.ProductDto;
import lombok.RequiredArgsConstructor;
import com.guruja.cafe_api.product.dto.ProductListResDto;
import com.guruja.cafe_api.product.dto.ProductSaveReqDto;
import com.guruja.cafe_api.product.entity.Product;
import com.guruja.cafe_api.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        return ProductDto.from(product);
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

    public Product create(ProductSaveReqDto productSaveReqDto) {
        Product product = Product.builder()
                .name(productSaveReqDto.getName())
                .description(productSaveReqDto.getDescription())
                .price(productSaveReqDto.getPrice())
                .build();

        return productRepository.save(product);
    }
}
