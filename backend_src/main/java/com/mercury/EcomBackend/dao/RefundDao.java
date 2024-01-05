package com.mercury.EcomBackend.dao;

import com.mercury.EcomBackend.bean.Refund;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RefundDao extends JpaRepository<Refund, Integer> {
    List<Refund> findByOrderIdAndProductId(int orderId, int productId);
}
