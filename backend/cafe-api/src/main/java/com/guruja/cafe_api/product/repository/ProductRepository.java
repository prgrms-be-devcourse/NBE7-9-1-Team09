package com.guruja.cafe_api.product.repository;

import com.guruja.cafe_api.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository  extends JpaRepository<Product, Long> {


}
