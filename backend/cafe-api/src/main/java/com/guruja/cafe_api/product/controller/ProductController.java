package com.guruja.cafe_api.product.controller;

import com.guruja.cafe_api.product.dto.ProductDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.guruja.cafe_api.product.dto.ProductListResDto;
import com.guruja.cafe_api.product.dto.ProductSaveReqDto;
import com.guruja.cafe_api.product.entity.Product;
import com.guruja.cafe_api.product.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;


    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductDetail(@PathVariable Long id){
        ProductDto productDto = productService.getProductById(id);
        return ResponseEntity.ok(productDto);
    }
   

    @GetMapping
    public ResponseEntity<?> getProductList() {
        List<ProductListResDto> productListResDtos = productService.getProductList();

        return new ResponseEntity<>(productListResDtos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody ProductSaveReqDto productSaveReqDto) {
        Product product = productService.create(productSaveReqDto);

        return new ResponseEntity<>(product.getId(), HttpStatus.CREATED);
    }

}
