package com.mercury.EcomBackend.controller;

import com.mercury.EcomBackend.bean.Refund;
import com.mercury.EcomBackend.dto.RefundDto;
import com.mercury.EcomBackend.dto.RefundResopnseDto;
import com.mercury.EcomBackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/refund")
public class RefundController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public RefundDto requestRefund(@RequestBody RefundDto refundDto) {
        System.out.println("user request refund");
        System.out.println(refundDto);
        return orderService.requestRefund(refundDto);
    }

    @GetMapping
    public List<RefundResopnseDto> getRefunds() {
        return orderService.getAllRefunds();
    }

    @PostMapping("/approve/{refundId}")
    public ResponseEntity<Refund> approveRefund(@PathVariable int refundId) {
        Refund updatedRefund = orderService.approveRefund(refundId);
        return new ResponseEntity<>(updatedRefund, HttpStatus.OK);
    }

    @PostMapping("/refuse/{refundId}")
    public ResponseEntity<Refund> refuseRefund(@PathVariable int refundId) {
        Refund updatedRefund = orderService.refuseRefund(refundId);
        return new ResponseEntity<>(updatedRefund, HttpStatus.OK);
    }


}