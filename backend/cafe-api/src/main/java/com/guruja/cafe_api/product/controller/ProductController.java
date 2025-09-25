package com.guruja.cafe_api.product.controller;

import com.guruja.cafe_api.product.dto.ProductDto;
import com.guruja.cafe_api.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ProductDto createProduct(@RequestBody ProductDto dto) {
        return productService.createProduct(dto);
    }

    @GetMapping
    public List<ProductDto> getAllProducts() {
        return productService.getAllProducts();
    }
}
