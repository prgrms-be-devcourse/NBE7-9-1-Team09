package com.guruja.cafe_api.product.service;

import com.guruja.cafe_api.product.dto.ProductDto;
import lombok.RequiredArgsConstructor;
import com.guruja.cafe_api.product.dto.ProductSaveReqDto;
import com.guruja.cafe_api.product.entity.Product;
import com.guruja.cafe_api.product.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

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


    public List<ProductDto> getProductList() {
        List<Product> products = productRepository.findAll();

        List<ProductDto> productListResDtos = new ArrayList<>();

        for(Product p : products) {
            ProductDto dto = ProductDto.builder()
                    .id(p.getId())
                    .name(p.getName())
                    .price(p.getPrice())
                    .imageUrl(p.getImageUrl())
                    .build();

            productListResDtos.add(dto);
        }

        return productListResDtos;
    }

    public Product create(ProductSaveReqDto productSaveReqDto) {
        Product product = Product.builder()
                .name(productSaveReqDto.name())
                .description(productSaveReqDto.description())
                .price(productSaveReqDto.price())
                .imageUrl(productSaveReqDto.imageUrl())
                .build();

        return productRepository.save(product);
    }
}
