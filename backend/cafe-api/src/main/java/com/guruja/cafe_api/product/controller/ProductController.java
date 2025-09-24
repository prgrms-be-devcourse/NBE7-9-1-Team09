package com.guruja.cafe_api.product.controller;

import com.guruja.cafe_api.product.dto.ProductListResDto;
import com.guruja.cafe_api.product.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> getProductList() {
        List<ProductListResDto> productListResDtos = productService.getProductList();

        return new ResponseEntity<>(productListResDtos, HttpStatus.OK);
    }


}
