package com.mercury.EcomBackend.dao;

import com.mercury.EcomBackend.bean.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


//TODO: PK type?
@Repository
public interface OrderDetailDao extends JpaRepository<OrderDetail, Integer> {
    List<OrderDetail> findOrderDetailsByOrderId(int orderId);
//    OrderDetail findByOrderIdAndProductId(int orderId, int productId);
}
