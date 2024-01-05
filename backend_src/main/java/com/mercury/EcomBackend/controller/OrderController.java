package com.mercury.EcomBackend.controller;

import com.mercury.EcomBackend.bean.Order;
import com.mercury.EcomBackend.dao.OrderDao;
import com.mercury.EcomBackend.dto.OrderDto;
import com.mercury.EcomBackend.dto.OrderItemDto;
import com.mercury.EcomBackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderDao orderDao;

    @GetMapping("/orders")
    public ResponseEntity<List<OrderItemDto>> findAllOrders() {
        List<OrderItemDto> orders = orderService.findAllOrders();
        return ResponseEntity.ok(orders);
    }

//    @GetMapping("/account/{id}/orders")
//    public ResponseEntity<List<Order>> findOrdersByUserId(@PathVariable int id) {
//        return ResponseEntity.ok(orderDao.findByUserId(id));
//    }

    @PostMapping("/add-order")
    public ResponseEntity<Order> createOrder(@RequestBody OrderDto orderData) {
        System.out.println("receive order" + orderData.toString());

        Order order = orderService.saveOrder(orderData);
        System.out.println("response order " + order.toString());

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}/orders")
    public ResponseEntity<List<OrderItemDto>> getOrdersByUserId(@PathVariable("userId") int userId) {
        List<OrderItemDto> orders = orderService.getOrdersByUserId(userId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

//    @GetMapping("/status/{orderId}/{itemId}/{userId}")
//    public String getStatus(@PathVariable int orderId,@PathVariable int itemId,@PathVariable int userId) {
//        return orderService.getStatus(orderId, itemId, userId);
//    }

    public Order saveOrder(Order order) {
        return orderDao.save(order);
    }

    public void deleteOrderById(int id) {
        orderDao.deleteById(id);
    }

}
