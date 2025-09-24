package com.guruja.cafe_api.order.controller;

import com.guruja.cafe_api.order.dto.AdminOrderResponse;
import com.guruja.cafe_api.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

//OrderViewController 로 변경후 주문 조회/관리자 조회 같은 파일에서 생성 제의?
@Controller
@RequiredArgsConstructor
public class AdminController {
    private final OrderService orderService;

    //타임리프, html 용
    @GetMapping("/admin")
    public String viewAllOrders(Model model) {
        //dto 이름을 OderViewAllResponse 가 나을지?
        List<AdminOrderResponse> orders = orderService.getAllOrders();

        model.addAttribute("orders", orders);

        return "order-view-test";
    }
}
