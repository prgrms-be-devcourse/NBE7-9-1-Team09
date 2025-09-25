package com.guruja.cafe_api.order.controller;

import com.guruja.cafe_api.order.dto.AdminOrderResponse;
import com.guruja.cafe_api.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class OrderViewController {
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
