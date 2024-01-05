package com.mercury.EcomBackend.dao;

import com.mercury.EcomBackend.bean.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDao extends JpaRepository<Order, Integer> {
    @Query("select o from Order o where o.userId = :id")
    List<Order> findByUserId(@Param("id") int id);
}
