package com.guruja.cafe_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CafeApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CafeApiApplication.class, args);
	}

}
