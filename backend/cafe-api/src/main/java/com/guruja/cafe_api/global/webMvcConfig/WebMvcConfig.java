package com.guruja.cafe_api.global.webMvcConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")      // 모든 경로
                .allowedOrigins("*")    // 모든 출처 허용
                .allowedMethods("*")    // 모든 HTTP 메서드 허용 (GET, POST 등)
                .allowedHeaders("*");   // 모든 헤더 허용
    }
}

