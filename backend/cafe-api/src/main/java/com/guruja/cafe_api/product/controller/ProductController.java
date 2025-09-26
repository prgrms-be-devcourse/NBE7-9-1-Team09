package com.guruja.cafe_api.product.controller;

import com.guruja.cafe_api.product.dto.ProductListResDto;
import com.guruja.cafe_api.product.dto.ProductSaveReqDto;
import com.guruja.cafe_api.product.entity.Product;
import com.guruja.cafe_api.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductDetail(@PathVariable Long id) {
        // 서비스에서 Optional<Product>를 받습니다.
        Optional<Product> productOptional = productService.getProductById(id);

        if (productOptional.isEmpty()) {
            // 상품이 없으면, 404 Not Found 상태 코드를 반환합니다.
            return ResponseEntity.notFound().build();
        }

        // 상품이 있으면, 200 OK와 함께 상품 데이터를 반환합니다.
        return ResponseEntity.ok(productOptional.get());
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
