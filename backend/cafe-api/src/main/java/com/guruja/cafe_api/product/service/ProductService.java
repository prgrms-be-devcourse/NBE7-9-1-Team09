package com.guruja.cafe_api.product.service;

import com.guruja.cafe_api.product.dto.ProductListResDto;
import com.guruja.cafe_api.product.dto.ProductListRes;
import lombok.RequiredArgsConstructor;
import com.guruja.cafe_api.product.dto.ProductCreateReq;
import com.guruja.cafe_api.product.entity.Product;
import com.guruja.cafe_api.product.repository.ProductRepository;
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


    public List<ProductListRes> getProductList() {
        List<Product> products = productRepository.findAll();

        List<ProductListRes> productListResDtos = new ArrayList<>();

        for(Product p : products) {
            ProductListRes dto = ProductListRes.builder()
                    .id(p.getId())
                    .name(p.getName())
                    .price(p.getPrice())
                    .imageUrl(p.getImageUrl())
                    .build();

            productListResDtos.add(dto);
        }

        return productListResDtos;
    }

    public Product create(ProductCreateReq productCreateReq) {
        Product product = Product.builder()
                .name(productCreateReq.name())
                .description(productCreateReq.description())
                .price(productCreateReq.price())
                .imageUrl(productCreateReq.imageUrl())
                .build();

        return productRepository.save(product);
    }
}
