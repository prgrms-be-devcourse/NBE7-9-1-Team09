package com.guruja.cafe_api.order.scheduler;

import com.guruja.cafe_api.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class OrderShippingScheduler {

    private final OrderService orderService;

    // 매일 14:00:00에 실행
    @Scheduled(cron = "0 0 14 * * *", zone = "Asia/Seoul")
    public void updateMorningOrdersToShippingDaily() {
        log.info("스케줄 시작: 14시 이전 주문 상태를 '배송중'으로 변경");
        orderService.updateMorningOrdersToShipping();
        log.info("스케줄 완료");
    }
}

